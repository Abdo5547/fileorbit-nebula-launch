import { env } from "@/config/env";
import { endpoints } from "@/api/endpoints";
import type { CsrfResponse } from "@/types/auth";

type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

interface RequestOptions {
  method?: ApiMethod;
  body?: BodyInit | null;
  headers?: HeadersInit;
  requiresCsrf?: boolean;
}

let csrfTokenCache: string | null = null;
let csrfRequest: Promise<string> | null = null;

const isFormData = (value: BodyInit | null | undefined): value is FormData =>
  typeof FormData !== "undefined" && value instanceof FormData;

const toAbsoluteUrl = (path: string) => `${env.apiBaseUrl}${path}`;

const normalizeErrorMessage = (data: unknown, fallback: string) => {
  if (!data || typeof data !== "object") {
    return fallback;
  }

  if ("detail" in data && typeof data.detail === "string") {
    return data.detail;
  }

  const messages = Object.entries(data)
    .flatMap(([field, value]) => {
      if (Array.isArray(value)) {
        return value.map((item) => `${field}: ${String(item)}`);
      }

      if (typeof value === "string") {
        return `${field}: ${value}`;
      }

      return [];
    })
    .filter(Boolean);

  return messages[0] ?? fallback;
};

const parseResponseBody = async (response: Response) => {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  if (contentType.startsWith("text/")) {
    return response.text();
  }

  return null;
};

const fetchCsrfToken = async () => {
  if (csrfTokenCache) {
    return csrfTokenCache;
  }

  if (!csrfRequest) {
    csrfRequest = fetch(toAbsoluteUrl(endpoints.auth.csrf), {
      credentials: "include",
    })
      .then(async (response) => {
        const data = (await response.json()) as CsrfResponse;

        if (!response.ok || !data.csrfToken) {
          throw new ApiError("Unable to initialize CSRF protection.", response.status, data);
        }

        csrfTokenCache = data.csrfToken;
        return data.csrfToken;
      })
      .finally(() => {
        csrfRequest = null;
      });
  }

  return csrfRequest;
};

const buildHeaders = async (
  body: BodyInit | null | undefined,
  headers: HeadersInit | undefined,
  requiresCsrf: boolean,
) => {
  const finalHeaders = new Headers(headers);

  if (!isFormData(body) && body && !finalHeaders.has("Content-Type")) {
    finalHeaders.set("Content-Type", "application/json");
  }

  if (requiresCsrf) {
    finalHeaders.set("X-CSRFToken", await fetchCsrfToken());
  }

  return finalHeaders;
};

async function request<T>(path: string, options: RequestOptions = {}) {
  const method = options.method ?? "GET";
  const headers = await buildHeaders(options.body, options.headers, Boolean(options.requiresCsrf));

  const response = await fetch(toAbsoluteUrl(path), {
    method,
    headers,
    body: options.body,
    credentials: "include",
  });

  const data = await parseResponseBody(response);

  if (!response.ok) {
    throw new ApiError(
      normalizeErrorMessage(data, "Une erreur est survenue lors de l’appel API."),
      response.status,
      data,
    );
  }

  return data as T;
}

export const api = {
  get: <T>(path: string, headers?: HeadersInit) => request<T>(path, { headers }),
  post: <T>(path: string, body?: BodyInit | null, headers?: HeadersInit) =>
    request<T>(path, { method: "POST", body, headers, requiresCsrf: true }),
  put: <T>(path: string, body?: BodyInit | null, headers?: HeadersInit) =>
    request<T>(path, { method: "PUT", body, headers, requiresCsrf: true }),
  patch: <T>(path: string, body?: BodyInit | null, headers?: HeadersInit) =>
    request<T>(path, { method: "PATCH", body, headers, requiresCsrf: true }),
  delete: <T>(path: string, headers?: HeadersInit) =>
    request<T>(path, { method: "DELETE", headers, requiresCsrf: true }),
  ensureCsrf: fetchCsrfToken,
  clearCsrfCache: () => {
    csrfTokenCache = null;
  },
  toAbsoluteUrl,
};

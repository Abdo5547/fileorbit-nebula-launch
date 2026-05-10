const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

if (!rawApiBaseUrl) {
  throw new Error("Missing VITE_API_BASE_URL environment variable.");
}

export const env = {
  apiBaseUrl: trimTrailingSlash(rawApiBaseUrl),
} as const;

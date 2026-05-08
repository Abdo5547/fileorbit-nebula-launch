import { api } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import type { AuthResponse, LoginPayload, RegisterPayload, User } from "@/types/auth";

export const authService = {
  async initializeSession() {
    await api.ensureCsrf();
  },
  me() {
    return api.get<User>(endpoints.auth.me);
  },
  register(payload: RegisterPayload) {
    return api.post<AuthResponse>(endpoints.auth.register, JSON.stringify(payload));
  },
  login(payload: LoginPayload) {
    return api.post<AuthResponse>(endpoints.auth.login, JSON.stringify(payload));
  },
  async logout() {
    const response = await api.post<{ message: string }>(endpoints.auth.logout);
    api.clearCsrfCache();
    return response;
  },
};

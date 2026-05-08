import { createContext, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@/api/api";
import { authService } from "@/services/auth.service";
import type { LoginPayload, RegisterPayload, User } from "@/types/auth";

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<User>;
  register: (payload: RegisterPayload) => Promise<User>;
  logout: () => Promise<void>;
  error: ApiError | null;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

const authQueryKey = ["auth", "me"] as const;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const meQuery = useQuery({
    queryKey: authQueryKey,
    queryFn: async () => {
      try {
        return await authService.me();
      } catch (error) {
        if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
          return null;
        }

        throw error;
      }
    },
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: async ({ user }) => {
      queryClient.setQueryData(authQueryKey, user);
    },
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: async ({ user }) => {
      queryClient.setQueryData(authQueryKey, user);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: async () => {
      queryClient.setQueryData(authQueryKey, null);
      queryClient.removeQueries({ queryKey: ["jobs"] });
    },
  });

  const value = useMemo<AuthContextValue>(
    () => ({
      user: meQuery.data ?? null,
      isAuthenticated: Boolean(meQuery.data),
      isLoading:
        meQuery.isLoading ||
        loginMutation.isPending ||
        registerMutation.isPending ||
        logoutMutation.isPending,
      login: async (payload) => (await loginMutation.mutateAsync(payload)).user,
      register: async (payload) => (await registerMutation.mutateAsync(payload)).user,
      logout: async () => {
        await logoutMutation.mutateAsync();
      },
      error:
        (loginMutation.error as ApiError | null) ??
        (registerMutation.error as ApiError | null) ??
        (logoutMutation.error as ApiError | null) ??
        null,
    }),
    [
      loginMutation,
      logoutMutation,
      meQuery.data,
      meQuery.isLoading,
      registerMutation,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

import { createContext, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@/api/api";
import { authService } from "@/services/auth.service";
import type { LoginPayload, RegisterPayload, User } from "@/types/auth";

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  isLoading: boolean;
  isReady: boolean;
  login: (payload: LoginPayload) => Promise<User>;
  register: (payload: RegisterPayload) => Promise<User>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<User | null>;
  error: ApiError | null;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

const sessionQueryKey = ["auth", "session"] as const;
const authQueryKey = ["auth", "me"] as const;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const sessionQuery = useQuery({
    queryKey: sessionQueryKey,
    queryFn: async () => {
      await authService.initializeSession();
      return true;
    },
    retry: false,
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
  });

  const meQuery = useQuery({
    queryKey: authQueryKey,
    enabled: sessionQuery.isSuccess,
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

  const activeError =
    (sessionQuery.error as ApiError | null) ??
    (meQuery.error as ApiError | null) ??
    (loginMutation.error as ApiError | null) ??
    (registerMutation.error as ApiError | null) ??
    (logoutMutation.error as ApiError | null) ??
    null;

  const value = useMemo<AuthContextValue>(
    () => ({
      user: meQuery.data ?? null,
      isAuthenticated: Boolean(meQuery.data),
      isInitializing: sessionQuery.isLoading || meQuery.isLoading,
      isLoading:
        sessionQuery.isLoading ||
        meQuery.isLoading ||
        loginMutation.isPending ||
        registerMutation.isPending ||
        logoutMutation.isPending,
      isReady: sessionQuery.isSuccess && !meQuery.isLoading,
      login: async (payload) => (await loginMutation.mutateAsync(payload)).user,
      register: async (payload) => (await registerMutation.mutateAsync(payload)).user,
      logout: async () => {
        await logoutMutation.mutateAsync();
      },
      refreshUser: async () => {
        const result = await meQuery.refetch();
        return result.data ?? null;
      },
      error: activeError,
    }),
    [
      activeError,
      loginMutation,
      logoutMutation,
      meQuery,
      registerMutation,
      sessionQuery.isLoading,
      sessionQuery.isSuccess,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

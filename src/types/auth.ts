export interface User {
  id: number;
  email: string;
  full_name: string;
  avatar_url: string | null;
  role: string;
  plan: string;
  is_email_verified: boolean;
  created_at: string;
}

export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
  password_confirm: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export interface CsrfResponse {
  csrfToken: string;
}

import { apiRequest } from "./client";
import type {
  AuthResponse,
  User,
} from "../types/auth";

export function register(
  email: string,
  password: string,
) {
  return apiRequest<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export function login(
  email: string,
  password: string,
) {
  return apiRequest<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export function logout() {
  return apiRequest<null>("/auth/logout", {
    method: "POST",
  });
}

export function getCurrentUser() {
  return apiRequest<User>("/auth/me");
}
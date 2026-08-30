import { useCallback, useEffect, useState } from "react";

import {
  getCurrentUser,
  login,
  logout,
  register,
} from "../api/auth";

import type { User } from "../types/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(
    null,
  );

  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const currentUser = await getCurrentUser();

      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  async function signIn(
    email: string,
    password: string,
  ) {
    try {
      setError(null);

      const response = await login(
        email,
        password,
      );

      setUser(response.user);

      return response.user;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to sign in";

      setError(message);

      throw err;
    }
  }

  async function signUp(
    email: string,
    password: string,
  ) {
    try {
      setError(null);

      const response = await register(
        email,
        password,
      );

      setUser(response.user);

      return response.user;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to create account";

      setError(message);

      throw err;
    }
  }

  async function signOut() {
    try {
      await logout();
    } finally {
      setUser(null);
    }
  }

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    refreshUser: checkAuth,
  };
}
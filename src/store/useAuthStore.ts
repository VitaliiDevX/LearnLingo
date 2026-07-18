import { create } from "zustand";
import type { User } from "../types/user";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  setUser: (user: User | null) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthenticated: false,
  isInitializing: true,
  setUser: (user) =>
    set({ user, isAuthenticated: !!user, isInitializing: false }),
  clearIsAuthenticated: () =>
    set({ user: null, isAuthenticated: false, isInitializing: false }),
}));

import { create } from "zustand";

interface AuthState {
  authMode: "signup" | "findPassword" | null;
  setAuthMode: (authMode: "signup" | "findPassword") => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  authMode: null,
  setAuthMode: (authMode: "signup" | "findPassword") => set({ authMode }),
}));

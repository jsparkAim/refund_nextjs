import { create } from "zustand";
import { UserState } from "@/types/user";

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateUser: (partial) =>
    set((state) => ({
      user: { ...state.user, ...partial } as UserState["user"],
    })),
  clearUser: () => set({ user: null }),
}));

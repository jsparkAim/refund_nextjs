import { create } from "zustand";
import { CompanyInfo, CompanyState } from "@/types/company";

export const useCompanyStore = create<CompanyState>((set) => ({
  company: null,
  isInitialized: false,
  setCompany: (data) => set({ company: data }),
  updateCompany: (partial) =>
    set((state) => ({
      company: { ...state.company, ...partial } as CompanyInfo,
    })),
}));

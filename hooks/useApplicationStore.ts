"use client";

import { create } from "zustand";
import type { ApplicationFilterParams } from "@/types/application";

interface ApplicationStore {
  filters: ApplicationFilterParams;
  setFilters: (filters: ApplicationFilterParams) => void;
}

export const useApplicationStore = create<ApplicationStore>((set) => ({
  filters: {},
  setFilters: (filters) => set({ filters }),
}));

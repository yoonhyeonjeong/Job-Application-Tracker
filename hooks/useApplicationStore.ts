"use client";

import { create } from "zustand";
import { fetchApplications } from "@/services/applicationApi";
import type {
  ApplicationResponse,
  ApplicationCreatePayload,
  ApplicationFilterParams,
} from "@/types/application";

interface ApplicationStore {
  applications: ApplicationResponse[];
  filters: ApplicationFilterParams;
  loading: boolean;
  error?: string;
  setFilters: (filters: ApplicationFilterParams) => void;
  loadApplications: () => Promise<void>;
  addApplication?: (payload: ApplicationCreatePayload) => Promise<void>;
}

export const useApplicationStore = create<ApplicationStore>((set) => ({
  applications: [],
  filters: {},
  loading: false,
  setFilters: (filters) => set({ filters }),
  // 지원목록 get
  loadApplications: async () => {
    set({ loading: true, error: undefined });

    try {
      const applications = await fetchApplications();
      set({ applications, loading: false });
    } catch {
      set({ error: "지원 목록을 불러오지 못했습니다.", loading: false });
    }
  },
}));

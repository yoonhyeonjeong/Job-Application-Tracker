'use client';

import { create } from 'zustand';
import { fetchApplications, postApplication } from '@/services/applicationApi';
import type { Application, ApplicationCreatePayload, ApplicationFilterParams } from '@/types/application';

interface ApplicationStore {
  applications: Application[];
  filters: ApplicationFilterParams;
  loading: boolean;
  error?: string;
  setFilters: (filters: ApplicationFilterParams) => void;
  loadApplications: () => Promise<void>;
  addApplication: (payload: ApplicationCreatePayload) => Promise<void>;
}

export const useApplicationStore = create<ApplicationStore>((set) => ({
  applications: [],
  filters: {},
  loading: false,
  setFilters: (filters) => set({ filters }),
  loadApplications: async () => {
    set({ loading: true, error: undefined });

    try {
      const applications = await fetchApplications();
      set({ applications, loading: false });
    } catch {
      set({ error: '지원 목록을 불러오지 못했습니다.', loading: false });
    }
  },
  addApplication: async (payload) => {
    set({ loading: true, error: undefined });

    try {
      const application = await postApplication(payload);
      set((state) => ({
        applications: [application, ...state.applications],
        loading: false
      }));
    } catch {
      set({ error: '지원 내역을 추가하지 못했습니다.', loading: false });
    }
  }
}));

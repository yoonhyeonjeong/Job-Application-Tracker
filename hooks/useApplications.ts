'use client';

import { useEffect, useMemo } from 'react';
import { useApplicationStore } from '@/hooks/useApplicationStore';
import type { Application, ApplicationFilterParams } from '@/types/application';

interface UseApplicationsResult {
  applications: Application[];
  loading: boolean;
  filters: ApplicationFilterParams;
  setFilters: (filters: ApplicationFilterParams) => void;
  refresh: () => Promise<void>;
}

const matchesKeyword = (application: Application, keyword?: string): boolean => {
  if (!keyword) {
    return true;
  }

  const normalizedKeyword = keyword.trim().toLowerCase();
  return [application.companyName, application.position, application.location, application.memo]
    .filter((value): value is string => Boolean(value))
    .some((value) => value.toLowerCase().includes(normalizedKeyword));
};

export const useApplications = (): UseApplicationsResult => {
  const allApplications = useApplicationStore((state) => state.applications);
  const loading = useApplicationStore((state) => state.loading);
  const filters = useApplicationStore((state) => state.filters);
  const setFilters = useApplicationStore((state) => state.setFilters);
  const loadApplications = useApplicationStore((state) => state.loadApplications);

  const applications = useMemo(() => {
    return allApplications.filter((application) => {
      return (
        matchesKeyword(application, filters.keyword) &&
        (!filters.status || application.status === filters.status) &&
        (!filters.employmentType || application.employmentType === filters.employmentType) &&
        (!filters.workType || application.workType === filters.workType)
      );
    });
  }, [allApplications, filters]);

  useEffect(() => {
    void loadApplications();
  }, [loadApplications]);

  return {
    applications,
    loading,
    filters,
    setFilters,
    refresh: loadApplications
  };
};

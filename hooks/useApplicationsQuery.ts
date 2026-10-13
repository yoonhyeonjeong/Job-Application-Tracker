"use client";

import { queryKeys } from "@/services/queryCache";
import { useQuery } from "@tanstack/react-query";
import { fetchApplications } from "@/services/applicationApi";
import type { ApplicationResponse } from "@/types/application";

export const useApplicationsQuery = (initialApplications?: ApplicationResponse[]) =>
  useQuery({
    queryKey: queryKeys.applications,
    queryFn: fetchApplications,
    initialData: initialApplications,
    staleTime: initialApplications ? 30_000 : 0,
  });

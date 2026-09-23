"use client";

import { queryKeys } from "@/services/queryCache";
import { useQuery } from "@tanstack/react-query";
import { fetchApplications } from "@/services/applicationApi";

export const useApplicationsQuery = () =>
  useQuery({
    queryKey: queryKeys.applications,
    queryFn: fetchApplications,
  });

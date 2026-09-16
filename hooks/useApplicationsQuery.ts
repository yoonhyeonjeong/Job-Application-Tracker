"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchApplications } from "@/services/applicationApi";

export const useApplicationsQuery = () =>
  useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });

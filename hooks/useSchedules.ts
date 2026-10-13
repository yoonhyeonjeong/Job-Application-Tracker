"use client";

import { queryKeys } from "@/services/queryCache";
import { useQuery } from "@tanstack/react-query";
import { fetchUpcomingSchedules } from "@/services/scheduleApi";
import type { ScheduleResponse } from "@/types/schedule";

const useSchedules = (initialSchedules?: ScheduleResponse[]) => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: queryKeys.upcomingSchedules,
    queryFn: fetchUpcomingSchedules,
    initialData: initialSchedules,
    staleTime: initialSchedules ? 30_000 : 0,
  });

  return {
    scheduleLoading: isPending,
    scheduleData: data ?? [],
    scheduleError: isError,
    refreshSchedules: refetch,
  };
};

export default useSchedules;

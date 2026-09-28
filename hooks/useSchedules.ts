"use client";

import { queryKeys } from "@/services/queryCache";
import { useQuery } from "@tanstack/react-query";
import { fetchUpcomingSchedules } from "@/services/scheduleApi";

const useSchedules = () => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: queryKeys.upcomingSchedules,
    queryFn: fetchUpcomingSchedules,
  });

  return {
    scheduleLoading: isPending,
    scheduleData: data ?? [],
    scheduleError: isError,
    refreshSchedules: refetch,
  };
};

export default useSchedules;

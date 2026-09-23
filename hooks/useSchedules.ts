"use client";

import { queryKeys } from "@/services/queryCache";
import { useQuery } from "@tanstack/react-query";
import { fetchUpcomingSchedules } from "@/services/scheduleApi";

const useSchedules = () => {
  const { data, isPending, refetch } = useQuery({
    queryKey: queryKeys.upcomingSchedules,
    queryFn: fetchUpcomingSchedules,
  });

  return {
    scheduleLoading: isPending,
    scheduleData: data ?? [],
    refreshStatistics: refetch,
  };
};

export default useSchedules;

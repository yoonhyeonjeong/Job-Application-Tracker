"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUpcomingSchedules } from "@/services/scheduleApi";

const useSchedules = () => {
  const { data, isPending, refetch } = useQuery({
    queryKey: ["upcomingSchedules"],
    queryFn: fetchUpcomingSchedules,
  });

  return {
    scheduleLoading: isPending,
    scheduleData: data ?? [],
    refreshStatistics: refetch,
  };
};

export default useSchedules;

import { queryKeys } from "@/services/queryCache";
import { fetchStatisticsFunnel } from "@/services/statisticsApi";
import { useQuery } from "@tanstack/react-query";
import type { ApplicationFunnelResponse } from "@/types/statistics";

const useStatistics = (initialStatistics?: ApplicationFunnelResponse) => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: queryKeys.statistics,
    queryFn: fetchStatisticsFunnel,
    initialData: initialStatistics,
    staleTime: initialStatistics ? 30_000 : 0,
  });

  return {
    statisticsLoading: isPending,
    statisticsError: isError,
    statisticsData: data,
    refreshStatistics: refetch,
  };
};

export default useStatistics;

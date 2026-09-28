import { queryKeys } from "@/services/queryCache";
import { fetchStatisticsFunnel } from "@/services/statisticsApi";
import { useQuery } from "@tanstack/react-query";

const useStatistics = () => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: queryKeys.statistics,
    queryFn: fetchStatisticsFunnel,
  });

  return {
    statisticsLoading: isPending,
    statisticsError: isError,
    statisticsData: data,
    refreshStatistics: refetch,
  };
};

export default useStatistics;

import { fetchStatisticsFunnel } from "@/services/statisticsApi";
import { useQuery } from "@tanstack/react-query";

const useStatistics = () => {
  const { data, isPending, refetch } = useQuery({
    queryKey: ["statistics"],
    queryFn: fetchStatisticsFunnel,
  });

  return {
    statisticsLoading: isPending,
    statisticsData: data,
    refreshStatistics: refetch,
  };
};

export default useStatistics;

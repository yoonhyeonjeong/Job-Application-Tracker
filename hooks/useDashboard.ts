import { queryKeys } from "@/services/queryCache";
import { fetchDashboard } from "@/services/dashboardApi";
import type { DashboardResponse, DashboardSummary } from "@/types/dashboard";
import { useQuery } from "@tanstack/react-query";

export const useDashboard = (initialDashboard?: DashboardResponse) => {
  const { data, isPending, refetch, isError } = useQuery({
    queryKey: queryKeys.dashboard,
    queryFn: fetchDashboard,
    initialData: initialDashboard,
    staleTime: initialDashboard ? 30_000 : 0,
  });

  const summaryData: DashboardSummary = {
    totalCount: data?.summary.totalCount ?? 0, // 총 지원 건수
    inProgressCount: data?.summary.inProgressCount ?? 0, // 진행중 건수
    interviewCount: data?.summary.interviewCount ?? 0, // 면접 건수
    offerCount: data?.summary.offerCount ?? 0, // 오퍼 건수
  };

  return {
    dashboardLoading: isPending,
    dashboardError: isError,
    refreshDashboard: refetch,
    summaryData,
    dashboardData: data,
  };
};

export default useDashboard;

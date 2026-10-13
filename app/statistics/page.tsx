import StatisticsContent from "@/components/statistics/StatisticsContent";
import { fetchDashboardOnServer } from "@/services/dashboardServerApi";
import { fetchStatisticsOnServer } from "@/services/statisticsServerApi";

const StatisticsPage = async () => {
  const [statisticsResult, dashboardResult] = await Promise.allSettled([
    fetchStatisticsOnServer(),
    fetchDashboardOnServer(),
  ]);

  if (statisticsResult.status === "rejected") {
    console.error("통계 서버 조회 실패:", statisticsResult.reason);
  }
  if (dashboardResult.status === "rejected") {
    console.error("통계 페이지의 대시보드 요약 서버 조회 실패:", dashboardResult.reason);
  }

  return (
    <StatisticsContent
      initialStatistics={
        statisticsResult.status === "fulfilled" ? statisticsResult.value : undefined
      }
      initialDashboard={
        dashboardResult.status === "fulfilled" ? dashboardResult.value : undefined
      }
    />
  );
};

export default StatisticsPage;

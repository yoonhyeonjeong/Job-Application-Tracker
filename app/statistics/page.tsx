"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import useStatistics from "@/hooks/useStatistics";
import useDashboard from "@/hooks/useDashboard";
import { Skeleton } from "antd";
import StatisticsFunnel from "@/components/statistics/StatisticsFunnel";

const StatisticsPage = () => {
  // 통계함수 호출
  const { statisticsLoading, statisticsData } = useStatistics();
  // 대시보드 호출
  const { dashboardLoading, summaryData } = useDashboard();

  if (statisticsLoading || dashboardLoading) {
    return <Skeleton active paragraph={{ rows: 2 }} />;
  }
  return (
    <div className="page-stack">
      <PageHeader
        title="통계"
        description="대시보드 차트로 지원 상태와 전환 지표를 확인합니다."
      />
      <SummaryCards summary={summaryData} loading={dashboardLoading} />
      {statisticsData && <StatisticsFunnel data={statisticsData} />}
    </div>
  );
};

export default StatisticsPage;

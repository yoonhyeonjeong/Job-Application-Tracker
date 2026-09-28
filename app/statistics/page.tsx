"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import useStatistics from "@/hooks/useStatistics";
import useDashboard from "@/hooks/useDashboard";
import { Alert, Button, Skeleton } from "antd";
import StatisticsFunnel from "@/components/statistics/StatisticsFunnel";

const StatisticsPage = () => {
  // 통계함수 호출
  const {
    statisticsLoading,
    statisticsError,
    statisticsData,
    refreshStatistics,
  } = useStatistics();
  // 대시보드 호출
  const {
    dashboardLoading,
    dashboardError,
    summaryData,
    refreshDashboard,
  } = useDashboard();

  if (statisticsLoading || dashboardLoading) {
    return <Skeleton active paragraph={{ rows: 2 }} />;
  }
  return (
    <div className="page-stack">
      <PageHeader
        title="통계"
        description="대시보드 차트로 지원 상태와 전환 지표를 확인합니다."
      />
      {dashboardError ? (
        <Alert
          type="error"
          showIcon
          message="지원 현황을 불러오지 못했습니다."
          action={
            <Button
              size="small"
              onClick={() => void refreshDashboard()}
            >
              다시 시도
            </Button>
          }
        />
      ) : (
        <SummaryCards summary={summaryData} loading={dashboardLoading} />
      )}

      {statisticsError ? (
        <Alert
          type="error"
          showIcon
          message="통계 정보를 불러오지 못했습니다."
          action={
            <Button
              size="small"
              onClick={() => void refreshStatistics()}
            >
              다시 시도
            </Button>
          }
        />
      ) : (
        statisticsData && <StatisticsFunnel data={statisticsData} />
      )}
    </div>
  );
};

export default StatisticsPage;

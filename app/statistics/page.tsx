import type { ReactNode } from "react";
import { StatisticsDashboardChart } from "@/components/dashboard/StatisticsDashboardChart";
import { StatisticsCards } from "@/components/dashboard/StatisticsCards";
import { PageHeader } from "@/components/common/PageHeader";
import { getApplications } from "@/services/applicationService";
import { getStatusOverview } from "@/services/dashboardService";

const StatisticsPage = async (): Promise<ReactNode> => {
  const applications = await getApplications();
  const interviewCount = applications.filter(
    (application) => application.status === "interview",
  ).length;
  const offerCount = applications.filter(
    (application) => application.status === "offer",
  ).length;
  const rejectedCount = applications.filter(
    (application) => application.status === "rejected",
  ).length;
  const total = applications.length || 1;
  const statusOverview = await getStatusOverview();

  return (
    <div className="page-stack">
      <PageHeader
        title="통계"
        description="대시보드 차트로 지원 상태와 전환 지표를 확인합니다."
      />
      <StatisticsCards
        interviewRate={Math.round((interviewCount / total) * 100)}
        offerRate={Math.round((offerCount / total) * 100)}
        rejectedRate={Math.round((rejectedCount / total) * 100)}
      />
      <StatisticsDashboardChart items={statusOverview} />
    </div>
  );
};

export default StatisticsPage;

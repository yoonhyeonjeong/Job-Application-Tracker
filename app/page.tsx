"use client";

import { Col, Row } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { RecentApplicationsTable } from "@/components/dashboard/RecentApplicationsTable";
import { StatusOverview } from "@/components/dashboard/StatusOverview";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { UpcomingSchedules } from "@/components/dashboard/UpcomingSchedules";
import { useDashboard } from "@/hooks/useDashboard";
import { MonthlyOverview } from "@/components/dashboard/MonthlyOverview";

const DashboardPage = () => {
  const {
    summary,
    recentApplications,
    upcomingSchedules,
    statusOverview,
    loading,
  } = useDashboard();
  return (
    <div className="page-stack">
      <PageHeader
        title="대시보드"
        description="지원 현황, 다음 액션, 면접 일정을 한 화면에서 확인합니다."
      />
      <SummaryCards summary={summary} loading={loading} />
      <Row gutter={[16, 16]}>
        <Col xs={24} xl={16}>
          <RecentApplicationsTable
            applications={recentApplications}
            loading={loading}
          />
        </Col>
        {upcomingSchedules && (
          <Col xs={24} xl={8}>
            <UpcomingSchedules
              schedules={upcomingSchedules}
              loading={loading}
            />
          </Col>
        )}
        <Col xs={24} xl={12}>
          <StatusOverview items={statusOverview} />
        </Col>
        <Col xs={24} xl={12}>
          <MonthlyOverview items={statusOverview} />
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;

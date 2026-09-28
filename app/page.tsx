"use client";

import { Alert, Button, Col, Row, Skeleton } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { RecentApplicationsTable } from "@/components/dashboard/RecentApplicationsTable";
import { StatusOverview } from "@/components/dashboard/StatusOverview";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { MonthlyOverview } from "@/components/dashboard/MonthlyOverview";
import { useApplicationsQuery } from "@/hooks/useApplicationsQuery";
import { UpcomingSchedules } from "@/components/dashboard/UpcomingSchedules";
import useSchedules from "@/hooks/useSchedules";
import useDashboard from "@/hooks/useDashboard";

const DashboardPage = () => {
  // 검색 필터를 적용하지 않은 전체 지원 목록
  const {
    data: applications = [],
    isPending: loading,
    isError: applicationError,
    refetch: refetchApplications,
  } = useApplicationsQuery();
  // 다가오는 일정
  const { scheduleLoading, scheduleData, scheduleError, refreshStatistics } = useSchedules();
  // 대시보드
  const { dashboardLoading, summaryData, dashboardData, dashboardError, refreshDashboard } = useDashboard();

  if (dashboardLoading || scheduleLoading || loading) {
    return <Skeleton active paragraph={{ rows: 2 }} />;
  }

  return (
    <div className="page-stack">
      <PageHeader title="대시보드" description="지원 현황, 다음 액션, 면접 일정을 한 화면에서 확인합니다." />
      {dashboardError ?
        <Alert
          type="error"
          message="지원 현황을 불러오지 못했습니다."
          showIcon
          action={
            <Button size="small" onClick={() => void refreshDashboard()}>
              다시 시도
            </Button>
          }
        />
      : <SummaryCards summary={summaryData} loading={dashboardLoading} />}
      <Row gutter={[16, 16]}>
        <Col xs={24} xl={16}>
          <RecentApplicationsTable
            applications={applications}
            loading={loading}
            error={applicationError}
            refetch={refetchApplications}
          />
        </Col>
        {/* 다가오는일정 */}
        <Col xs={24} xl={8}>
          <UpcomingSchedules
            schedules={scheduleData}
            loading={scheduleLoading}
            error={scheduleError}
            refetch={refreshStatistics}
          />
        </Col>
        <Col xs={24} xl={12}>
          <StatusOverview items={dashboardData?.statusCounts ?? []} error={dashboardError} refetch={refreshDashboard} />
        </Col>
        <Col xs={24} xl={12}>
          <MonthlyOverview
            items={dashboardData?.monthlyCounts ?? []}
            error={dashboardError}
            refetch={refreshDashboard}
          />
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;

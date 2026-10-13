"use client";

import { Alert, Button, Col, Row } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { RecentApplicationsTable } from "@/components/dashboard/RecentApplicationsTable";
import { StatusOverview } from "@/components/dashboard/StatusOverview";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { MonthlyOverview } from "@/components/dashboard/MonthlyOverview";
import { useApplicationsQuery } from "@/hooks/useApplicationsQuery";
import { UpcomingSchedules } from "@/components/dashboard/UpcomingSchedules";
import useSchedules from "@/hooks/useSchedules";
import useDashboard from "@/hooks/useDashboard";
import type { ApplicationResponse } from "@/types/application";
import type { DashboardResponse } from "@/types/dashboard";
import type { ScheduleResponse } from "@/types/schedule";

interface DashboardContentProps {
  initialApplications?: ApplicationResponse[];
  initialDashboard?: DashboardResponse;
  initialSchedules?: ScheduleResponse[];
}

const DashboardContent = ({ initialApplications, initialDashboard, initialSchedules }: DashboardContentProps) => {
  const {
    data: applications = [],
    isPending: loading,
    isError: applicationError,
    refetch: refetchApplications,
  } = useApplicationsQuery(initialApplications);

  const { scheduleLoading, scheduleData, scheduleError, refreshSchedules } = useSchedules(initialSchedules);

  const { dashboardLoading, summaryData, dashboardData, dashboardError, refreshDashboard } =
    useDashboard(initialDashboard);

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

        <Col xs={24} xl={8}>
          <UpcomingSchedules
            schedules={scheduleData}
            loading={scheduleLoading}
            error={scheduleError}
            refetch={refreshSchedules}
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

export default DashboardContent;

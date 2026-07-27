"use client";

import { Col, Row } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { RecentApplicationsTable } from "@/components/dashboard/RecentApplicationsTable";
import { StatusOverview } from "@/components/dashboard/StatusOverview";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { MonthlyOverview } from "@/components/dashboard/MonthlyOverview";
import { useCallback, useEffect, useState } from "react";
import { ScheduleResponse } from "@/types/schedule";
import { useApplicationStore } from "@/hooks/useApplicationStore";
import { fetchUpcomingSchedules } from "@/services/scheduleApi";
import { UpcomingSchedules } from "@/components/dashboard/UpcomingSchedules";
import { fetchDashboard } from "@/services/dashboardApi";
import { DashboardResponse, DashboardSummary } from "@/types/dashboard";

const DashboardPage = () => {
  const [scheduleLoading, setScheduleLoading] = useState<boolean>(false);
  // 지원목록 store
  const { applications, loadApplications, loading } = useApplicationStore();
  // 다가오는 일정
  const [scheduleData, SetScheduleData] = useState<ScheduleResponse[]>([]);
  // 대시보드
  const [dashboardData, setDashboardData] = useState<DashboardResponse>();
  const fetchSchedules = useCallback(async () => {
    try {
      const data = await fetchUpcomingSchedules();
      SetScheduleData(data);
    } catch (error) {
      console.error(error);
    } finally {
    }
  }, []);

  // 대시보드 호출
  const loadDashboard = useCallback(async () => {
    try {
      const data = await fetchDashboard();
      setDashboardData(data);
    } catch (error) {
      console.error(error);
    } finally {
    }
  }, []);

  useEffect(() => {
    loadApplications();
    fetchSchedules();
    loadDashboard();
  }, [loadApplications, fetchSchedules, loadDashboard]);

  // 대시보드 카드
  const summaryData: DashboardSummary = {
    totalCount: dashboardData?.summary.totalCount ?? 0, // 총 지원 건수
    inProgressCount: dashboardData?.summary.inProgressCount ?? 0, // 진행중 건수
    interviewCount: dashboardData?.summary.interviewCount ?? 0, // 면접 건수
    offerCount: dashboardData?.summary.offerCount ?? 0, // 오퍼 건수
  };

  return (
    <div className="page-stack">
      <PageHeader
        title="대시보드"
        description="지원 현황, 다음 액션, 면접 일정을 한 화면에서 확인합니다."
      />
      <SummaryCards summary={summaryData} loading={loading} />
      <Row gutter={[16, 16]}>
        <Col xs={24} xl={16}>
          <RecentApplicationsTable
            applications={applications}
            loading={loading}
          />
        </Col>
        {/* 다가오는일정 */}
        <Col xs={24} xl={8}>
          <UpcomingSchedules
            schedules={scheduleData}
            loading={scheduleLoading}
          />
        </Col>
        <Col xs={24} xl={12}>
          <StatusOverview items={dashboardData?.statusCounts ?? []} />
        </Col>
        <Col xs={24} xl={12}>
          <MonthlyOverview items={dashboardData?.monthlyCounts ?? []} />
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;

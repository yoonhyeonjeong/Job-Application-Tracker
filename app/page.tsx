"use client";

import { Col, Row } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { RecentApplicationsTable } from "@/components/dashboard/RecentApplicationsTable";
import { StatusOverview } from "@/components/dashboard/StatusOverview";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { UpcomingSchedules } from "@/components/dashboard/UpcomingSchedules";
import { useDashboard } from "@/hooks/useDashboard";
import { MonthlyOverview } from "@/components/dashboard/MonthlyOverview";
import { useCallback, useEffect, useState } from "react";
import { fetchApplications } from "@/services/applicationApi";
import { ApplicationResponse } from "@/types/application";
import { Schedule } from "@/types/schedule";
import { statusOptions } from "@/utils/format";

const DashboardPage = () => {
  // 최근 지원 data
  const [recentData, setRecentData] = useState<ApplicationResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    summary,
    // recentApplications,
    upcomingSchedules,
    // statusOverview,
    // loading,
  } = useDashboard();

  // 전체 data 호출
  const getFetchData = useCallback(async () => {
    setLoading(true);

    try {
      const data = await fetchApplications();
      setRecentData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getFetchData();
  }, [getFetchData]);

  //  summary data (백에서 처리할것)
  const summaryData = {
    totalCount: recentData.length, // 총 지원 건수
    appliedCount: recentData.filter((data) => data.status === "applied").length, // 지원 완료
    documentPassedCount: recentData.filter(
      (data) => data.status === "documentPassed",
    ).length, // 서류 통과
    interviewCount: recentData.filter((data) => data.status === "interview")
      .length, // 면접 예정
  };

  // 지원현황
  const statusOverview = statusOptions.map((item, i) => {
    return {
      status: item.value,
      count: recentData.filter((data) => data.status === item.value).length,
    };
  });

  const schedulesMock: Schedule[] = [
    {
      id: "schedule-1",
      applicationId: "app-1",
      type: "interview",
      title: "모카 소프트",
      scheduledAt: "2026-07-10T14:00:00.000Z",
      description: "React architecture and performance discussion",
    },
    {
      id: "schedule-2",
      applicationId: "app-2",
      type: "deadline",
      title: "모카 소프트",
      scheduledAt: "2026-07-11T01:00:00.000Z",
    },
    {
      id: "schedule-3",
      applicationId: "app-3",
      type: "deadline",
      title: "카카오페이",
      scheduledAt: "2026-07-12T09:00:00.000Z",
    },
    {
      id: "schedule-4",
      applicationId: "app-4",
      type: "assignment",
      title: "토스",
      scheduledAt: "2026-07-06T14:00:00.000Z",
    },
  ];

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
            applications={recentData}
            loading={loading}
          />
        </Col>
        {/* 다가오는일정 */}
        {/* <Col xs={24} xl={8}>
          <UpcomingSchedules schedules={upcomingSchedules} loading={loading} />
        </Col> */}
        <Col xs={24} xl={12}>
          <StatusOverview items={statusOverview} />
        </Col>
        {/* <Col xs={24} xl={12}>
          <MonthlyOverview items={statusOverview} />
        </Col> */}
      </Row>
    </div>
  );
};

export default DashboardPage;

"use client";

import { useEffect, useState } from "react";
import {
  getDashboardSummary,
  getRecentApplications,
  getStatusOverview,
  getUpcomingSchedules,
} from "@/services/dashboardService";
import type { Application } from "@/types/application";
import type { DashboardSummary, StatusOverviewItem } from "@/types/dashboard";
import type { Schedule } from "@/types/schedule";

export const useDashboard = () => {
  // 대시보드 정보
  const [summary, setSummary] = useState<DashboardSummary>();
  // 최근 지원 정보
  const [recentApplications, setRecentApplications] = useState<Application[]>(
    [],
  );
  // 다가오는 면접일정
  const [upcomingSchedules, setUpcomingSchedules] = useState<Schedule[]>([]);
  // 상태별 현황
  const [statusOverview, setStatusOverview] = useState<StatusOverviewItem[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      try {
        const [summaryData, recentData, scheduleData, overviewData] =
          await Promise.all([
            getDashboardSummary(),
            getRecentApplications(),
            getUpcomingSchedules(),
            getStatusOverview(),
          ]);

        setSummary(summaryData);
        setRecentApplications(recentData);
        setUpcomingSchedules(scheduleData);
        setStatusOverview(overviewData);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return {
    summary,
    recentApplications,
    upcomingSchedules,
    statusOverview,
    loading,
  };
};

import { fetchDashboard } from "@/services/dashboardApi";
import { DashboardResponse, DashboardSummary } from "@/types/dashboard";
import React, { useCallback, useEffect, useState } from "react";

const useDashboard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(
    null,
  );
  const loadDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchDashboard();
      setDashboardData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const summaryData: DashboardSummary = {
    totalCount: dashboardData?.summary.totalCount ?? 0, // 총 지원 건수
    inProgressCount: dashboardData?.summary.inProgressCount ?? 0, // 진행중 건수
    interviewCount: dashboardData?.summary.interviewCount ?? 0, // 면접 건수
    offerCount: dashboardData?.summary.offerCount ?? 0, // 오퍼 건수
  };

  return {
    dashboardLoading: loading,
    refreshDashboard: loadDashboard,
    summaryData,
  };
};

export default useDashboard;

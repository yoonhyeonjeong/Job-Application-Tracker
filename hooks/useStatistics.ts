import { fetchStatisticsFunnel } from "@/services/statisticsApi";
import { ApplicationFunnelResponse } from "@/types/statistics";
import React, { useCallback, useEffect, useState } from "react";

const useStatistics = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [statisticsData, setStatisticsData] =
    useState<ApplicationFunnelResponse | null>(null);

  const loadStatistics = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchStatisticsFunnel();
      setStatisticsData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStatistics();
  }, [loadStatistics]);

  return {
    statisticsLoading: loading,
    statisticsData,
    refreshStatistics: loadStatistics,
  };
};

export default useStatistics;

import { fetchUpcomingSchedules } from "@/services/scheduleApi";
import { ScheduleResponse } from "@/types/schedule";
import React, { useCallback, useEffect, useState } from "react";

const useSchedules = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [scheduleData, SetScheduleData] = useState<ScheduleResponse[]>([]);

  const fetchSchedules = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchUpcomingSchedules();
      SetScheduleData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  return {
    scheduleLoading: loading,
    scheduleData,
    refreshStatistics: fetchSchedules,
  };
};

export default useSchedules;

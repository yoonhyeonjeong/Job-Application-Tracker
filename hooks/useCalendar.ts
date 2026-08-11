import { MonthlyScheduleParams, ScheduleResponse } from "@/types/schedule";
import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { fetchSchedule } from "@/services/scheduleApi";

const useCalendar = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [calendarData, setCalendarData] = useState<ScheduleResponse[]>([]);
  const [calendarParams, setCalendarParams] = useState<MonthlyScheduleParams>(
    () => ({
      startDate: dayjs().startOf("month").format("YYYY-MM-DD"),
      endDate: dayjs().endOf("month").format("YYYY-MM-DD"),
    }),
  );

  const loadSchedules = useCallback(async (params: MonthlyScheduleParams) => {
    try {
      setLoading(true);

      const data = await fetchSchedule(params);
      setCalendarData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleMonthChange = useCallback(
    async (params: MonthlyScheduleParams) => {
      setCalendarParams(params);
      await loadSchedules(params);
    },
    [loadSchedules],
  );

  const refreshSchedules = useCallback(async () => {
    await loadSchedules(calendarParams);
  }, [loadSchedules, calendarParams]);

  return {
    calendarLoading: loading,
    calendarData,
    handleMonthChange,
    refreshSchedules,
  };
};

export default useCalendar;

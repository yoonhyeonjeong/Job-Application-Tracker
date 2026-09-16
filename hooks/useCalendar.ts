import { MonthlyScheduleParams } from "@/types/schedule";
import { useCallback, useState } from "react";
import dayjs from "dayjs";
import { fetchSchedule } from "@/services/scheduleApi";
import { useQuery } from "@tanstack/react-query";

const useCalendar = () => {
  const [calendarParams, setCalendarParams] = useState<MonthlyScheduleParams>(
    () => ({
      startDate: dayjs().startOf("month").format("YYYY-MM-DD"),
      endDate: dayjs().endOf("month").format("YYYY-MM-DD"),
    }),
  );

  const {
    data: calendarData = [],
    isPending: calendarLoading,
    refetch: refetchSchedules,
  } = useQuery({
    queryKey: ["schedules", calendarParams],
    queryFn: () => fetchSchedule(calendarParams),
  });

  const handleMonthChange = useCallback((params: MonthlyScheduleParams) => {
    setCalendarParams(params);
  }, []);

  const refreshSchedules = useCallback(async () => {
    await refetchSchedules();
  }, [refetchSchedules]);

  return {
    calendarLoading: calendarLoading,
    calendarData,
    handleMonthChange,
    refreshSchedules,
  };
};

export default useCalendar;

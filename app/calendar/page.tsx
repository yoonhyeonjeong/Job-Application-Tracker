"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { fetchSchedule } from "@/services/scheduleApi";
import { MonthlyScheduleParams, ScheduleResponse } from "@/types/schedule";
import dayjs from "dayjs";
import ScheduleCalendar from "@/components/calendar/ScheduleCalendar";

const CalendarPage = () => {
  const [calendarData, setCalendarData] = useState<ScheduleResponse[]>([]);

  const [calendarParams, setCalendarParams] = useState<MonthlyScheduleParams>(
    () => ({
      startDate: dayjs().startOf("month").format("YYYY-MM-DD"),
      endDate: dayjs().endOf("month").format("YYYY-MM-DD"),
    }),
  );

  const loadSchedules = useCallback(async (params: MonthlyScheduleParams) => {
    try {
      const data = await fetchSchedule(params);
      setCalendarData(data);
    } catch (error) {
      console.error(error);
    } finally {
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

  return (
    <div className="page-stack">
      <PageHeader
        title="일정"
        description="면접, 과제, 마감일, 후속 연락 일정을 확인합니다."
      />
      <ScheduleCalendar
        schedule={calendarData}
        onMonthChange={handleMonthChange}
        onSuccess={refreshSchedules}
      />
    </div>
  );
};

export default CalendarPage;

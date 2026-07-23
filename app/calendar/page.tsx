"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { fetchSchedule } from "@/services/scheduleApi";
import { MonthlyScheduleParams, ScheduleResponse } from "@/types/schedule";
import dayjs from "dayjs";
import ScheduleCalendar from "@/components/calendar/ScheduleCalendar";

const CalendarPage = () => {
  const [calendarData, setCalendarData] = useState<ScheduleResponse[]>([]);
  const currentMonth = dayjs();
  const startDate = currentMonth.startOf("month").format("YYYY-MM-DD");
  const endDate = currentMonth.endOf("month").format("YYYY-MM-DD");

  const loadSchedules = useCallback(async () => {
    try {
      const params: MonthlyScheduleParams = {
        startDate: startDate,
        endDate: endDate,
      };

      const data = await fetchSchedule(params);
      setCalendarData(data);
    } catch (error) {
      console.error(error);
    } finally {
    }
  }, []);

  useEffect(() => {
    loadSchedules();
  }, [loadSchedules]);

  console.log(calendarData);
  return (
    <div className="page-stack">
      <PageHeader
        title="일정"
        description="면접, 과제, 마감일, 후속 연락 일정을 확인합니다."
      />
      <ScheduleCalendar schedule={calendarData} />
    </div>
  );
};

export default CalendarPage;

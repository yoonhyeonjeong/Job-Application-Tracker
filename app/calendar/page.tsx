"use client";

import { PageHeader } from "@/components/common/PageHeader";
import ScheduleCalendar from "@/components/calendar/ScheduleCalendar";
import useCalendar from "@/hooks/useCalendar";

const CalendarPage = () => {
  const { calendarData, handleMonthChange } = useCalendar();

  return (
    <div className="page-stack">
      <PageHeader
        title="일정"
        description="면접, 과제, 마감일, 후속 연락 일정을 확인합니다."
      />

      <ScheduleCalendar
        schedule={calendarData}
        onMonthChange={handleMonthChange}
      />
    </div>
  );
};

export default CalendarPage;

"use client";

import { PageHeader } from "@/components/common/PageHeader";
import ScheduleCalendar from "@/components/calendar/ScheduleCalendar";
import useCalendar from "@/hooks/useCalendar";
import { Alert, Button } from "antd";

const CalendarPage = () => {
  const { calendarData, handleMonthChange, calendarError, refreshSchedules } = useCalendar();

  return (
    <div className="page-stack">
      <PageHeader title="일정" description="면접, 과제, 마감일, 후속 연락 일정을 확인합니다." />
      {calendarError && (
        <Alert
          type="error"
          showIcon
          message="일정을 불러오지 못했습니다. 다시 시도해 주세요."
          action={
            <Button size="small" onClick={() => refreshSchedules()}>
              다시 시도
            </Button>
          }
        />
      )}
      <ScheduleCalendar schedule={calendarData} onMonthChange={handleMonthChange} />
    </div>
  );
};

export default CalendarPage;

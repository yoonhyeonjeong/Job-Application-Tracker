"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import classicThemePlugin from "@fullcalendar/react/themes/classic";

import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/classic/theme.css";
import "@fullcalendar/react/themes/classic/palette.css";
import { ScheduleResponse, ScheduleType } from "@/types/schedule";
import { Badge, Flex } from "antd";
import { scheduleTypeColors } from "@/utils/schedules";

interface ScheduleCalendarProps {
  schedule: ScheduleResponse[];
}

const ScheduleCalendar = ({ schedule }: ScheduleCalendarProps) => {
  const calendarEvents = schedule.map((schedule) => {
    return {
      id: String(schedule.id),
      title: `${schedule.companyName} ${schedule.title}`,
      start: schedule.scheduledAt,
      color: scheduleTypeColors[schedule.scheduleType],
      className: `schedule-event-${schedule.scheduleType}`,
    };
  });

  return (
    <>
      <Flex gap="small">
        <Badge color="#1FA463" text="면접" />
        <Badge color="#D99A00" text="과제" />
      </Flex>

      <FullCalendar
        plugins={[dayGridPlugin, classicThemePlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "",
        }}
        height="auto"
        events={calendarEvents}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        dayMaxEvents={3}
        //   dateClick={handleDateClick}
      />
    </>
  );
};

export default ScheduleCalendar;

"use client";

import FullCalendar, { EventClickInfo } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import classicThemePlugin from "@fullcalendar/react/themes/classic";

import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/classic/theme.css";
import "@fullcalendar/react/themes/classic/palette.css";
import { ScheduleResponse } from "@/types/schedule";
import { Badge, Flex } from "antd";
import { scheduleTypeColors } from "@/utils/schedules";
import { useState } from "react";
import ScheduleDetailModal from "../applications/ScheduleDetailModal";

interface ScheduleCalendarProps {
  schedule: ScheduleResponse[];
  onSuccess: () => void;
}

const ScheduleCalendar = ({ schedule, onSuccess }: ScheduleCalendarProps) => {
  const [selectedSchedule, setSelectedSchedule] =
    useState<ScheduleResponse | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false);

  const calendarEvents = schedule.map((schedule) => {
    return {
      id: String(schedule.id),
      title: `${schedule.companyName} ${schedule.title}`,
      start: schedule.scheduledAt,
      color: scheduleTypeColors[schedule.scheduleType],
      className: `schedule-event-${schedule.scheduleType}`,
    };
  });

  const handleEventClick = (info: EventClickInfo) => {
    const scheduleId = Number(info.event.id);

    const selected = schedule.find((item) => item.id === scheduleId);

    if (!selected) return;

    setSelectedSchedule(selected);
    setDetailModalOpen(true);
  };

  const handleCloseScheduleDetail = async () => {
    setDetailModalOpen(false);
  };

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
        eventClick={handleEventClick}
      />

      {selectedSchedule && detailModalOpen && (
        <ScheduleDetailModal
          schedule={selectedSchedule}
          open={detailModalOpen}
          onCancel={handleCloseScheduleDetail}
          onSuccess={onSuccess}
        />
      )}
    </>
  );
};

export default ScheduleCalendar;

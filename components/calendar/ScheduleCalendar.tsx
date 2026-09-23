"use client";

import FullCalendar, {
  EventClickInfo,
  type DatesSetInfo,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import classicThemePlugin from "@fullcalendar/react/themes/classic";
import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/classic/theme.css";
import "@fullcalendar/react/themes/classic/palette.css";
import { MonthlyScheduleParams, ScheduleResponse } from "@/types/schedule";
import { Badge, Flex } from "antd";
import { scheduleTypeColors } from "@/utils/schedules";
import { useState } from "react";
import ScheduleDetailModal from "../applications/ScheduleDetailModal";
import dayjs from "dayjs";

interface ScheduleCalendarProps {
  schedule: ScheduleResponse[];
  onMonthChange: (params: MonthlyScheduleParams) => void;
}

const ScheduleCalendar = ({
  schedule,
  onMonthChange,
}: ScheduleCalendarProps) => {
  const [selectedSchedule, setSelectedSchedule] =
    useState<ScheduleResponse | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false);

  const filterInterviewCount = schedule.filter(
    (schedule) => schedule.scheduleType === "interview",
  ).length;
  const filterAssignmentCount = schedule.filter(
    (schedule) => schedule.scheduleType === "assignment",
  ).length;

  const calendarEvents = schedule.map((schedule) => {
    return {
      id: String(schedule.id),
      title: `${schedule.companyName} ${schedule.title}`,
      start: schedule.scheduledAt,
      color: scheduleTypeColors[schedule.scheduleType],
      className: `schedule-event-${schedule.scheduleType}`,
    };
  });

  const handleDatesSet = (info: DatesSetInfo) => {
    const params: MonthlyScheduleParams = {
      startDate: dayjs(info.view.currentStart).format("YYYY-MM-DD"),
      endDate: dayjs(info.view.currentEnd)
        .subtract(1, "day")
        .format("YYYY-MM-DD"),
    };

    onMonthChange(params);
  };

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
        이번 달 전체 {schedule.length}건
        <Badge color="#1FA463" text={`면접 ${filterInterviewCount}건`} />
        <Badge color="#D99A00" text={`과제 ${filterAssignmentCount}건`} />
      </Flex>

      <FullCalendar
        plugins={[dayGridPlugin, classicThemePlugin]}
        initialView="dayGridMonth"
        datesSet={handleDatesSet}
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
        />
      )}
    </>
  );
};

export default ScheduleCalendar;

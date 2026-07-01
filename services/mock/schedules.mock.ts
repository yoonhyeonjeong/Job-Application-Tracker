import type { Schedule } from "@/types/schedule";

// 일정 목업 데이터
export const schedulesMock: Schedule[] = [
  {
    id: "schedule-1",
    applicationId: "app-1",
    type: "interview",
    title: "Naver Cloud technical interview",
    scheduledAt: "2026-07-03T14:00:00.000Z",
    description: "React architecture and performance discussion",
  },
  {
    id: "schedule-2",
    applicationId: "app-3",
    type: "deadline",
    title: "Line Plus portfolio follow-up",
    scheduledAt: "2026-07-02T01:00:00.000Z",
  },
  {
    id: "schedule-3",
    applicationId: "app-2",
    type: "deadline",
    title: "Kakao Pay screening follow-up",
    scheduledAt: "2026-07-01T09:00:00.000Z",
  },
  {
    id: "schedule-4",
    applicationId: "app-4",
    type: "assignment",
    title: "Offer condition review",
    scheduledAt: "2026-07-04T06:00:00.000Z",
  },
];

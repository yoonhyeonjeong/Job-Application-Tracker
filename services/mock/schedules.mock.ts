import type { Schedule } from "@/types/schedule";

// 다가오는 일정 목업 데이터
export const schedulesMock: Schedule[] = [
  {
    id: "schedule-1",
    applicationId: "app-1",
    type: "interview",
    title: "모카 소프트",
    scheduledAt: "2026-07-03T14:00:00.000Z",
    description: "React architecture and performance discussion",
  },
  {
    id: "schedule-2",
    applicationId: "app-2",
    type: "deadline",
    title: "모카 소프트",
    scheduledAt: "2026-07-02T01:00:00.000Z",
  },
  {
    id: "schedule-3",
    applicationId: "app-3",
    type: "deadline",
    title: "카카오페이",
    scheduledAt: "2026-07-01T09:00:00.000Z",
  },
  {
    id: "schedule-4",
    applicationId: "app-4",
    type: "assignment",
    title: "토스",
    scheduledAt: "2026-07-06T14:00:00.000Z",
  },
];

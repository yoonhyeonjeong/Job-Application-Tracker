// 면접일, 과제 제출일, 마감일
export type ScheduleType = "interview" | "assignment" | "deadline";

export interface Schedule {
  id: string;
  applicationId: string;
  type: ScheduleType;
  title: string;
  scheduledAt: string;
  description?: string;
}

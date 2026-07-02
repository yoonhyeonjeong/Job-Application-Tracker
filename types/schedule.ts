export type ScheduleType = "interview" | "assignment" | "deadline";

export interface Schedule {
  id: string;
  applicationId: string;
  type: ScheduleType;
  title: string;
  scheduledAt: string;
  description?: string;
}

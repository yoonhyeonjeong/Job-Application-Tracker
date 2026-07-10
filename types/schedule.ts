export type ScheduleType = "interview" | "assignment" | "deadline";

export interface ScheduleResponse {
  id: number;
  applicationId: number;
  type: ScheduleType;
  title: string;
  scheduledAt: string;
  memo?: string;
}

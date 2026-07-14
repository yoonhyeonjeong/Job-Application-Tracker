export type ScheduleType = "interview" | "assignment" | "deadline";

export interface ScheduleResponse {
  id: number;
  applicationId: number;
  type: ScheduleType;
  title: string;
  companyName: string;
  scheduledAt: string;
  memo?: string;
}

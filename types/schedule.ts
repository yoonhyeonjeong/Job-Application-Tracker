export type ScheduleType = "interview" | "assignment" | "deadline";

export interface Schedule {
  id: number;
  applicationId: number;
  type: ScheduleType;
  title: string;
  scheduledDate: string;
  memo?: string;
}

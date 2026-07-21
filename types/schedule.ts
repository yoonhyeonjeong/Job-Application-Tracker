export type ScheduleType = "interview" | "assignment" | "deadline";

export interface SchedulePayload {
  applicationId: number;
  scheduleType: ScheduleType;
  title: string;
  scheduledAt: string;
  memo?: string;
}

export interface ScheduleResponse {
  id: number;
  applicationId: number;
  scheduleType: ScheduleType;
  title: string;
  companyName: string;
  scheduledAt: string;
  memo?: string;
}

export interface ScheduleDetailResponse {
  id: number;
  applicationId: number;
  type: string;
  title: string;
  scheduledAt: string;
  memo?: string;
}

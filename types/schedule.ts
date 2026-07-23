export type ScheduleType = "interview" | "assignment";

export interface MonthlyScheduleParams {
  startDate: string;
  endDate: string;
}

export interface SchedulePayload {
  applicationId: number;
  scheduleType: ScheduleType;
  title: string;
  scheduledAt: string;
  memo?: string;
}

export interface UpdateSchedulePayload {
  scheduleType?: ScheduleType;
  title?: string;
  scheduledAt?: string;
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
  type: ScheduleType;
  title: string;
  scheduledAt: string;
  memo?: string;
}

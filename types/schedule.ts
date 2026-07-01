export type ScheduleType = 'interview' | 'assignment' | 'deadline' | 'followUp';

export interface Schedule {
  id: string;
  applicationId: string;
  type: ScheduleType;
  title: string;
  scheduledAt: string;
  description?: string;
}

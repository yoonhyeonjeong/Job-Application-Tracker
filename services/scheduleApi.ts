import { apiClient } from "@/services/apiClient";
import {
  SchedulePayload,
  ScheduleResponse,
  UpdateSchedulePayload,
} from "@/types/schedule";

export const postSchedule = async (payload: SchedulePayload): Promise<void> => {
  await apiClient.post("/schedules", payload);
};

export const updateSchedule = async (
  scheduleId: Number,
  payload: UpdateSchedulePayload,
): Promise<void> => {
  await apiClient.patch(`/schedules/${scheduleId}`, payload);
};

export const deleteSchedule = async (scheduleId: Number): Promise<void> => {
  await apiClient.delete(`/schedules/${scheduleId}`);
};

export const fetchUpcomingSchedules = async (): Promise<ScheduleResponse[]> => {
  const response = await apiClient.get<ScheduleResponse[]>(
    "/schedules/upcoming",
  );
  return response.data;
};

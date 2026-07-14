import { apiClient } from "@/services/apiClient";
import { SchedulePayload, ScheduleResponse } from "@/types/schedule";

export const postSchedule = async (payload: SchedulePayload): Promise<void> => {
  await apiClient.post("/schedules", payload);
};

export const fetchUpcomingSchedules = async (): Promise<ScheduleResponse[]> => {
  const response = await apiClient.get<ScheduleResponse[]>(
    "/schedules/upcoming",
  );
  return response.data;
};

import { apiClient } from "@/services/apiClient";
import { ScheduleResponse } from "@/types/schedule";

export const fetchUpcomingSchedules = async (): Promise<ScheduleResponse[]> => {
  const response = await apiClient.get<ScheduleResponse[]>(
    "/schedules/upcoming",
  );
  return response.data;
};

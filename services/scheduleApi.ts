import { apiClient } from "@/services/apiClient";
import { Schedule } from "@/types/schedule";

export const fetchUpcomingSchedules = async (): Promise<Schedule[]> => {
  const response = await apiClient.get<Schedule[]>("/schedules/upcoming");
  return response.data;
};

import { apiClient } from "@/services/apiClient";
import { DashboardResponse } from "@/types/dashboard";

export const fetchDashboard = async (): Promise<DashboardResponse> => {
  const response = await apiClient.get<DashboardResponse>("/dashboard");
  return response.data;
};

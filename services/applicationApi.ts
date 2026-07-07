import { apiClient } from "@/services/apiClient";
import type { ApplicationResponse } from "@/types/application";

export const fetchApplications = async (): Promise<ApplicationResponse[]> => {
  const response = await apiClient.get<ApplicationResponse[]>("/applications");

  return response.data;
};

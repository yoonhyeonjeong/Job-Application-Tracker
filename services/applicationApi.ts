import { apiClient } from "@/services/apiClient";
import type {
  ApplicationResponse,
  CreateApplicationPayload,
} from "@/types/application";

export const postApplication = async (
  payload: CreateApplicationPayload,
): Promise<void> => {
  await apiClient.post("/applications", payload);
};

export const fetchApplications = async (): Promise<ApplicationResponse[]> => {
  const response = await apiClient.get<ApplicationResponse[]>("/applications");
  return response.data;
};

export const fetchDetailApplication = async (
  id: number,
): Promise<ApplicationResponse> => {
  const response = await apiClient.get<ApplicationResponse>(
    `/applications/${id}`,
  );
  return response.data;
};

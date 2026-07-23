import { apiClient } from "@/services/apiClient";
import type {
  ApplicationResponse,
  ApplicationUpdatePayload,
  CreateApplicationPayload,
} from "@/types/application";
import { ScheduleDetailResponse } from "@/types/schedule";

export const postApplication = async (
  payload: CreateApplicationPayload,
): Promise<void> => {
  await apiClient.post("/applications", payload);
};

export const updateApplication = async (
  id: Number,
  payload: ApplicationUpdatePayload,
): Promise<void> => {
  await apiClient.patch(`/applications/${id}`, payload);
};

export const fetchApplications = async (): Promise<ApplicationResponse[]> => {
  const response = await apiClient.get<ApplicationResponse[]>("/applications");
  return response.data;
};

export const deleteApplication = async (id: Number): Promise<void> => {
  await apiClient.delete(`/applications/${id}`);
};

export const fetchDetailApplication = async (
  id: number,
): Promise<ApplicationResponse> => {
  const response = await apiClient.get<ApplicationResponse>(
    `/applications/${id}`,
  );
  return response.data;
};

export const fetchDetailSchedule = async (
  id: number,
): Promise<ScheduleDetailResponse[]> => {
  const response = await apiClient.get<ScheduleDetailResponse[]>(
    `/applications/${id}/schedules`,
  );
  return response.data;
};

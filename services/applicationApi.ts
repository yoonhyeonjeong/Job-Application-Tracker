import { apiClient } from '@/services/apiClient';
import type { Application, ApplicationCreatePayload } from '@/types/application';

export const fetchApplications = async (): Promise<Application[]> => {
  const response = await apiClient.get<Application[]>('/applications');
  return response.data;
};

export const postApplication = async (payload: ApplicationCreatePayload): Promise<Application> => {
  const response = await apiClient.post<Application>('/applications', payload);
  return response.data;
};

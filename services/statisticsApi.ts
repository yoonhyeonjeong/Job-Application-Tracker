import { apiClient } from "@/services/apiClient";
import { ApplicationFunnelResponse } from "@/types/statistics";

export const fetchStatisticsFunnel =
  async (): Promise<ApplicationFunnelResponse> => {
    const response =
      await apiClient.get<ApplicationFunnelResponse>("/statistics/funnel");

    return response.data;
  };

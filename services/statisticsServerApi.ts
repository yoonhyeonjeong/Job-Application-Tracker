import "server-only";
import type { ApplicationFunnelResponse } from "@/types/statistics";

export const fetchStatisticsOnServer = async (): Promise<ApplicationFunnelResponse> => {
  const response = await fetch(`${process.env.API_BASE_URL}/statistics/funnel`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("통계 정보를 불러오지 못했습니다.");
  }

  return response.json();
};

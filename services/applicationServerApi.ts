import "server-only";
import type { ApplicationResponse } from "@/types/application";

export const fetchDetailApplicationOnServer = async (id: number): Promise<ApplicationResponse> => {
  const response = await fetch(`${process.env.API_BASE_URL}/applications/${id}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("지원 정보를 불러오지 못했습니다.");
  }

  return response.json();
};

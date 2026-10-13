import "server-only";
import type { ApplicationResponse } from "@/types/application";
import type { DashboardResponse } from "@/types/dashboard";
import type { ScheduleResponse } from "@/types/schedule";

// 대시보드 조회
export const fetchDashboardOnServer = async (): Promise<DashboardResponse> => {
  const response = await fetch(`${process.env.API_BASE_URL}/dashboard`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("대시보드 정보를 불러오지 못했습니다.");
  }

  return response.json();
};

// 지원 정보 조회
export const fetchApplicationsOnServer = async (): Promise<ApplicationResponse[]> => {
  const response = await fetch(`${process.env.API_BASE_URL}/applications`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("지원 정보를 불러오지 못했습니다.");
  }

  return response.json();
};

// 다가오는 일정
export const fetchUpcomingSchedulesOnServer = async (): Promise<ScheduleResponse[]> => {
  const response = await fetch(`${process.env.API_BASE_URL}/schedules/upcoming`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("다음 일정을 불러오지 못했습니다.");
  }

  return response.json();
};

import { getApplications } from "@/services/applicationService";
import { schedulesMock } from "@/services/mock/schedules.mock";
import type { ApplicationResponse } from "@/types/application";
import type { DashboardSummary, StatusOverviewItem } from "@/types/dashboard";
import type { Schedule } from "@/types/schedule";
import { activeStatuses } from "@/utils/status";

// 대시보드 요약 정보
export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  const applications = await getApplications();

  return {
    totalCount: applications.length,
    activeCount: applications.filter((application) =>
      activeStatuses.includes(application.status),
    ).length,
    interviewCount: schedulesMock.filter(
      (schedule) => schedule.type === "interview",
    ).length,
    waitingCount: applications.filter(
      (application) => application.status === "applied",
    ).length,
  };
};

export const getRecentApplications = async (): Promise<ApplicationResponse[]> => {
  const applications = await getApplications();
  return [...applications].slice(0, 5);
};

export const getUpcomingSchedules = async (): Promise<Schedule[]> => {
  return [...schedulesMock];
};

export const getStatusOverview = async (): Promise<StatusOverviewItem[]> => {
  const applications = await getApplications();

  return applications.reduce<StatusOverviewItem[]>((items, application) => {
    const item = items.find((current) => current.status === application.status);
    if (item) {
      return items.map((current) =>
        current.status === application.status
          ? { ...current, count: current.count + 1 }
          : current,
      );
    }

    return [...items, { status: application.status, count: 1 }];
  }, []);
};

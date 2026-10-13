import DashboardContent from "@/components/dashboard/DashboardContent";
import {
  fetchApplicationsOnServer,
  fetchDashboardOnServer,
  fetchUpcomingSchedulesOnServer,
} from "@/services/dashboardServerApi";

const DashboardPage = async () => {
  const [applicationsResult, dashboardResult, schedulesResult] =
    await Promise.allSettled([
      fetchApplicationsOnServer(),
      fetchDashboardOnServer(),
      fetchUpcomingSchedulesOnServer(),
    ]);

  if (applicationsResult.status === "rejected") {
    console.error("대시보드 지원 목록 서버 조회 실패:", applicationsResult.reason);
  }
  if (dashboardResult.status === "rejected") {
    console.error("대시보드 요약 서버 조회 실패:", dashboardResult.reason);
  }
  if (schedulesResult.status === "rejected") {
    console.error("대시보드 일정 서버 조회 실패:", schedulesResult.reason);
  }

  return (
    <DashboardContent
      initialApplications={
        applicationsResult.status === "fulfilled"
          ? applicationsResult.value
          : undefined
      }
      initialDashboard={
        dashboardResult.status === "fulfilled"
          ? dashboardResult.value
          : undefined
      }
      initialSchedules={
        schedulesResult.status === "fulfilled" ? schedulesResult.value : undefined
      }
    />
  );
};

export default DashboardPage;

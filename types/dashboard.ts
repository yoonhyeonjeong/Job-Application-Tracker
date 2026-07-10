import type { ApplicationStatus } from "./application";

// 대시보드 카드
export interface DashboardSummary {
  totalCount: number; // 총 지원 건수
  inProgressCount: number; // 진행중 건수
  interviewCount: number; // 면접 예정
  offerCount: number; // 오퍼 건수
}
// 지원현황 건수
export interface StatusOverviewItem {
  status: ApplicationStatus;
  count: number;
}

// 월별 건수
export interface MonthlyCount {
  month: string;
  count: number;
}
// 대시보드 response
export interface DashboardResponse {
  summary: DashboardSummary;
  statusCounts: StatusOverviewItem[];
  monthlyCounts: MonthlyCount[];
}

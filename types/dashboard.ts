import type { ApplicationStatus } from "./application";

export interface DashboardSummary {
  totalCount: number; // 총 지원 건수
  activeCount: number; // 진행 중인 지원 건수
  interviewCount: number; // 면접 예정 건수
  waitingCount: number; // 결과 대기 건수
}

export interface StatusOverviewItem {
  status: ApplicationStatus;
  count: number;
}

import type { ApplicationStatus } from "./application";

// 대시보드 카드
export interface DashboardSummary {
  totalCount: number; // 총 지원 건수
  appliedCount: number; // 지원 완료
  documentPassedCount: number; // 서류 통과
  interviewCount: number; // 면접 예정
}
// 지원현황
export interface StatusOverviewItem {
  status: ApplicationStatus;
  count: number;
}

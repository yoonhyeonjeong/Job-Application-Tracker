import type { ApplicationStatus } from "@/types/application";

// 상태별 라벨 매핑
export const statusLabels: Record<ApplicationStatus, string> = {
  applied: "지원 완료",
  documentPassed: "서류 통과",
  interview: "면접 예정",
  offer: "오퍼",
  rejected: "불합격",
};

// 상태별 색상 매핑 (태그)
export const statusColors: Record<ApplicationStatus, string> = {
  applied: "blue",
  documentPassed: "purple",
  interview: "gold",
  offer: "green",
  rejected: "red",
};

// 상태별 색상 매핑 (차트)
export const statusChartColors: Record<ApplicationStatus, string> = {
  applied: "#7BAAF7",
  documentPassed: "#B69DF8",
  interview: "#FFD666",
  offer: "#95DE64",
  rejected: "#FFA39E",
};

export const activeStatuses: ApplicationStatus[] = [
  "applied",
  "documentPassed",
  "interview",
  "offer",
  "rejected",
];

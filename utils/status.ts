import type { ApplicationStatus } from "@/types/application";

export const statusLabels: Record<ApplicationStatus, string> = {
  applied: "지원 완료",
  screening: "서류 진행",
  interview: "면접 예정",
  offer: "오퍼",
  rejected: "불합격",
  onHold: "보류",
};

export const statusColors: Record<ApplicationStatus, string> = {
  applied: "blue",
  screening: "purple",
  interview: "gold",
  offer: "green",
  rejected: "red",
  onHold: "orange",
};

export const activeStatuses: ApplicationStatus[] = [
  "applied",
  "screening",
  "interview",
  "offer",
  "onHold",
];

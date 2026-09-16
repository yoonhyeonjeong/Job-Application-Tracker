export type DetailErrorType = "invalidId" | "application" | "schedule";

export const ERROR_MESSAGES: Record<DetailErrorType, string> = {
  invalidId: "올바르지 않은 지원서 ID입니다.",
  application: "지원 정보를 불러오지 못했습니다.",
  schedule: "일정을 불러오지 못했습니다.",
};

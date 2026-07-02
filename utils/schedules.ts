import { ScheduleType } from "@/types/schedule";

export const scheduleTypeLabels: Record<ScheduleType, string> = {
  interview: "면접일",
  assignment: "과제 제출일",
  deadline: "마감일",
};

// 요일별 색상 매핑
export const dayColorMap: Record<string, { bg: string; color: string }> = {
  월: { bg: "#FFE6EA", color: "#E85D75" },
  화: { bg: "#FFF4D6", color: "#D99A00" },
  수: { bg: "#E6F0FF", color: "#2F66D0" },
  목: { bg: "#E6F7EC", color: "#1FA463" },
  금: { bg: "#FFF1E6", color: "#E26A00" },
};

import dayjs from "dayjs";
import "dayjs/locale/ko";

// 날짜
export const formatDate = (value: string): string => {
  return dayjs(value).format("YYYY.MM.DD");
};

// 날짜+시간
export const formatDateTime = (value: string): string => {
  return dayjs(value).format("YYYY.MM.DD HH:mm");
};

// 요일 구하기
export const getDayLabel = (value: string): string => {
  return dayjs(value).locale("ko").format("dd");
};

// D-day 계산
export const getDday = (date: string) => {
  const diff = dayjs(date).startOf("day").diff(dayjs().startOf("day"), "day");
  return diff;
};

// 경과일 계산: 해당 날짜로부터 며칠 지났는지
export const getDaysSince = (date: string) => {
  const diff = dayjs().startOf("day").diff(dayjs(date).startOf("day"), "day");
  return diff;
};

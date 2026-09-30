// 앞뒤 공백을 제거하고, 값이 없으면 빈 문자열 반환
export const normalizeText = (value?: string | null): string => {
  return value?.trim() ?? "";
};

import type { QueryClient } from "@tanstack/react-query";

export const queryKeys = {
  applications: ["applications"] as const,
  application: (id: number) => ["application", id] as const,
  applicationSchedules: (id: number) => ["applicationSchedules", id] as const,
  schedules: ["schedules"] as const,
  calendar: (params: { startDate: string; endDate: string }) => ["schedules", params] as const,
  upcomingSchedules: ["upcomingSchedules"] as const,
  dashboard: ["dashboard"] as const,
  statistics: ["statistics"] as const,
};

// 일정이 바뀌면 상세·달력·대시보드에 남은 예전 데이터도 갱신해야 한다.
// invalidateQueries는 캐시를 삭제하지 않고 '오래된 데이터'로 표시한다.
// 현재 사용 중인 쿼리는 재조회하고, 나머지는 다음 화면 진입 시 재조회한다.
export async function invalidateScheduleQueries(client: QueryClient, applicationId: number) {
  await Promise.all([
    client.invalidateQueries({ queryKey: queryKeys.applicationSchedules(applicationId) }),
    client.invalidateQueries({ queryKey: queryKeys.schedules }),
    client.invalidateQueries({ queryKey: queryKeys.upcomingSchedules }),
    client.invalidateQueries({ queryKey: queryKeys.dashboard }),
  ]);
}

// 지원서 변경은 목록·통계뿐 아니라 회사명이 표시되는 일정 화면에도 영향을 준다.
export async function invalidateApplicationQueries(client: QueryClient, applicationId?: number) {
  await Promise.all([
    client.invalidateQueries({ queryKey: queryKeys.applications }),
    client.invalidateQueries({ queryKey: queryKeys.dashboard }),
    client.invalidateQueries({ queryKey: queryKeys.statistics }),
    client.invalidateQueries({ queryKey: queryKeys.schedules }),
    client.invalidateQueries({ queryKey: queryKeys.upcomingSchedules }),
    // 수정한 지원서 ID가 있을 때만 해당 상세 화면까지 갱신한다.
    ...(applicationId === undefined ?
      []
    : [
        client.invalidateQueries({ queryKey: queryKeys.application(applicationId) }),
        client.invalidateQueries({ queryKey: queryKeys.applicationSchedules(applicationId) }),
      ]),
  ]);
}

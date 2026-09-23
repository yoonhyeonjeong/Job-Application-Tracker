"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSchedule, updateSchedule, deleteSchedule } from "@/services/scheduleApi";
import { invalidateScheduleQueries } from "@/services/queryCache";
import type { UpdateSchedulePayload } from "@/types/schedule";

// 공통 훅이 저장과 캐시 갱신을 함께 담당
export function useCreateSchedule() {
  // 캐시 관리자
  const client = useQueryClient();
  return useMutation({
    mutationFn: postSchedule,
    // onSuccess: 저장 성공 후 실행. 재조회
    onSuccess: (_, payload) => invalidateScheduleQueries(client, payload.applicationId),
  });
}

export function useUpdateSchedule(applicationId: number, scheduleId: number) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateSchedulePayload) => updateSchedule(scheduleId, payload),
    // 갱신
    onSuccess: () => invalidateScheduleQueries(client, applicationId),
  });
}

export function useDeleteSchedule(applicationId: number) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteSchedule,
    // 갱신
    onSuccess: () => invalidateScheduleQueries(client, applicationId),
  });
}

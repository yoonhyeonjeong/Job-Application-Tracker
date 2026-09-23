"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postApplication, updateApplication, deleteApplication } from "@/services/applicationApi";
import { invalidateApplicationQueries, queryKeys } from "@/services/queryCache";
import type { ApplicationUpdatePayload } from "@/types/application";

// 저장, 관련 캐시 갱신은 훅 안에서 공통으로 처리한다.
export function useCreateApplication() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: postApplication,
    // 등록 성공 후 목록과 요약 데이터를 갱신한다.
    onSuccess: () => invalidateApplicationQueries(client),
  });
}

export function useUpdateApplication(id: number) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (payload: ApplicationUpdatePayload) => updateApplication(id, payload),
    // ID를 전달하면 수정한 지원서의 상세 캐시도 함께 갱신한다.
    onSuccess: () => invalidateApplicationQueries(client, id),
  });
}

export function useDeleteApplication() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteApplication,
    onSuccess: async (_, id) => {
      // 삭제된 지원서는 다시 조회할 대상이 아니므로 상세 캐시 자체를 제거한다.
      client.removeQueries({ queryKey: queryKeys.application(id), exact: true });
      client.removeQueries({ queryKey: queryKeys.applicationSchedules(id), exact: true });
      // 목록·통계·달력 등에는 삭제 결과가 반영되도록 다시 조회하게 한다.
      await invalidateApplicationQueries(client);
    },
  });
}

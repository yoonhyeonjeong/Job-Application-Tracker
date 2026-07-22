"use client";

import { useEffect } from "react";
import { useApplicationStore } from "@/hooks/useApplicationStore";

export const useApplications = () => {
  const allApplications = useApplicationStore((state) => state.applications);
  const loading = useApplicationStore((state) => state.loading);
  const filters = useApplicationStore((state) => state.filters);
  const setFilters = useApplicationStore((state) => state.setFilters);
  const loadApplications = useApplicationStore(
    (state) => state.loadApplications,
  );

  // 검색어 공백 제거 + 소문자로 변경
  const keyword = filters.keyword?.trim().toLowerCase() ?? "";

  // 전체 지원 목록에서 조건에 맞는 것만 남기기
  const filteredApplications = allApplications.filter((application) => {
    // 회사명 또는 직무에 검색어가 포함됐는지
    const matchesKeyword =
      !keyword ||
      application.companyName.toLowerCase().includes(keyword) ||
      application.position.toLowerCase().includes(keyword);

    // 선택한 지원 상태와 같은지
    const matchesStatus =
      !filters.status || application.status === filters.status;

    // 선택한 고용 형태와 같은지
    const matchesEmploymentType =
      !filters.employmentType ||
      application.employmentType === filters.employmentType;

    // 선택한 근무 형태와 같은지
    const matchesWorkType =
      !filters.workType || application.workType === filters.workType;

    // 모든 조건을 만족한 지원만 남김
    return (
      matchesKeyword &&
      matchesStatus &&
      matchesEmploymentType &&
      matchesWorkType
    );
  });

  // 화면이 처음 열릴 때 지원 목록 조회
  useEffect(() => {
    void loadApplications();
  }, [loadApplications]);

  return {
    applications: filteredApplications,
    loading,
    filters,
    setFilters,
    refresh: loadApplications,
  };
};

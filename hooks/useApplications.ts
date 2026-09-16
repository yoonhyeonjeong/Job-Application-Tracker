"use client";

import { useApplicationsQuery } from "@/hooks/useApplicationsQuery";
import { useApplicationStore } from "@/hooks/useApplicationStore";

export const useApplications = () => {
  const { data: allApplications = [], isPending, isError, refetch } =
    useApplicationsQuery();
  const filters = useApplicationStore((state) => state.filters);
  const setFilters = useApplicationStore((state) => state.setFilters);

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

  return {
    applications: filteredApplications,
    loading: isPending,
    error: isError ? "지원 목록을 불러오지 못했습니다." : undefined,
    filters,
    setFilters,
    refresh: refetch,
  };
};

import type {
  ApplicationStatus,
  CompanyType,
  EmploymentType,
  WorkType,
} from "@/types/application";

export const employmentTypeLabels: Record<EmploymentType, string> = {
  fullTime: "정규직",
  contract: "계약직",
  freelance: "프리랜서",
};

export const workTypeLabels: Record<WorkType, string> = {
  onsite: "출근",
  remote: "원격",
  hybrid: "하이브리드",
};

export const companyTypeLabels: Record<CompanyType, string> = {
  SI: "SI",
  SM: "SM",
  SERVICE: "서비스",
  SOLUTION: "솔루션",
  AGENCY: "에이전시",
  INHOUSE: "인하우스",
  STARTUP: "스타트업",
};

// select
export const companyTypeOptions = [
  {
    value: "SI",
    label: "SI",
  },
  {
    value: "SM",
    label: "SM",
  },
  {
    value: "SERVICE",
    label: "서비스",
  },
  {
    value: "SOLUTION",
    label: "솔루션",
  },
  {
    value: "AGENCY",
    label: "에이전시",
  },
  {
    value: "INHOUSE",
    label: "인하우스",
  },
  {
    value: "STARTUP",
    label: "스타트업",
  },
];

export const statusOptions: { value: ApplicationStatus; label: string }[] = [
  {
    value: "applied",
    label: "지원 완료",
  },
  {
    value: "documentPassed",
    label: "서류 통과",
  },
  {
    value: "interview",
    label: "면접 예정",
  },
  {
    value: "offer",
    label: "오퍼",
  },
  {
    value: "rejected",
    label: "불합격",
  },
];

export const employmentTypeOptions = [
  {
    value: "fullTime",
    label: "정규직",
  },
  {
    value: "contract",
    label: "계약직",
  },
  {
    value: "freelance",
    label: "프리랜서",
  },
];

export const workTypeOptions = [
  {
    value: "onsite",
    label: "출근",
  },
  {
    value: "remote",
    label: "원격",
  },
  {
    value: "hybrid",
    label: "하이브리드",
  },
];

export const jobPlatformOptions = [
  {
    value: "jobkorea",
    label: "잡코리아",
  },
  {
    value: "wanted",
    label: "원티드",
  },
  {
    value: "saramin",
    label: "사람인",
  },
];

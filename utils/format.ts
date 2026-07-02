import type {
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

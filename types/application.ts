import type { Dayjs } from "dayjs";

export type ApplicationStatus =
  | "applied"
  | "documentPassed"
  | "interview"
  | "offer"
  | "rejected";

export type EmploymentType = "fullTime" | "contract" | "freelance";

export type WorkType = "onsite" | "remote" | "hybrid";

export type JobPlatformType = "jobkorea" | "wanted" | "saramin";

export type CompanyType =
  | "SI"
  | "SM"
  | "SERVICE"
  | "SOLUTION"
  | "AGENCY"
  | "INHOUSE"
  | "STARTUP";

export interface ApplicationFilterParams {
  keyword?: string;
  status?: ApplicationStatus;
  employmentType?: EmploymentType;
  workType?: WorkType;
}

export interface CreateApplicationPayload {
  companyName: string; // 회사명
  companyType: CompanyType; // 회사유형
  status: ApplicationStatus; // 상태
  position: string; // 직무
  employmentType: EmploymentType; // 고용형태
  projectName?: string; // 프로젝트명
  workType: WorkType; // 근무형태
  jobPlatform: string; // 지원 플랫폼
  location?: string; // 지역
  appliedAt?: string; // 지원일
  deadline?: string; // 마감일
  nextAction?: string; // 다음 행동
  memo?: string; // 메모
}

export type ApplicationUpdatePayload = Partial<CreateApplicationPayload>;

export type ApplicationFormValues = Omit<
  CreateApplicationPayload,
  "appliedAt" | "deadline"
> & {
  appliedAt: Dayjs;
  deadline?: Dayjs;
};

// 지원 response
export interface ApplicationResponse {
  id: number;
  companyName: string; // 회사명
  companyType: CompanyType; // 회사유형
  status: ApplicationStatus; // 상태
  position: string; // 직무
  employmentType: EmploymentType; // 고용형태
  projectName?: string; // 프로젝트명
  workType: WorkType; // 근무형태
  jobPlatform: string; // 지원 플랫폼
  location?: string; // 지역
  appliedAt?: string; // 지원일
  deadline?: string; // 마감일
  nextAction?: string; // 다음 행동
  memo?: string; // 메모
}

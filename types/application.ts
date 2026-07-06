export type ApplicationStatus =
  | "applied" // 지원완료
  | "documentPassed" // 서류통과
  | "interview" // 면접 예정
  | "offer" // 오퍼
  | "rejected"; // 불합격

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

// 지원 response ?아마
export interface Application {
  id: string;
  companyName: string;
  position: string;
  status: ApplicationStatus;
  employmentType: EmploymentType;
  workType: WorkType;
  companyType: CompanyType;
  jobPlatform?: string;
  location?: string;
  appliedAt?: string;
  deadline?: string;
  nextAction?: string;
  nextActionDate?: string;
  salaryRange?: string;
  memo?: string;
  createdAt: string;
  updatedAt: string;
}

export type ApplicationCreatePayload = Omit<
  Application,
  "id" | "createdAt" | "updatedAt"
>;

export type ApplicationUpdatePayload = Partial<ApplicationCreatePayload>;

// 지원등록 검색
export interface ApplicationFilterParams {
  keyword?: string;
  status?: ApplicationStatus;
  employmentType?: EmploymentType;
  workType?: WorkType;
}

// 지원등록 payload
export interface CreateApplicationPayload {
  companyName: string; // 회사명
  companyType: CompanyType; // 회사유형
  position: string; // 직무
  employmentType: EmploymentType; // 고용형태
  projectName: string; // 프로젝트명
  workType: WorkType; // 근무형태
  jobPlatform: string; // 지원 플랫폼
  location?: string; // 지역
  appliedAt?: string; // 지원일
  deadline?: string; // 마감일
  nextAction?: string; // 다음 행동
  memo?: string; // 메모
}

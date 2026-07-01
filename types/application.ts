export type ApplicationStatus =
  | "applied" // 지원완료
  | "screening" // 서류 진행
  | "interview" // 면접 예정
  | "offer" // 오퍼
  | "rejected" // 불합격
  | "onHold"; // 보류

// 고용 형태
// fullTime  : 정규직
// contract  : 계약직
// intern    : 인턴
// freelance : 프리랜서
export type EmploymentType = "fullTime" | "contract" | "intern" | "freelance";

// 근무 방식
// onsite : 출근 근무
// remote : 원격 근무 (재택)
// hybrid : 출근 + 원격 혼합 근무
export type WorkType = "onsite" | "remote" | "hybrid";

// 회사 유형
export type CompanyType =
  | "SI"
  | "SM"
  | "SERVICE"
  | "SOLUTION"
  | "AGENCY"
  | "INHOUSE"
  | "STARTUP";

// 지원회사 작성 폼 타입
export interface Application {
  id: string;
  companyName: string;
  position: string;
  status: ApplicationStatus;
  employmentType: EmploymentType;
  workType: WorkType;
  companyType: CompanyType;
  jobUrl?: string;
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

export interface ApplicationFilterParams {
  keyword?: string;
  status?: ApplicationStatus;
  employmentType?: EmploymentType;
  workType?: WorkType;
}

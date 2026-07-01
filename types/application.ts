export type ApplicationStatus =
  | "applied"
  | "screening"
  | "interview"
  | "offer"
  | "rejected"
  | "onHold";

export type EmploymentType = "fullTime" | "contract" | "intern" | "freelance";

export type WorkType = "onsite" | "remote" | "hybrid";

export type CompanyType =
  | "SI"
  | "SM"
  | "SERVICE"
  | "SOLUTION"
  | "AGENCY"
  | "INHOUSE"
  | "STARTUP";

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

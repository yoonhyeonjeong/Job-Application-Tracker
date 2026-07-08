// import { applicationsMock } from '@/services/mock/applications.mock';
import type {
  ApplicationResponse,
  ApplicationCreatePayload,
  ApplicationFilterParams,
  ApplicationUpdatePayload,
} from "@/types/application";

let applications: ApplicationResponse[];

const delay = async (): Promise<void> => {
  await new Promise((resolve) => {
    setTimeout(resolve, 120);
  });
};

const matchesKeyword = (
  application: ApplicationResponse,
  keyword?: string,
): boolean => {
  if (!keyword) {
    return true;
  }

  const normalizedKeyword = keyword.trim().toLowerCase();
  return [
    application.companyName,
    application.position,
    application.location,
    application.memo,
  ]
    .filter((value): value is string => Boolean(value))
    .some((value) => value.toLowerCase().includes(normalizedKeyword));
};

export const getApplications = async (
  filters: ApplicationFilterParams = {},
): Promise<ApplicationResponse[]> => {
  await delay();

  return applications.filter((application) => {
    return (
      matchesKeyword(application, filters.keyword) &&
      (!filters.status || application.status === filters.status) &&
      (!filters.employmentType ||
        application.employmentType === filters.employmentType) &&
      (!filters.workType || application.workType === filters.workType)
    );
  });
};

export const createApplication = async (
  payload: ApplicationCreatePayload,
): Promise<ApplicationResponse> => {
  await delay();

  const application: ApplicationResponse = {
    ...payload,
    id: Date.now(),
  };

  applications = [application, ...applications];
  return application;
};

export const updateApplication = async (
  id: string,
  payload: ApplicationUpdatePayload,
): Promise<ApplicationResponse | undefined> => {
  await delay();

  const target = applications.find(
    (application) => application.id === Number(id),
  );
  if (!target) {
    return undefined;
  }

  const updated: ApplicationResponse = {
    ...target,
    ...payload,
  };

  applications = applications.map((application) =>
    application.id === Number(id) ? updated : application,
  );
  return updated;
};

export const deleteApplication = async (id: string): Promise<boolean> => {
  await delay();

  const previousLength = applications.length;
  applications = applications.filter(
    (application) => application.id !== Number(id),
  );
  return applications.length !== previousLength;
};

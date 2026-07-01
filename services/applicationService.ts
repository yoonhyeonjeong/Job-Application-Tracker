import { applicationsMock } from '@/services/mock/applications.mock';
import type {
  Application,
  ApplicationCreatePayload,
  ApplicationFilterParams,
  ApplicationUpdatePayload
} from '@/types/application';

let applications: Application[] = [...applicationsMock];

const delay = async (): Promise<void> => {
  await new Promise((resolve) => {
    setTimeout(resolve, 120);
  });
};

const matchesKeyword = (application: Application, keyword?: string): boolean => {
  if (!keyword) {
    return true;
  }

  const normalizedKeyword = keyword.trim().toLowerCase();
  return [application.companyName, application.position, application.location, application.memo]
    .filter((value): value is string => Boolean(value))
    .some((value) => value.toLowerCase().includes(normalizedKeyword));
};

export const getApplications = async (filters: ApplicationFilterParams = {}): Promise<Application[]> => {
  await delay();

  return applications.filter((application) => {
    return (
      matchesKeyword(application, filters.keyword) &&
      (!filters.status || application.status === filters.status) &&
      (!filters.employmentType || application.employmentType === filters.employmentType) &&
      (!filters.workType || application.workType === filters.workType)
    );
  });
};

export const getApplicationById = async (id: string): Promise<Application | undefined> => {
  await delay();
  return applications.find((application) => application.id === id);
};

export const createApplication = async (payload: ApplicationCreatePayload): Promise<Application> => {
  await delay();

  const now = new Date().toISOString();
  const application: Application = {
    ...payload,
    id: `app-${crypto.randomUUID()}`,
    createdAt: now,
    updatedAt: now
  };

  applications = [application, ...applications];
  return application;
};

export const updateApplication = async (
  id: string,
  payload: ApplicationUpdatePayload
): Promise<Application | undefined> => {
  await delay();

  const target = applications.find((application) => application.id === id);
  if (!target) {
    return undefined;
  }

  const updated: Application = {
    ...target,
    ...payload,
    updatedAt: new Date().toISOString()
  };

  applications = applications.map((application) => (application.id === id ? updated : application));
  return updated;
};

export const deleteApplication = async (id: string): Promise<boolean> => {
  await delay();

  const previousLength = applications.length;
  applications = applications.filter((application) => application.id !== id);
  return applications.length !== previousLength;
};

'use client';

import { useMemo } from 'react';
import type { ApplicationStatus, EmploymentType, WorkType } from '@/types/application';
import type { SelectOption } from '@/types/common';
import { employmentTypeLabels, workTypeLabels } from '@/utils/format';
import { statusLabels } from '@/utils/status';

export const useApplicationFilters = (): {
  statusOptions: SelectOption<ApplicationStatus>[];
  employmentTypeOptions: SelectOption<EmploymentType>[];
  workTypeOptions: SelectOption<WorkType>[];
} => {
  return useMemo(
    () => ({
      statusOptions: Object.entries(statusLabels).map(([value, label]) => ({
        value: value as ApplicationStatus,
        label
      })),
      employmentTypeOptions: Object.entries(employmentTypeLabels).map(([value, label]) => ({
        value: value as EmploymentType,
        label
      })),
      workTypeOptions: Object.entries(workTypeLabels).map(([value, label]) => ({
        value: value as WorkType,
        label
      }))
    }),
    []
  );
};

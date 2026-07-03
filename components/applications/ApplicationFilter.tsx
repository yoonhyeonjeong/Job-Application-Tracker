"use client";

import { Button, Input, Select, Space } from "antd";
import type { ReactNode } from "react";
import type { ApplicationFilterParams } from "@/types/application";
import { employmentTypeOptions, statusOptions } from "@/utils/format";

interface ApplicationFilterProps {
  filters: ApplicationFilterParams;
  onChange: (filters: ApplicationFilterParams) => void;
}

export const ApplicationFilter = ({
  filters,
  onChange,
}: ApplicationFilterProps): ReactNode => {
  return (
    <Space wrap className="filter-bar">
      <Input.Search
        allowClear
        placeholder="회사명, 직무"
        value={filters.keyword}
        onChange={(event) =>
          onChange({ ...filters, keyword: event.target.value })
        }
      />
      <Select
        allowClear
        placeholder="상태"
        className="filter-select"
        options={statusOptions}
        value={filters.status}
        onChange={(status) => onChange({ ...filters, status })}
      />
      <Select
        allowClear
        placeholder="고용 형태"
        className="filter-select"
        options={employmentTypeOptions}
        value={filters.employmentType}
        onChange={(employmentType) => onChange({ ...filters, employmentType })}
      />

      <Button onClick={() => onChange({})}>초기화</Button>
    </Space>
  );
};

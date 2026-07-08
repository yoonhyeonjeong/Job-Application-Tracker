"use client";

import { Button, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import type { ReactNode } from "react";
import { StatusTag } from "@/components/common/StatusTag";
import type { ApplicationResponse } from "@/types/application";
import { formatDate } from "@/utils/date";
import { companyTypeLabels, employmentTypeLabels } from "@/utils/format";

interface ApplicationTableProps {
  applications: ApplicationResponse[];
  loading: boolean;
}

const columns: ColumnsType<ApplicationResponse> = [
  {
    title: "회사",
    dataIndex: "companyName",
    key: "companyName",
    sorter: (left, right) => left.companyName.localeCompare(right.companyName),
    render: (value: string, record) => (
      <Link href={`/applications/${record.id}`}>{value}</Link>
    ),
    align: "center",
  },
  {
    title: "회사유형",
    dataIndex: "companyType",
    key: "companyType",
    render: (_, record) => <Tag>{companyTypeLabels[record.companyType]}</Tag>,
    align: "center",
  },
  {
    title: "직무",
    dataIndex: "position",
    key: "position",
    align: "center",
  },
  {
    title: "상태",
    dataIndex: "status",
    key: "status",
    render: (_, record) => <StatusTag status={record.status} />,
    align: "center",
  },
  {
    title: "고용",
    dataIndex: "employmentType",
    key: "employmentType",
    render: (_, record) => employmentTypeLabels[record.employmentType],
    align: "center",
  },
  {
    title: "지원일",
    dataIndex: "appliedAt",
    key: "appliedAt",
    sorter: (left, right) =>
      Date.parse(left.appliedAt ?? "") - Date.parse(right.appliedAt ?? ""),
    render: formatDate,
    align: "center",
  },
  {
    title: "관리",
    key: "actions",
    render: (_, record) => (
      <Space>
        <Button size="small">
          <Link href={`/applications/${record.id}`}>상세</Link>
        </Button>
      </Space>
    ),
    align: "center",
  },
];

export const ApplicationTable = ({
  applications,
  loading,
}: ApplicationTableProps): ReactNode => {
  return (
    <Table<ApplicationResponse>
      rowKey="id"
      columns={columns}
      dataSource={applications}
      loading={loading}
      scroll={{ x: 1000 }}
      pagination={{
        pageSize: 5, // 5개만 보여주기
        showSizeChanger: false,
      }}
      size="middle"
    />
  );
};

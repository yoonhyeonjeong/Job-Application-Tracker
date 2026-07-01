import { Card, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import type { ReactNode } from "react";
import { StatusTag } from "@/components/common/StatusTag";
import type { Application } from "@/types/application";
import { companyTypeLabels } from "@/utils/format";

interface RecentApplicationsTableProps {
  applications: Application[];
  loading: boolean;
}

const columns: ColumnsType<Application> = [
  {
    title: "회사",
    dataIndex: "companyName",
    key: "companyName",
    render: (value: string, record) => (
      <Link href={`/applications/${record.id}`}>{value}</Link>
    ),
  },
  {
    title: "회사유형",
    dataIndex: "companyType",
    key: "companyType",
    render: (_, record) => <Tag>{companyTypeLabels[record.companyType]}</Tag>,
  },
  {
    title: "직무",
    dataIndex: "position",
    key: "position",
  },
  {
    title: "상태",
    dataIndex: "status",
    key: "status",
    render: (_, record) => <StatusTag status={record.status} />,
  },
  {
    title: "해야 할 일",
    dataIndex: "nextAction",
    key: "nextAction",
    render: (value?: string) => value ?? "-",
  },
];

// 최근지원 테이블
export const RecentApplicationsTable = ({
  applications,
  loading,
}: RecentApplicationsTableProps): ReactNode => {
  return (
    <Card title="최근 지원 현황">
      <Table<Application>
        rowKey="id"
        columns={columns}
        dataSource={applications}
        loading={loading}
        pagination={false}
        size="middle"
      />
    </Card>
  );
};

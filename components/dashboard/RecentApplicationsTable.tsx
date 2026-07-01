"use client";
import { Card, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { ReactNode } from "react";
import { StatusTag } from "@/components/common/StatusTag";
import type { Application } from "@/types/application";
import { companyTypeLabels } from "@/utils/format";
import { useRouter } from "next/navigation";

interface RecentApplicationsTableProps {
  applications: Application[];
  loading: boolean;
}

const columns: ColumnsType<Application> = [
  {
    title: "회사",
    dataIndex: "companyName",
    key: "companyName",
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
    title: "지원일",
    dataIndex: "appliedAt",
    key: "appliedAt",
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
    title: "해야 할 일",
    dataIndex: "nextAction",
    key: "nextAction",
    render: (value?: string) => value ?? "-",
    align: "center",
  },
];

// 최근지원 테이블
export const RecentApplicationsTable = ({
  applications,
  loading,
}: RecentApplicationsTableProps): ReactNode => {
  const router = useRouter();
  return (
    <Card title="최근 지원 현황">
      <Table<Application>
        rowKey="id"
        columns={columns}
        dataSource={applications}
        loading={loading}
        pagination={false}
        size="middle"
        onRow={(record) => ({
          onClick: () => {
            router.push(`/applications/${record.id}`);
          },
        })}
      />
    </Card>
  );
};

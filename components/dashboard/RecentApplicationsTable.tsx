"use client";
import { Alert, Button, Card, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { StatusTag } from "@/components/common/StatusTag";
import type { ApplicationResponse } from "@/types/application";
import { companyTypeLabels } from "@/utils/format";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/common/Spin";

interface RecentApplicationsTableProps {
  applications: ApplicationResponse[];
  loading?: boolean;
  error?: boolean;
  refetch?: () => void;
}

const columns: ColumnsType<ApplicationResponse> = [
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
  error,
  refetch,
}: RecentApplicationsTableProps) => {
  const router = useRouter();
  if (loading || !applications) {
    return <LoadingSpinner />;
  }
  return (
    <Card title="최근 지원 현황" style={{ height: "100%" }}>
      {error ?
        <Alert
          type="error"
          showIcon
          message="최근 지원 정보를 불러오지 못했습니다."
          action={
            <Button size="small" onClick={() => refetch?.()}>
              다시 시도
            </Button>
          }
        />
      : <>
          <Table<ApplicationResponse>
            rowKey="id"
            columns={columns}
            dataSource={applications}
            loading={loading}
            pagination={{
              pageSize: 5, // 5개만 보여주기
              showSizeChanger: false,
            }}
            size="middle"
            onRow={(record) => ({
              onClick: () => {
                router.push(`/applications/${record.id}`);
              },
            })}
          />
        </>
      }
    </Card>
  );
};

"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Alert, Button, Card, App as AntdApp } from "antd";
import { type ReactNode } from "react";
import { ApplicationFilter } from "@/components/applications/ApplicationFilter";
import { ApplicationTable } from "@/components/applications/ApplicationTable";
import { PageHeader } from "@/components/common/PageHeader";
import { useApplications } from "@/hooks/useApplications";
import { useApplicationStore } from "@/hooks/useApplicationStore";
import { useRouter } from "next/navigation";

const ApplicationsPage = (): ReactNode => {
  const { applications, loading, filters, setFilters } = useApplications();
  const error = useApplicationStore((state) => state.error);

  const router = useRouter();
  return (
    <div className="page-stack">
      <PageHeader
        title="지원 관리"
        description="회사, 직무, 상태, 해야할일을 기준으로 지원 내역을 관리합니다."
        action={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => router.push(`/applications/new`)}
          >
            지원 하러 가기
          </Button>
        }
      />
      {error ? <Alert type="error" message={error} showIcon /> : null}
      <Card>
        <ApplicationFilter filters={filters} onChange={setFilters} />
      </Card>
      <Card>
        <ApplicationTable applications={applications} loading={loading} />
      </Card>
    </div>
  );
};

export default ApplicationsPage;

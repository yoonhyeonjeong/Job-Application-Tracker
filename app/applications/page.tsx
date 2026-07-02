"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Alert, Button, Card, message } from "antd";
import { useState, type ReactNode } from "react";
import { ApplicationFilter } from "@/components/applications/ApplicationFilter";
import { ApplicationFormModal } from "@/components/applications/ApplicationFormModal";
import { ApplicationTable } from "@/components/applications/ApplicationTable";
import { PageHeader } from "@/components/common/PageHeader";
import { useApplications } from "@/hooks/useApplications";
import { useApplicationStore } from "@/hooks/useApplicationStore";
import type { ApplicationCreatePayload } from "@/types/application";

const ApplicationsPage = (): ReactNode => {
  const { applications, loading, filters, setFilters } = useApplications();
  const addApplication = useApplicationStore((state) => state.addApplication);
  const error = useApplicationStore((state) => state.error);
  const [open, setOpen] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (
    payload: ApplicationCreatePayload,
  ): Promise<void> => {
    await addApplication(payload);
    setOpen(false);
    void messageApi.success("지원 내역을 추가했습니다.");
  };

  return (
    <div className="page-stack">
      {contextHolder}
      <PageHeader
        title="지원 관리"
        description="회사, 직무, 상태, 해야할일을 기준으로 지원 내역을 관리합니다."
        action={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpen(true)}
          >
            지원 추가
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
      <ApplicationFormModal
        open={open}
        onCancel={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ApplicationsPage;

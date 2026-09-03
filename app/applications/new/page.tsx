"use client";

import { Button, Card, Form, message } from "antd";
import { useState, type ReactNode } from "react";
import type {
  ApplicationFormValues,
  CreateApplicationPayload,
} from "@/types/application";
import { PageHeader } from "@/components/common/PageHeader";
import { postApplication } from "@/services/applicationApi";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { ApplicationFormFields } from "@/components/applications/ApplicationFormFields";

const ApplicationsNewPage = (): ReactNode => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<ApplicationFormValues>();
  // 프리랜서인지 여부 체크
  const employmentType = Form.useWatch("employmentType", form);
  const isFreelance = employmentType === "freelance";

  const handleSubmit = async (values: ApplicationFormValues) => {
    setLoading(true);
    try {
      const payload: CreateApplicationPayload = {
        ...values,
        appliedAt: dayjs(values.appliedAt).format("YYYY-MM-DD"),
        deadline: values.deadline
          ? dayjs(values.deadline).format("YYYY-MM-DD")
          : undefined,
        nextAction: values.nextAction?.trim(),
        memo: values.memo?.trim(),
      };
      await postApplication(payload);
      message.success("지원 정보가 등록되었습니다.");
      router.push("/");
    } catch (error) {
      console.error(error);
      message.success("지원 정보 등록 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-stack">
      <PageHeader
        title="지원 추가"
        description="지원을 추가 할 수 있는 폼입니다."
      />

      <Card className="application-form-card">
        <Form<ApplicationFormValues>
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <ApplicationFormFields showProjectName={isFreelance} />
          <Button type="primary" htmlType="submit" className="full-width">
            지원 하러 가기
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ApplicationsNewPage;

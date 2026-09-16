"use client";

import { Button, Card, Form, message } from "antd";
import type { ReactNode } from "react";
import type {
  ApplicationFormValues,
  CreateApplicationPayload,
} from "@/types/application";
import { PageHeader } from "@/components/common/PageHeader";
import { postApplication } from "@/services/applicationApi";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { ApplicationFormFields } from "@/components/applications/ApplicationFormFields";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ApplicationsNewPage = (): ReactNode => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form] = Form.useForm<ApplicationFormValues>();
  // 프리랜서인지 여부 체크
  const employmentType = Form.useWatch("employmentType", form);
  const isFreelance = employmentType === "freelance";

  const { mutateAsync, isPending } = useMutation({
    // 1. 실제 지원서 등록 API
    mutationFn: postApplication,
    // 2. 등록 API가 성공하면 실행
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["applications"] }),
        queryClient.invalidateQueries({ queryKey: ["dashboard"] }),
        queryClient.invalidateQueries({ queryKey: ["statistics"] }),
      ]);
    },
  });

  const handleSubmit = async (values: ApplicationFormValues) => {
    try {
      const payload: CreateApplicationPayload = {
        ...values,
        appliedAt: dayjs(values.appliedAt).format("YYYY-MM-DD"),
        deadline:
          values.deadline ?
            dayjs(values.deadline).format("YYYY-MM-DD")
          : undefined,
        nextAction: values.nextAction?.trim(),
        memo: values.memo?.trim(),
      };
      await mutateAsync(payload);
      message.success("지원 정보가 등록되었습니다.");
      router.push("/");
    } catch (error) {
      console.error(error);
      message.error("지원 정보 등록에 실패했습니다.");
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
          <Button
            type="primary"
            htmlType="submit"
            className="full-width"
            loading={isPending}
          >
            지원 하러 가기
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ApplicationsNewPage;

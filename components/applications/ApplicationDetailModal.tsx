"use client";

import {
  Alert,
  Button,
  Card,
  Form,
  Modal,
  Popconfirm,
  App as AntdApp,
} from "antd";
import { useEffect, useState, type ReactNode } from "react";
import dayjs from "dayjs";
import axios from "axios";
import {
  ApplicationResponse,
  ApplicationFormValues,
  ApplicationUpdatePayload,
} from "@/types/application";
import { useUpdateApplication } from "@/hooks/useApplicationMutations";
import { ApplicationFormFields } from "./ApplicationFormFields";

interface ApplicationeDetailModalProps {
  application: ApplicationResponse;
  open: boolean;
  id: number;
  onCancel: () => void;
}

const ApplicationDetailModal = ({
  application,
  open,
  id,
  onCancel,
}: ApplicationeDetailModalProps): ReactNode => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { message: messageApi } = AntdApp.useApp();
  const [form] = Form.useForm<ApplicationFormValues>();

  const employmentType = Form.useWatch("employmentType", form);
  const showProjectName =
    employmentType === "freelance" || Boolean(application.projectName);

  // 수정
  // 수정 요청과 관련 캐시 갱신을 함께 처리하는 공통 훅.
  const { mutateAsync, isPending } = useUpdateApplication(id);

  const handleSubmit = async (values: ApplicationFormValues) => {
    const normalize = (value?: string | null) => value?.trim() ?? "";

    const isSame =
      normalize(values.companyName) === normalize(application.companyName) &&
      values.companyType === application.companyType &&
      values.status === application.status &&
      normalize(values.position) === normalize(application.position) &&
      values.employmentType === application.employmentType &&
      normalize(values.projectName) === normalize(application.projectName) &&
      values.workType === application.workType &&
      values.jobPlatform === application.jobPlatform &&
      normalize(values.location) === normalize(application.location) &&
      dayjs(values.appliedAt).isSame(dayjs(application.appliedAt), "day") &&
      ((!values.deadline && !application.deadline) ||
        dayjs(values.deadline).isSame(dayjs(application.deadline), "day")) &&
      normalize(values.nextAction) === normalize(application.nextAction) &&
      normalize(values.memo) === normalize(application.memo);

    if (isSame) {
      messageApi.error("변경된 내용이 없습니다.");
      return;
    }
    setErrorMsg(null);

    try {
      const payload: ApplicationUpdatePayload = {
        ...values,
        memo: values.memo?.trim(),
        appliedAt: dayjs(values.appliedAt).format("YYYY-MM-DD"),
        deadline:
          values.deadline ?
            dayjs(values.deadline).format("YYYY-MM-DD")
          : undefined,
      };
      await mutateAsync(payload);
      form.resetFields();
      onCancel();
    } catch (error) {
      setErrorMsg(
        axios.isAxiosError(error) ?
          (error.response?.data?.message ?? "지원 정보 수정에 실패했습니다.")
        : "지원 정보 수정에 실패했습니다.",
      );
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      companyName: application.companyName,
      companyType: application.companyType,
      status: application.status,
      position: application.position,
      employmentType: application.employmentType,
      projectName: application.projectName,
      workType: application.workType,
      jobPlatform: application.jobPlatform,
      location: application.location,
      appliedAt: dayjs(application.appliedAt),
      deadline: application.deadline ? dayjs(application.deadline) : undefined,
      nextAction: application.nextAction,
      memo: application.memo,
    });
  }, [application, form]);

  return (
    <>
      <Modal
        title="지원 상세"
        open={open}
        onOk={() => form.submit()}
        onCancel={onCancel}
        footer={[
          <Popconfirm
            key="update-confirm"
            title="지원 수정"
            description="변경한 내용으로 수정하시겠습니까?"
            okText="네"
            cancelText="아니오"
            onConfirm={() => form.submit()}
          >
            <Button key="edit" type="text" loading={isPending}>
              수정
            </Button>
          </Popconfirm>,
        ]}
      >
        {errorMsg && <Alert type="error" message={errorMsg} showIcon />}

        <Card className={`application-form-card ${errorMsg ? "mt-20" : ""}`}>
          <Form<ApplicationFormValues>
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <ApplicationFormFields showProjectName={showProjectName} />
          </Form>
        </Card>
      </Modal>
    </>
  );
};

export default ApplicationDetailModal;

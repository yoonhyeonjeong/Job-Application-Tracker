"use client";

import { Alert, App as AntdApp, Card, Form, Modal } from "antd";
import { useState } from "react";
import { ScheduleFormFields } from "./ScheduleFormFields";
import { ScheduleFormValue } from "@/types/schedule";
import { useCreateSchedule } from "@/hooks/useScheduleMutations";
import axios from "axios";
import { serializeScheduleDate } from "@/utils/date";
import { normalizeText } from "@/utils/form";

interface ApplicationModalProps {
  open: boolean;
  applicationId: number;
  onCancel: () => void;
}

const ApplicationModal = ({ open, applicationId, onCancel }: ApplicationModalProps) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { message: messageApi } = AntdApp.useApp();
  const [form] = Form.useForm<ScheduleFormValue>();

  // 저장 후 관련 화면 갱신은 훅이 처리하므로 부모의 onSuccess가 필요 없다.
  const { mutateAsync, isPending } = useCreateSchedule();

  const handleSubmit = async (values: ScheduleFormValue) => {
    setErrorMsg(null);
    try {
      const payload = {
        ...values,
        title: normalizeText(values.title),
        applicationId: applicationId,
        scheduledAt: serializeScheduleDate(values.scheduledAt),
        memo: values.memo?.trim() ?? "",
      };
      await mutateAsync(payload);
      messageApi.success("일정 등록을 성공했습니다.");
      form.resetFields();
      onCancel();
    } catch (error) {
      setErrorMsg(
        axios.isAxiosError(error) ?
          (error.response?.data?.message ?? "일정 등록에 실패했습니다.")
        : "일정 등록에 실패했습니다.",
      );
    }
  };

  return (
    <>
      <Modal
        title="일정 등록"
        open={open}
        onOk={() => form.submit()}
        onCancel={onCancel}
        okText="등록"
        cancelText="취소"
        confirmLoading={isPending}
      >
        {errorMsg && <Alert type="error" message={errorMsg} showIcon />}

        <Card className={`application-form-card ${errorMsg ? "mt-20" : ""}`}>
          <Form<ScheduleFormValue> form={form} layout="vertical" onFinish={handleSubmit}>
            <ScheduleFormFields />
          </Form>
        </Card>
      </Modal>
    </>
  );
};

export default ApplicationModal;

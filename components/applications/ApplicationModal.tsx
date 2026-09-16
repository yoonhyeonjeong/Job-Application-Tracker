"use client";

import {
  Alert,
  App as AntdApp,
  Card,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
} from "antd";
import { useState, type ReactNode } from "react";
import { ScheduleOption } from "@/utils/format";
import dayjs from "dayjs";
import { SchedulePayload } from "@/types/schedule";
import { postSchedule } from "@/services/scheduleApi";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

interface ApplicationModalProps {
  open: boolean;
  applicationId: number;
  onCancel: () => void;
  onSuccess: () => void | Promise<void>; // 완료를 기다릴 수 있는 비동기 함수
}

const ApplicationModal = ({
  open,
  applicationId,
  onCancel,
  onSuccess,
}: ApplicationModalProps): ReactNode => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { message: messageApi } = AntdApp.useApp();
  const [form] = Form.useForm<SchedulePayload>();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: postSchedule,
    onSuccess: async () => {
      await onSuccess(); // 등록 후 일정 재조회
    },
  });

  const handleSubmit = async (values: SchedulePayload) => {
    setErrorMsg(null);
    try {
      const payload = {
        ...values,
        title: values.title?.trim() ?? "",
        applicationId: applicationId,
        scheduledAt: dayjs(values.scheduledAt).format("YYYY-MM-DDTHH:mm:ss"),
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
          <Form<SchedulePayload>
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              name="scheduleType"
              label="일정 유형"
              rules={[
                {
                  required: true,
                  message: "일정 유형을 선택해주세요.",
                },
              ]}
            >
              <Select placeholder="일정 유형 선택" options={ScheduleOption} />
            </Form.Item>

            <Form.Item
              name="title"
              label="일정 제목"
              rules={[
                {
                  required: true,
                  message: "일정 제목을 입력해주세요.",
                },
              ]}
            >
              <Input placeholder="예: 1차 기술 면접" />
            </Form.Item>

            <Form.Item
              name="scheduledAt"
              label="일정 일시"
              rules={[
                {
                  required: true,
                  message: "일정 일시를 선택해주세요.",
                },
              ]}
            >
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm"
                placeholder="날짜와 시간 선택"
                className="full-width"
              />
            </Form.Item>

            <Form.Item name="memo" label="메모">
              <Input.TextArea
                rows={4}
                maxLength={500}
                showCount
                placeholder="메모 입력"
              />
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </>
  );
};

export default ApplicationModal;

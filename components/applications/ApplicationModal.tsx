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
import { useCreateSchedule } from "@/hooks/useScheduleMutations";
import axios from "axios";

interface ApplicationModalProps {
  open: boolean;
  applicationId: number;
  onCancel: () => void;
}

const ApplicationModal = ({
  open,
  applicationId,
  onCancel,
}: ApplicationModalProps): ReactNode => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { message: messageApi } = AntdApp.useApp();
  const [form] = Form.useForm<SchedulePayload>();

  // 저장 후 관련 화면 갱신은 훅이 처리하므로 부모의 onSuccess가 필요 없다.
  const { mutateAsync, isPending } = useCreateSchedule();

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

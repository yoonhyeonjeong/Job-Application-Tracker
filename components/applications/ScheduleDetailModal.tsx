"use client";

import {
  Alert,
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select,
} from "antd";
import { useEffect, useState, type ReactNode } from "react";
import { ScheduleOption } from "@/utils/format";
import dayjs, { Dayjs } from "dayjs";
import {
  ScheduleDetailResponse,
  SchedulePayload,
  UpdateSchedulePayload,
} from "@/types/schedule";
import { postSchedule, updateSchedule } from "@/services/scheduleApi";
import axios from "axios";

interface ScheduleDetailModalProps {
  schedule: ScheduleDetailResponse;
  open: boolean;
  onCancel: () => void;
  onSuccess: () => Promise<void>;
}

type ScheduleFormValue = Omit<
  SchedulePayload,
  "applicationId" | "scheduledAt"
> & {
  scheduledAt: Dayjs;
};

const ScheduleDetailModal = ({
  schedule,
  open,
  onCancel,
  onSuccess,
}: ScheduleDetailModalProps): ReactNode => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [form] = Form.useForm<ScheduleFormValue>();

  const handleSubmit = async (values: ScheduleFormValue) => {
    const isSame =
      values.scheduleType === schedule.type &&
      values.title.trim() === schedule.title.trim() &&
      values.scheduledAt.isSame(dayjs(schedule.scheduledAt)) &&
      (values.memo?.trim() ?? "") === (schedule.memo?.trim() ?? "");

    if (isSame) {
      alert("변경된 내용이 없습니다.");
      return;
    }
    setLoading(true);

    try {
      const payload: UpdateSchedulePayload = {
        ...values,
        memo: values.memo?.trim(),
        scheduledAt: dayjs(values.scheduledAt).format("YYYY-MM-DDTHH:mm:ss"),
      };
      await updateSchedule(schedule.id, payload);
      await onSuccess();
      form.resetFields();
      onCancel();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMsg(error.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      scheduleType: schedule.type,
      title: schedule.title,
      scheduledAt: dayjs(schedule.scheduledAt),
      memo: schedule.memo,
    });
  }, [schedule, form]);

  return (
    <>
      <Modal
        title="일정 상세"
        open={open}
        onOk={() => form.submit()}
        onCancel={onCancel}
        footer={[
          <Button key="delete" danger>
            삭제
          </Button>,
          <Button key="edit" type="primary" onClick={() => form.submit()}>
            수정
          </Button>,
        ]}
      >
        {errorMsg && <Alert type="error" message={errorMsg} showIcon />}

        <Card className={`application-form-card ${errorMsg ? "mt-20" : ""}`}>
          <Form<ScheduleFormValue>
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
              <Input />
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

export default ScheduleDetailModal;

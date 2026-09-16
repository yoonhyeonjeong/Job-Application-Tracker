"use client";

import {
  Alert,
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  App as AntdApp,
} from "antd";
import { useEffect, useState, type ReactNode } from "react";
import { ScheduleOption } from "@/utils/format";
import dayjs, { Dayjs } from "dayjs";
import {
  ScheduleDetailResponse,
  SchedulePayload,
  ScheduleResponse,
  UpdateSchedulePayload,
} from "@/types/schedule";
import { deleteSchedule, updateSchedule } from "@/services/scheduleApi";
import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";

interface ScheduleDetailModalProps {
  schedule: ScheduleDetailResponse | ScheduleResponse;
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void | Promise<void>;
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
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { message: messageApi } = AntdApp.useApp();
  const [form] = Form.useForm<ScheduleFormValue>();
  const scheduleType =
    "scheduleType" in schedule ? schedule.scheduleType : schedule.type;

  // 수정
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: UpdateSchedulePayload) =>
      updateSchedule(schedule.id, payload),
    // 요청에 성공했을 때 실행
    onSuccess: async () => {
      await onSuccess(); // 부모의 재조회가 끝날 때까지 기다림
    },
  });

  // 삭제
  const { mutateAsync: deleteMutateAsync, isPending: isDeletePending } =
    useMutation({
      mutationFn: (id: number) => deleteSchedule(id),
      onSuccess: async () => {
        await onSuccess(); // 부모의 재조회가 끝날 때까지 기다림
      },
    });

  const handleSubmit = async (values: ScheduleFormValue) => {
    const isSame =
      values.scheduleType === scheduleType &&
      values.title.trim() === schedule.title.trim() &&
      values.scheduledAt.isSame(dayjs(schedule.scheduledAt)) &&
      (values.memo?.trim() ?? "") === (schedule.memo?.trim() ?? "");

    if (isSame) {
      messageApi.error("변경된 내용이 없습니다.");
      return;
    }
    setErrorMsg(null);

    try {
      const payload: UpdateSchedulePayload = {
        ...values,
        memo: values.memo?.trim(),
        scheduledAt: dayjs(values.scheduledAt).format("YYYY-MM-DDTHH:mm:ss"),
      };
      await mutateAsync(payload);
      form.resetFields();
      onCancel();
    } catch (error) {
      setErrorMsg(
        axios.isAxiosError(error) ?
          (error.response?.data?.message ?? "일정 수정에 실패했습니다.")
        : "일정 수정에 실패했습니다.",
      );
    }
  };

  const handleDeleteSchedule = async (id: number) => {
    setErrorMsg(null);
    try {
      await deleteMutateAsync(id);
      onCancel();
    } catch (error) {
      setErrorMsg(
        axios.isAxiosError(error) ?
          (error.response?.data?.message ?? "일정 삭제에 실패했습니다.")
        : "일정 삭제에 실패했습니다.",
      );
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      scheduleType,
      title: schedule.title,
      scheduledAt: dayjs(schedule.scheduledAt),
      memo: schedule.memo,
    });
  }, [schedule, scheduleType, form]);

  return (
    <>
      <Modal
        title="일정 상세"
        open={open}
        onOk={() => form.submit()}
        onCancel={onCancel}
        forceRender
        footer={[
          <Popconfirm
            key="delete-confirm"
            title="일정 삭제"
            description="이 일정을 삭제하시겠습니까?"
            okText="네"
            cancelText="아니오"
            okButtonProps={{
              danger: true,
            }}
            onConfirm={() => handleDeleteSchedule(schedule.id)}
          >
            <Button
              danger
              type="text"
              disabled={isPending}
              loading={isDeletePending}
              icon={<DeleteOutlined />}
            >
              삭제
            </Button>
          </Popconfirm>,

          <Popconfirm
            key="update-confirm"
            title="일정 수정"
            description="변경한 내용으로 수정하시겠습니까?"
            okText="네"
            cancelText="아니오"
            onConfirm={() => form.submit()}
          >
            <Button
              key="edit"
              type="text"
              loading={isPending}
              disabled={isDeletePending}
            >
              수정
            </Button>
          </Popconfirm>,
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

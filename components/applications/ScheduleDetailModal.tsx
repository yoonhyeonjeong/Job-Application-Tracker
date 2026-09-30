"use client";

import { Alert, Button, Card, Form, Modal, Popconfirm, App as AntdApp } from "antd";
import { useEffect, useState } from "react";
import { ScheduleFormFields } from "./ScheduleFormFields";
import dayjs from "dayjs";
import { ScheduleDetailResponse, ScheduleFormValue, ScheduleResponse, UpdateSchedulePayload } from "@/types/schedule";
import { useUpdateSchedule, useDeleteSchedule } from "@/hooks/useScheduleMutations";
import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";
import { serializeScheduleDate } from "@/utils/date";
import { normalizeText } from "@/utils/form";

interface ScheduleDetailModalProps {
  schedule: ScheduleDetailResponse | ScheduleResponse;
  open: boolean;
  onCancel: () => void;
}

const ScheduleDetailModal = ({ schedule, open, onCancel }: ScheduleDetailModalProps) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { message: messageApi } = AntdApp.useApp();
  const [form] = Form.useForm<ScheduleFormValue>();
  const scheduleType = "scheduleType" in schedule ? schedule.scheduleType : schedule.type;

  // 수정
  // 수정·삭제 후 캐시 갱신은 공통 훅에 맡기고, 모달은 입력과 창 닫기를 담당한다.
  const { mutateAsync, isPending } = useUpdateSchedule(schedule.applicationId, schedule.id);
  const { mutateAsync: deleteMutateAsync, isPending: isDeletePending } = useDeleteSchedule(schedule.applicationId);

  const handleSubmit = async (values: ScheduleFormValue) => {
    const isSame =
      values.scheduleType === scheduleType &&
      normalizeText(values.title) === normalizeText(schedule.title) &&
      values.scheduledAt.isSame(dayjs(schedule.scheduledAt)) &&
      normalizeText(values.memo) === normalizeText(schedule.memo);

    if (isSame) {
      messageApi.error("변경된 내용이 없습니다.");
      return;
    }
    setErrorMsg(null);

    try {
      const payload: UpdateSchedulePayload = {
        ...values,
        title: normalizeText(values.title),
        memo: values.memo?.trim(),
        scheduledAt: serializeScheduleDate(values.scheduledAt),
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
            <Button danger type="text" disabled={isPending} loading={isDeletePending} icon={<DeleteOutlined />}>
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
            <Button key="edit" type="text" loading={isPending} disabled={isDeletePending}>
              수정
            </Button>
          </Popconfirm>,
        ]}
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

export default ScheduleDetailModal;

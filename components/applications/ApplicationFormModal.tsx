"use client";

import { DatePicker, Form, Input, Modal, Select } from "antd";
import type { ReactNode } from "react";
import { useApplicationFilters } from "@/hooks/useApplicationFilters";
import type { ApplicationCreatePayload } from "@/types/application";

interface ApplicationFormModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (payload: ApplicationCreatePayload) => Promise<void>;
}

interface ApplicationFormValues extends Omit<
  ApplicationCreatePayload,
  "appliedAt" | "deadline" | "nextActionDate"
> {
  appliedAt?: { format: (template: string) => string };
  deadline?: { format: (template: string) => string };
  nextActionDate?: { format: (template: string) => string };
}

export const ApplicationFormModal = ({
  open,
  onCancel,
  onSubmit,
}: ApplicationFormModalProps): ReactNode => {
  const [form] = Form.useForm<ApplicationFormValues>();
  const { statusOptions, employmentTypeOptions, workTypeOptions } =
    useApplicationFilters();

  const handleOk = async (): Promise<void> => {
    const values = await form.validateFields();
    await onSubmit({
      ...values,
      appliedAt: values.appliedAt?.format("YYYY-MM-DD"),
      deadline: values.deadline?.format("YYYY-MM-DD"),
      nextActionDate: values.nextActionDate?.format("YYYY-MM-DD"),
    });
    form.resetFields();
  };

  return (
    <Modal
      title="지원 추가"
      open={open}
      onCancel={onCancel}
      onOk={() => void handleOk()}
      okText="저장"
      cancelText="취소"
    >
      <Form<ApplicationFormValues>
        form={form}
        layout="vertical"
        initialValues={{ status: "interested" }}
      >
        <Form.Item
          name="companyName"
          label="회사명"
          rules={[{ required: true, message: "회사명을 입력하세요." }]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
          name="companyType"
          label="회사 유형"
          rules={[{ required: true, message: "회사 유형을 선택하세요." }]}
        >
          <Select options={companyTypeOptions} />
        </Form.Item> */}
        <Form.Item
          name="position"
          label="직무"
          rules={[{ required: true, message: "직무를 입력하세요." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="status" label="상태" rules={[{ required: true }]}>
          <Select options={statusOptions} />
        </Form.Item>
        <Form.Item
          name="employmentType"
          label="고용 형태"
          rules={[{ required: true }]}
        >
          <Select options={employmentTypeOptions} />
        </Form.Item>
        <Form.Item
          name="workType"
          label="근무 형태"
          rules={[{ required: true }]}
        >
          <Select options={workTypeOptions} />
        </Form.Item>
        <Form.Item name="jobUrl" label="채용 공고 링크">
          <Input />
        </Form.Item>
        <Form.Item name="location" label="지역">
          <Input />
        </Form.Item>
        <Form.Item name="appliedAt" label="지원일">
          <DatePicker className="full-width" />
        </Form.Item>
        <Form.Item name="deadline" label="마감일">
          <DatePicker className="full-width" />
        </Form.Item>
        <Form.Item name="memo" label="메모">
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

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
  Row,
  Col,
} from "antd";
import { useEffect, useState, type ReactNode } from "react";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import {
  ApplicationResponse,
  ApplicationUpdatePayload,
} from "@/types/application";
import { updateApplication } from "@/services/applicationApi";
import {
  companyTypeOptions,
  employmentTypeOptions,
  jobPlatformOptions,
  statusOptions,
  workTypeOptions,
} from "@/utils/format";

interface ApplicationeDetailModalProps {
  application: ApplicationResponse;
  open: boolean;
  id: Number;
  onCancel: () => void;
  onSuccess: () => Promise<void>;
}

type ApplicationFormValue = Omit<
  ApplicationUpdatePayload,
  "appliedAt" | "deadline"
> & {
  appliedAt: Dayjs;
  deadline: Dayjs;
};

const ApplicationDetailModal = ({
  application,
  open,
  id,
  onCancel,
  onSuccess,
}: ApplicationeDetailModalProps): ReactNode => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { message: messageApi } = AntdApp.useApp();
  const [form] = Form.useForm<ApplicationFormValue>();

  const handleSubmit = async (values: ApplicationFormValue) => {
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
    setLoading(true);

    try {
      const payload: ApplicationUpdatePayload = {
        ...values,
        memo: values.memo?.trim(),
        appliedAt: dayjs(values.appliedAt).format("YYYY-MM-DD"),
        deadline: dayjs(values.deadline).format("YYYY-MM-DD"),
      };
      await updateApplication(id, payload);
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
            <Button key="edit" type="text" loading={loading}>
              수정
            </Button>
          </Popconfirm>,
        ]}
      >
        {errorMsg && <Alert type="error" message={errorMsg} showIcon />}

        <Card className={`application-form-card ${errorMsg ? "mt-20" : ""}`}>
          <Form<ApplicationFormValue>
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              name="companyName"
              label="회사명"
              rules={[{ required: true, message: "회사명을 입력하세요." }]}
            >
              <Input placeholder="회사명을 입력하세요" />
            </Form.Item>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="companyType"
                  label="회사 유형"
                  rules={[
                    { required: true, message: "회사 유형을 선택하세요." },
                  ]}
                >
                  <Select
                    placeholder="회사 유형 선택"
                    options={companyTypeOptions}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="status"
                  label="상태"
                  rules={[{ required: true, message: "상태를 선택하세요." }]}
                >
                  <Select placeholder="상태 선택" options={statusOptions} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="position"
              label="직무"
              rules={[{ required: true, message: "직무를 입력하세요." }]}
            >
              <Input placeholder="예: 프론트엔드 개발자" />
            </Form.Item>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="employmentType"
                  label="고용 형태"
                  rules={[
                    { required: true, message: "고용 형태를 선택하세요." },
                  ]}
                >
                  <Select
                    placeholder="고용 형태 선택"
                    options={employmentTypeOptions}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="workType"
                  label="근무 형태"
                  rules={[
                    { required: true, message: "근무 형태를 선택하세요." },
                  ]}
                >
                  <Select
                    placeholder="근무 형태 선택"
                    options={workTypeOptions}
                  />
                </Form.Item>
              </Col>
            </Row>
            {application.projectName && (
              <Form.Item
                name="projectName"
                label="프로젝트명"
                rules={[
                  { required: true, message: "프로젝트명을 입력하세요." },
                ]}
              >
                <Input placeholder="프로젝트명을 입력" />
              </Form.Item>
            )}
            <Form.Item
              name="jobPlatform"
              label="지원 플랫폼"
              rules={[{ required: true, message: "플랫폼을 선택하세요." }]}
            >
              <Select placeholder="플랫폼 선택" options={jobPlatformOptions} />
            </Form.Item>

            <Form.Item name="location" label="지역">
              <Input placeholder="예: 서울 강남구" />
            </Form.Item>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item name="appliedAt" label="지원일">
                  <DatePicker
                    className="full-width"
                    placeholder="지원일 선택"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="deadline" label="마감일">
                  <DatePicker
                    className="full-width"
                    placeholder="마감일 선택"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="nextAction" label="해야할 일">
              <Input.TextArea rows={4} placeholder="해야할 일을 입력하세요" />
            </Form.Item>
            <Form.Item name="memo" label="메모">
              <Input.TextArea rows={4} placeholder="메모를 입력하세요" />
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </>
  );
};

export default ApplicationDetailModal;

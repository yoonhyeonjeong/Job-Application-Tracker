"use client";

import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
} from "antd";
import { useState, type ReactNode } from "react";
import type { CreateApplicationPayload } from "@/types/application";
import { PageHeader } from "@/components/common/PageHeader";
import {
  companyTypeOptions,
  employmentTypeOptions,
  jobPlatformOptions,
  statusOptions,
  workTypeOptions,
} from "@/utils/format";
import { postApplication } from "@/services/applicationApi";
import { useRouter } from "next/navigation";

const ApplicationsNewPage = (): ReactNode => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<CreateApplicationPayload>();
  // 프리랜서인지 여부 체크
  const employmentType = Form.useWatch("employmentType", form);
  const isFreelance = employmentType === "freelance";

  const handleSubmit = async (values: CreateApplicationPayload) => {
    setLoading(true);
    try {
      console.log(values);
      await postApplication(values);
      message.success("지원 정보가 등록되었습니다.");
      router.push("/");
    } catch (error) {
      console.error(error);
      message.success("지원 정보 등록 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-stack">
      <PageHeader
        title="지원 추가"
        description="지원을 추가 할 수 있는 폼입니다."
      />

      <Card className="application-form-card">
        <Form<CreateApplicationPayload>
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
                rules={[{ required: true, message: "회사 유형을 선택하세요." }]}
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
                rules={[{ required: true, message: "고용 형태를 선택하세요." }]}
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
                rules={[{ required: true, message: "근무 형태를 선택하세요." }]}
              >
                <Select
                  placeholder="근무 형태 선택"
                  options={workTypeOptions}
                />
              </Form.Item>
            </Col>
          </Row>
          {isFreelance && (
            <Form.Item
              name="projectName"
              label="프로젝트명"
              rules={[{ required: true, message: "프로젝트명을 입력하세요." }]}
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
                <DatePicker className="full-width" placeholder="지원일 선택" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="deadline" label="마감일">
                <DatePicker className="full-width" placeholder="마감일 선택" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="memo" label="메모">
            <Input.TextArea rows={4} placeholder="메모를 입력하세요" />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="full-width">
            지원 하러 가기
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ApplicationsNewPage;

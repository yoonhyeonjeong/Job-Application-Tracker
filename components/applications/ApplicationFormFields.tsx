import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import {
  companyTypeOptions,
  employmentTypeOptions,
  jobPlatformOptions,
  statusOptions,
  workTypeOptions,
} from "@/utils/format";

interface ApplicationFormFieldsProps {
  showProjectName: boolean;
}

export const ApplicationFormFields = ({
  showProjectName,
}: ApplicationFormFieldsProps) => {
  return (
    <>
      <Form.Item
        name="companyName"
        label="회사명"
        rules={[{ required: true, message: "회사명을 입력해주세요." }]}
      >
        <Input placeholder="회사명을 입력해주세요." />
      </Form.Item>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="companyType"
            label="회사 유형"
            rules={[{ required: true }]}
          >
            <Select placeholder="회사 유형 선택" options={companyTypeOptions} />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item name="status" label="상태" rules={[{ required: true }]}>
            <Select placeholder="상태 선택" options={statusOptions} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="position"
        label="직무"
        rules={[{ required: true, message: "직무를 입력해주세요." }]}
      >
        <Input placeholder="예: 프론트엔드 개발자" />
      </Form.Item>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="employmentType"
            label="고용 형태"
            rules={[{ required: true }]}
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
            rules={[{ required: true }]}
          >
            <Select placeholder="근무 형태 선택" options={workTypeOptions} />
          </Form.Item>
        </Col>
      </Row>

      {showProjectName && (
        <Form.Item
          name="projectName"
          label="프로젝트명"
          rules={[{ required: true, message: "프로젝트명을 입력해주세요." }]}
        >
          <Input placeholder="프로젝트명을 입력해주세요." />
        </Form.Item>
      )}

      <Form.Item
        name="jobPlatform"
        label="지원 플랫폼"
        rules={[{ required: true }]}
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

      <Form.Item name="nextAction" label="다음 액션">
        <Input.TextArea rows={4} placeholder="다음 할 일을 입력해주세요." />
      </Form.Item>

      <Form.Item name="memo" label="메모">
        <Input.TextArea rows={4} placeholder="메모를 입력해주세요." />
      </Form.Item>
    </>
  );
};

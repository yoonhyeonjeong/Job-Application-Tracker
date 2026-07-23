"use client";

import {
  Button,
  Card,
  Descriptions,
  Flex,
  Popconfirm,
  Space,
  Tag,
  Typography,
  App as AntdApp,
} from "antd";
import { useState, type ReactNode } from "react";
import { StatusTag } from "@/components/common/StatusTag";
import type { ApplicationResponse } from "@/types/application";
import { formatDate, getDaysSince } from "@/utils/date";
import { companyTypeLabels, employmentTypeLabels } from "@/utils/format";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import ApplicationModal from "./ApplicationModal";
import { useParams, useRouter } from "next/navigation";
import { deleteApplication } from "@/services/applicationApi";
import ApplicationDetailModal from "./ApplicationDetailModal";

interface ApplicationDetailProps {
  application: ApplicationResponse;
  onSuccess: () => void;
  onApplicationUpdateSuccess: () => Promise<void>;
}

export const ApplicationDetail = ({
  application,
  onSuccess,
  onApplicationUpdateSuccess,
}: ApplicationDetailProps): ReactNode => {
  const { message: messageApi } = AntdApp.useApp();
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const [scheduleModal, setScheduleModalOpen] = useState<boolean>(false);
  const [applicationModal, setApplicationModalOpen] = useState<boolean>(false);
  const ddayDiff = getDaysSince(application?.appliedAt ?? "");

  const handleOpenScheduleModal = () => {
    setScheduleModalOpen(true);
  };

  const handleCloseScheduleModal = () => {
    setScheduleModalOpen(false);
  };

  const handleOpenApplicationModal = () => {
    setApplicationModalOpen(true);
  };

  const handleCloseApplicationModal = () => {
    setApplicationModalOpen(false);
  };

  const handleDeleteApplication = async (id: number) => {
    try {
      await deleteApplication(id);
      messageApi.success("지원 삭제 되었습니다.");
      router.push("/");
    } catch (error) {}
  };

  console.log(id);
  return (
    <>
      <Card>
        <Space direction="vertical" size="large" className="full-width">
          <Space direction="vertical" size={4} className="full-width">
            <Flex align="center" justify="space-between">
              <Typography.Title level={3}>
                {application?.companyName}
              </Typography.Title>
              <Flex align="center" justify="center" gap="small">
                <Button
                  icon={<EditOutlined />}
                  onClick={() => setApplicationModalOpen(true)}
                >
                  수정
                </Button>
                <Popconfirm
                  key="delete-confirm"
                  title="지원 삭제"
                  description="이 지원을 삭제하시겠습니까?"
                  okText="네"
                  cancelText="아니오"
                  okButtonProps={{
                    danger: true,
                  }}
                  onConfirm={() => handleDeleteApplication(id)}
                >
                  <Button danger type="primary" icon={<DeleteOutlined />}>
                    삭제
                  </Button>
                </Popconfirm>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    handleOpenScheduleModal();
                  }}
                >
                  일정 등록
                </Button>
              </Flex>
            </Flex>

            <Flex align="center" gap={8}>
              <Typography.Text type="secondary">
                {application?.position}
              </Typography.Text>
              <Typography.Text type="warning">
                지원일로부터 {ddayDiff}일 지남
              </Typography.Text>
            </Flex>
          </Space>
          <Descriptions bordered column={{ xs: 1, md: 2 }}>
            <Descriptions.Item label="상태">
              <StatusTag status={application?.status} />
            </Descriptions.Item>
            <Descriptions.Item label="회사유형">
              <Tag>{companyTypeLabels[application?.companyType]}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="고용 형태">
              {employmentTypeLabels[application?.employmentType]}
            </Descriptions.Item>
            <Descriptions.Item label="지역">
              {application?.location ?? "-"}
            </Descriptions.Item>
            <Descriptions.Item label="지원일">
              {application?.appliedAt
                ? formatDate(application?.appliedAt)
                : "-"}
            </Descriptions.Item>

            <Descriptions.Item label="마감일">
              {application.deadline ? formatDate(application.deadline) : "-"}
            </Descriptions.Item>

            {application.projectName && (
              <Descriptions.Item label="프로젝트명">
                {application?.projectName ?? "-"}
              </Descriptions.Item>
            )}
            <Descriptions.Item label="다음 액션" span={{ xs: 1, md: 2 }}>
              {application.nextAction ?? "-"}
            </Descriptions.Item>

            <Descriptions.Item label="메모" span={{ xs: 1, md: 2 }}>
              {application?.memo ?? "-"}
            </Descriptions.Item>
          </Descriptions>
        </Space>
      </Card>

      {/* 일정등록 모달 */}
      <ApplicationModal
        open={scheduleModal}
        applicationId={id}
        onCancel={handleCloseScheduleModal}
        onSuccess={onSuccess}
      />

      {/* 지원 상세 모달 (수정용) */}
      <ApplicationDetailModal
        open={applicationModal}
        application={application}
        onCancel={handleCloseApplicationModal}
        onSuccess={onApplicationUpdateSuccess}
        id={id}
      />
    </>
  );
};

"use client";

import { Card, Descriptions, Flex, Space, Tag, Typography } from "antd";
import type { ReactNode } from "react";
import { StatusTag } from "@/components/common/StatusTag";
import type { ApplicationResponse } from "@/types/application";
import { formatDate, getDaysSince } from "@/utils/date";
import { companyTypeLabels, employmentTypeLabels } from "@/utils/format";

interface ApplicationDetailProps {
  application: ApplicationResponse;
}

export const ApplicationDetail = ({
  application,
}: ApplicationDetailProps): ReactNode => {
  const ddayDiff = getDaysSince(application?.appliedAt ?? "");
  return (
    <Card>
      <Space direction="vertical" size="large" className="full-width">
        <Space direction="vertical" size={4}>
          <Typography.Title level={3}>
            {application?.companyName}
          </Typography.Title>
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
            {application?.appliedAt ? formatDate(application?.appliedAt) : "-"}
          </Descriptions.Item>

          <Descriptions.Item label="마감일">
            {application.deadline ? formatDate(application.deadline) : "-"}
          </Descriptions.Item>

          {application.projectName && (
            <Descriptions.Item label="프로젝트명">
              {application?.projectName ?? "-"}
            </Descriptions.Item>
          )}
          <Descriptions.Item label="다음 액션" span={4}>
            {application.nextAction ?? "-"}
          </Descriptions.Item>

          <Descriptions.Item label="메모" span={4}>
            {application?.memo ?? "-"}
          </Descriptions.Item>
        </Descriptions>
      </Space>
    </Card>
  );
};

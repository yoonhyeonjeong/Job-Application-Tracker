"use client";

import { Card, Descriptions, Space, Typography } from "antd";
import Link from "next/link";
import type { ReactNode } from "react";
import { StatusTag } from "@/components/common/StatusTag";
import type { ApplicationResponse } from "@/types/application";
import { formatDate } from "@/utils/date";
import { employmentTypeLabels, workTypeLabels } from "@/utils/format";

interface ApplicationDetailProps {
  application: ApplicationResponse;
}

export const ApplicationDetail = ({
  application,
}: ApplicationDetailProps): ReactNode => {
  return (
    <Card>
      <Space direction="vertical" size="large" className="full-width">
        <Space direction="vertical" size={4}>
          <Typography.Title level={3}>
            {application.companyName}
          </Typography.Title>
          <Typography.Text type="secondary">
            {application.position}
          </Typography.Text>
        </Space>
        <Descriptions bordered column={{ xs: 1, md: 2 }}>
          <Descriptions.Item label="상태">
            <StatusTag status={application.status} />
          </Descriptions.Item>
          <Descriptions.Item label="고용 형태">
            {employmentTypeLabels[application.employmentType]}
          </Descriptions.Item>
          <Descriptions.Item label="근무 형태">
            {workTypeLabels[application.workType]}
          </Descriptions.Item>
          <Descriptions.Item label="지역">
            {application.location ?? "-"}
          </Descriptions.Item>
          <Descriptions.Item label="지원일">
            {application.appliedAt ? formatDate(application.appliedAt) : "-"}
          </Descriptions.Item>
          <Descriptions.Item label="마감일">
            {application.deadline ? formatDate(application.deadline) : "-"}
          </Descriptions.Item>
          <Descriptions.Item label="메모" span={2}>
            {application.memo ?? "-"}
          </Descriptions.Item>
        </Descriptions>
      </Space>
    </Card>
  );
};

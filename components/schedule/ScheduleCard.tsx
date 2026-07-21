"use client";

import { Card, Flex, Space, Tag, Typography } from "antd";
import { type ReactNode } from "react";
import { ScheduleDetailResponse } from "@/types/schedule";
import dayjs from "dayjs";

interface ScheduleCardProps {
  data: ScheduleDetailResponse;
}

export const ScheduleCard = ({ data }: ScheduleCardProps): ReactNode => {
  const ScheduleTypeLabel = data?.type === "interview" ? "면접" : "과제";
  return (
    <>
      <Card>
        <Space direction="vertical" size="large" className="full-width">
          <Space direction="vertical" size={4} className="full-width">
            <Tag>{ScheduleTypeLabel}</Tag>
            <p>{data?.title}</p>
            <p>{data?.memo}</p>
            <p>{dayjs(data?.scheduledAt).format("YYYY.MM.DD")}</p>
          </Space>
        </Space>
      </Card>
    </>
  );
};

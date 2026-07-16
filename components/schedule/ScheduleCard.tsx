"use client";

import { Button, Card, Flex, Space, Typography } from "antd";
import { useState, type ReactNode } from "react";
import { useParams } from "next/navigation";
import { ScheduleResponse } from "@/types/schedule";

interface ScheduleCardProps {
  data: ScheduleResponse[];
}

export const ScheduleCard = ({ data }: ScheduleCardProps): ReactNode => {
  const params = useParams();
  // const id = Number(params.id);
  console.log(data, "sdfsdf");

  return (
    <>
      <Card>
        <Space direction="vertical" size="large" className="full-width">
          <Space direction="vertical" size={4} className="full-width">
            <Flex align="center" justify="space-between">
              <Typography.Title level={3}>xxc</Typography.Title>
            </Flex>

            <Flex align="center" gap={8}>
              <Typography.Text type="secondary">sdfsfd</Typography.Text>
              <Typography.Text type="warning">sdfsdf</Typography.Text>
            </Flex>
          </Space>
        </Space>
      </Card>
    </>
  );
};

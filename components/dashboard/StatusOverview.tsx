"use client";

import { Alert, Button, Card, Space } from "antd";
import type { ReactNode } from "react";
import type { StatusOverviewItem } from "@/types/dashboard";
import { StatusChart } from "./StatusChart";

interface StatusOverviewProps {
  items: StatusOverviewItem[];
  error?: boolean;
  refetch?: () => void;
}

export const StatusOverview = ({ items, error, refetch }: StatusOverviewProps): ReactNode => {
  return (
    <Card title="지원 현황" style={{ height: "100%" }}>
      {error ?
        <Alert
          type="error"
          showIcon
          message="지원 현황을 불러오지 못했습니다."
          action={
            <Button size="small" onClick={() => refetch?.()}>
              다시 시도
            </Button>
          }
        />
      : <>
          <Space direction="vertical" className="full-width" size="middle">
            <StatusChart items={items} />
          </Space>
        </>
      }
    </Card>
  );
};

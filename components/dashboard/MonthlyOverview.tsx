"use client";

import { Alert, Button, Card, Space } from "antd";
import type { ReactNode } from "react";
import type { MonthlyCount } from "@/types/dashboard";
import { MonthlyChart } from "./MonthlyChart";

interface MonthlyOverviewProps {
  items: MonthlyCount[];
  error?: boolean;
  refetch?: () => void;
}

export const MonthlyOverview = ({ items, error, refetch }: MonthlyOverviewProps): ReactNode => {
  return (
    <Card title="월별 지원 추이" style={{ height: "100%" }}>
      {error ?
        <Alert
          type="error"
          showIcon
          message="월별 지원 추이를 불러오지 못했습니다."
          action={
            <Button size="small" onClick={() => refetch?.()}>
              다시 시도
            </Button>
          }
        />
      : <Space direction="vertical" className="full-width" size="middle">
          <MonthlyChart items={items} />
        </Space>
      }
    </Card>
  );
};

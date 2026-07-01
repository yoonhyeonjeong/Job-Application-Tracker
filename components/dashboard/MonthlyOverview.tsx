"use client";

import { Card, Space } from "antd";
import type { ReactNode } from "react";
import type { StatusOverviewItem } from "@/types/dashboard";
import { MonthlyChart } from "./MonthlyChart";

interface MonthlyOverviewProps {
  items: StatusOverviewItem[];
}

export const MonthlyOverview = ({ items }: MonthlyOverviewProps): ReactNode => {
  return (
    <Card title="월별 지원 추이">
      <Space direction="vertical" className="full-width" size="middle">
        <MonthlyChart items={items} />
      </Space>
    </Card>
  );
};

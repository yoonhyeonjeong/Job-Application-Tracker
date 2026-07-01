"use client";

import { Card, Progress, Space, Typography } from "antd";
import type { ReactNode } from "react";
import type { StatusOverviewItem } from "@/types/dashboard";
import { statusLabels } from "@/utils/status";
import StatusChart from "./StatusChart";

interface StatusOverviewProps {
  items: StatusOverviewItem[];
}

export const StatusOverview = ({ items }: StatusOverviewProps): ReactNode => {
  const total = items.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card title="상태별 현황">
      <Space direction="vertical" className="full-width" size="middle">
        {items.map((item) => {
          const percent =
            total > 0 ? Math.round((item.count / total) * 100) : 0;

          return (
            <div key={item.status}>
              <div className="status-overview-row">
                <Typography.Text>{statusLabels[item.status]}</Typography.Text>
                <Typography.Text type="secondary">
                  {item.count}건
                </Typography.Text>
              </div>
              <StatusChart />
              {/* <Progress percent={percent} size="small" /> */}
            </div>
          );
        })}
      </Space>
    </Card>
  );
};

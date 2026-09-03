"use client";

import { Card } from "antd";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ApplicationFunnelResponse } from "@/types/statistics";

interface StatisticsFunnelProps {
  data: ApplicationFunnelResponse | null;
}

interface ChartDataItem {
  name: string;
  count: number;
  color: string;
}

const StatisticsFunnel = ({ data }: StatisticsFunnelProps) => {
  // data가 null이면 전체 지원 건수를 0으로 사용
  const appliedCount = data?.appliedCount ?? 0;

  const calculateRate = (count: number): number => {
    // 전체 지원이 0이면 나눌 수 없으므로 0% 반환
    if (appliedCount === 0) {
      return 0;
    }

    return Math.round((count / appliedCount) * 100);
  };

  const chartData: ChartDataItem[] = [
    {
      name: "전체 지원",
      count: appliedCount,
      color: "#1677ff",
    },
    {
      name: "서류 통과",
      count: data?.documentPassedCount ?? 0,
      color: "#13c2c2",
    },
    {
      name: "면접",
      count: data?.interviewCount ?? 0,
      color: "#722ed1",
    },
    {
      name: "오퍼",
      count: data?.offerCount ?? 0,
      color: "#52c41a",
    },
  ].map((item) => {
    const rate = calculateRate(item.count);

    return {
      ...item,
      rate,
      label: `${item.count}건 (${rate}%)`,
    };
  });

  return (
    <Card title="지원 단계별 전환 현황">
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{
            top: 10,
            right: 100,
            bottom: 10,
            left: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />

          <XAxis type="number" domain={[0, Math.max(appliedCount, 1)]} hide />

          <YAxis
            type="category"
            dataKey="name"
            width={80}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip formatter={(value) => [`${value}건`, "지원 수"]} />

          <Bar dataKey="count" barSize={32} radius={[0, 6, 6, 0]}>
            {chartData.map((item) => (
              <Cell key={item.name} fill={item.color} />
            ))}

            <LabelList
              dataKey="label"
              position="right"
              fill="#262626"
              fontSize={13}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default StatisticsFunnel;

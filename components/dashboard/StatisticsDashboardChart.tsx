'use client';

import { Card, Col, Row } from 'antd';
import type { ReactNode } from 'react';
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import type { StatusOverviewItem } from '@/types/dashboard';
import { statusLabels } from '@/utils/status';

interface StatisticsDashboardChartProps {
  items: StatusOverviewItem[];
}

interface ChartDataItem {
  name: string;
  value: number;
  percent: number;
}

const chartColors: string[] = ['#1677ff', '#722ed1', '#faad14', '#52c41a', '#ff4d4f', '#13c2c2', '#fa8c16'];

const formatCountTooltip = (value: ValueType | undefined, name: NameType | undefined): [string, string] => {
  const count = typeof value === 'number' || typeof value === 'string' ? value : 0;
  const label = typeof name === 'number' || typeof name === 'string' ? String(name) : '상태';
  return [`${count}건`, label];
};

const formatBarTooltip = (value: ValueType | undefined): [string, string] => {
  const count = typeof value === 'number' || typeof value === 'string' ? value : 0;
  return [`${count}건`, '지원 수'];
};

export const StatisticsDashboardChart = ({ items }: StatisticsDashboardChartProps): ReactNode => {
  const total = items.reduce((sum, item) => sum + item.count, 0);
  const chartData: ChartDataItem[] = items.map((item) => ({
    name: statusLabels[item.status],
    value: item.count,
    percent: total > 0 ? Math.round((item.count / total) * 100) : 0
  }));

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} lg={10}>
        <Card title="지원 상태 분포">
          <div className="chart-panel">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={72} outerRadius={108} paddingAngle={4}>
                  {chartData.map((item, index) => (
                    <Cell key={item.name} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={formatCountTooltip} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </Col>
      <Col xs={24} lg={14}>
        <Card title="상태별 지원 수">
          <div className="chart-panel">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData} margin={{ top: 12, right: 16, bottom: 8, left: 0 }}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip formatter={formatBarTooltip} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {chartData.map((item, index) => (
                    <Cell key={item.name} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

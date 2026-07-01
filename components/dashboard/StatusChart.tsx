import { StatusOverviewItem } from "@/types/dashboard";
import { statusChartColors, statusLabels } from "@/utils/status";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface StatusChartProps {
  items: StatusOverviewItem[];
}

export const StatusChart = ({ items }: StatusChartProps) => {
  const chartData = items.map((item) => {
    return {
      name: statusLabels[item.status],
      value: item.count,
      fill: statusChartColors[item.status] || "#d9d9d9", // 기본 색상 설정
    };
  });

  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="status-chart-container">
      <div className="status-chart-area">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={3}
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-legend-table">
        <p className="chart-legend-head">총 {totalCount}건</p>
        {items.map((item) => (
          <div className="chart-legend-row" key={item.status}>
            <span className="chart-legend-name">
              <i style={{ backgroundColor: statusChartColors[item.status] }} />
              {statusLabels[item.status]}
            </span>
            <strong>{item.count}건</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

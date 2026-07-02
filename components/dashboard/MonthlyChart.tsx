import { StatusOverviewItem } from "@/types/dashboard";
import dayjs from "dayjs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface MonthlyOverviewProps {
  items: StatusOverviewItem[];
}

export const MonthlyChart = ({ items }: MonthlyOverviewProps) => {
  const dummyData = [
    {
      month: "2026-01",
      count: 5,
    },
    {
      month: "2026-02",
      count: 8,
    },
    {
      month: "2026-03",
      count: 3,
    },
    {
      month: "2026-04",
      count: 10,
    },
  ];
  // 더미데이터 가공
  const chartData = dummyData.map((item) => {
    return {
      month: dayjs(item.month).format("MM월"),
      count: item.count,
    };
  });
  return (
    <div className="monthly-chart-container">
      <div className="monthly-chart-area">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 12, right: 16, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#7BAAF7"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

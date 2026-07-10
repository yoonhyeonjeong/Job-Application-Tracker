import { MonthlyCount, StatusOverviewItem } from "@/types/dashboard";
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
  items: MonthlyCount[];
}

export const MonthlyChart = ({ items }: MonthlyOverviewProps) => {
  return (
    <div className="monthly-chart-container">
      <div className="monthly-chart-area">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={items}
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

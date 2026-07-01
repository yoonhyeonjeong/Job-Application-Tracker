import { StatusOverviewItem } from "@/types/dashboard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// interface MonthlyApplicationTrendItem {
//   month: string;
//   count: number;
// }

interface MonthlyOverviewProps {
  items: StatusOverviewItem[];
}

export const MonthlyChart = ({ items }: MonthlyOverviewProps) => {
  const dummyData = [
    {
      month: "5월",
      count: 10,
    },
    {
      month: "6월",
      count: 20,
    },
    {
      month: "7월",
      count: 30,
    },
  ];
  console.log("MonthlyChart items:", items);
  return (
    <div className="monthly-chart-container">
      <div className="monthly-chart-area">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dummyData}
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

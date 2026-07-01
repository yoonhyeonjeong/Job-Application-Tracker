import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend } from "recharts";

const data = [
  { name: "지원완료", value: 12, fill: "#1677ff" },
  { name: "서류통과", value: 4, fill: "#52c41a" },
  { name: "면접예정", value: 2, fill: "#faad14" },
  { name: "불합격", value: 6, fill: "#ff4d4f" },
];

export default function StatusChart() {
  return (
    <div style={{ width: "100%", height: 280 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={65}
            outerRadius={95}
            paddingAngle={3}
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

import { memo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AdminSaleChart = () => {
  const data = [
    { name: "TUE", users: 20000 },
    { name: "WED", users: 15000 },
    { name: "THUR", users: 40000 },
    { name: "FRI", users: 5000 },
    { name: "SAT", users: 42000 },
    { name: "SUN", users: 62000 },
  ];
  return (
    <ResponsiveContainer width="100%" height={500} className="px-4 py-2">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 2, left: -7, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor="#6C63FF" stopOpacity={0.4} />
            <stop offset="90%" stopColor="#6C63FF" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="users"
          stroke="#6C63FF"
          strokeWidth={2}
          fill="url(#colorVisitors)"
          activeDot={{ r: 5 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default memo(AdminSaleChart);

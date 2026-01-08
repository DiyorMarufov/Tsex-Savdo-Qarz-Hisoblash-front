import { memo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSale } from "../../../../shared/lib/apis/sales/useSale";
import DashboardChartSaleSkeleton from "../../../../shared/ui/Skeletons/DashboardBalanceSkeleton/DashboardChartSaleSkeleton";

const SaleChart = ({ isAnimationActive = true }) => {
  const { getWeeklySale } = useSale();
  // Weekly sale starts
  const { data: weeklySale, isLoading } = getWeeklySale();
  const data = weeklySale?.data;
  // Weekly sale ends

  if (isLoading) return <DashboardChartSaleSkeleton />;

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
        <Tooltip formatter={(val) => `${val.toLocaleString()} uzs`} />
        <Area
          type="monotone"
          dataKey="sotuvlar"
          stroke="#6C63FF"
          strokeWidth={2}
          fill="url(#colorVisitors)"
          activeDot={{ r: 5 }}
          animationDuration={800}
          isAnimationActive={isAnimationActive}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default memo(SaleChart);

import { memo, useMemo, type FC } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "dayjs/locale/uz-latn";
import { useSale } from "../../../../shared/lib/apis/sales/useSale";
import { useParamsHook } from "../../../../shared/hooks/params/useParams";
import SalesReportChartSkeleton from "../../../../shared/ui/Skeletons/Reports/SalesReport/SalesReportChartSkeleton";

interface SalesReportChartProps {
  params: {
    startDate: string;
    endDate: string;
    productId: string;
    tsexId: string;
    shopId: string;
  };
  isAnimationActive?: boolean;
}

const SalesReportChart: FC<SalesReportChartProps> = ({
  params,
  isAnimationActive,
}) => {
  const { getParam, setParam } = useParamsHook();
  const filterType = (getParam("type") as "day" | "month" | "year") || "day";

  const { getSalesStatisticsForReport } = useSale();

  // SalesStatistics start
  const query = useMemo(
    () => ({
      ...params,
      type: filterType,
    }),
    [
      params.startDate,
      params.endDate,
      params.productId,
      params.tsexId,
      params.shopId,
      filterType,
    ],
  );
  const { data: salesStatisticsReport, isLoading: salesStatisticsLoading } =
    getSalesStatisticsForReport(query);
  const statisticsReports = salesStatisticsReport?.data;
  // SalesStatistics end

  // HandleFilterChange starts
  const handleFilterTypeChange = (type: "day" | "month" | "year") => {
    setParam("type", type);
  };
  // HandleFilterChange ends

  return (
    <div className="p-4 bg-white rounded-xl border border-bg-fy w-full max-[500px]:p-3 max-[500px]:rounded-lg">
      <div className="flex justify-between max-[750px]:flex-col gap-2 mb-5">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-slate-800 max-[500px]:text-[15px]">
            Sotuvlar hisoboti
          </h3>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-lg">
          {(["day", "month", "year"] as const).map((type) => (
            <button
              key={type}
              onClick={() => handleFilterTypeChange(type)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex-1 min-w-20 ${
                filterType === type
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-500"
              }`}
            >
              {type === "day"
                ? "Kunlik"
                : type === "month"
                  ? "Oylik"
                  : "Yillik"}
            </button>
          ))}
        </div>
      </div>
      {salesStatisticsLoading ? (
        <SalesReportChartSkeleton />
      ) : (
        <div className="h-[350px] w-full max-[500px]:h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={statisticsReports}
              margin={{
                top: 10,
                right: 5,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorSoni" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSumma" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 10 }}
                dy={10}
                minTickGap={15}
              />

              <YAxis
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#10b981", fontSize: 9 }}
                width={35}
                tickFormatter={(value) => {
                  if (value >= 1000000000)
                    return `${(value / 1000000000).toFixed(0)}B`;
                  if (value >= 1000000)
                    return `${(value / 1000000).toFixed(0)}M`;
                  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
                  return value;
                }}
              />

              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6366f1", fontSize: 9 }}
                width={30}
                tickFormatter={(value) => {
                  if (value >= 1000000)
                    return `${(value / 1000000).toFixed(0)}M`;
                  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
                  return value;
                }}
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  value.toLocaleString() + (name === "Summa" ? " uzs" : " ta"),
                  name,
                ]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  fontSize: "11px",
                }}
              />

              <Area
                yAxisId="left"
                type="monotone"
                dataKey="Summa"
                name="Summa"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSumma)"
                animationDuration={800}
                isAnimationActive={isAnimationActive}
              />

              <Area
                yAxisId="right"
                type="monotone"
                dataKey="Sotuvlar soni"
                name="Sotuvlar"
                stroke="#6366f1"
                strokeWidth={1.5}
                fillOpacity={1}
                fill="url(#colorSoni)"
                animationDuration={800}
                isAnimationActive={isAnimationActive}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default memo(SalesReportChart);

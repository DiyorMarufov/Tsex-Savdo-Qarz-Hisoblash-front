import { memo, useEffect, useState, type FC } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import TsexesReportChartSkeleton from "../../../../shared/ui/Skeletons/Reports/TsexesReport/TsexesReportChartSkeleton";

interface TsexesReportProps {
  data: { name: string; olingan: number; tolovlar: number }[];
  loading: boolean;
}

const TsexesReportChart: FC<TsexesReportProps> = ({ data, loading }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 520);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="bg-white rounded-xl border border-bg-fy w-full p-4 max-[500px]:p-3">
      <h3 className="text-lg font-bold text-slate-800 max-[500px]:text-[15px]">
        Tsexlar Balans Holati
      </h3>
      {loading ? (
        <TsexesReportChartSkeleton />
      ) : (
        <div className="w-full h-[380px] max-[520px]:h-80 overflow-x-auto">
          <div className="min-w-[700px] h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 25,
                  right: 10,
                  left: -20,
                  bottom: isMobile ? 40 : 10,
                }}
                barGap={isMobile ? 2 : 6}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="#f1f5f9"
                  strokeDasharray="0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: isMobile ? 10 : 12 }}
                  interval={0}
                  angle={isMobile ? -45 : 0}
                  textAnchor={isMobile ? "end" : "middle"}
                  height={isMobile ? 60 : 30}
                />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  formatter={(value: number, name: string) => [
                    `${value.toLocaleString()} uzs`,
                    name,
                  ]}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ paddingBottom: "25px", fontSize: "13px" }}
                  formatter={(value) => (
                    <span className="text-slate-600 font-medium ml-1">
                      {value}
                    </span>
                  )}
                />
                <Bar
                  name="Olingan"
                  dataKey="olingan"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  barSize={isMobile ? 10 : 18}
                ></Bar>
                <Bar
                  name="To'lovlar"
                  dataKey="tolovlar"
                  fill="#94a3b8"
                  radius={[4, 4, 0, 0]}
                  barSize={isMobile ? 10 : 18}
                ></Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(TsexesReportChart);

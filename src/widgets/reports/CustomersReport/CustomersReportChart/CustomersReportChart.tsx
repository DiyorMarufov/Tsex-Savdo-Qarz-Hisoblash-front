import { memo, useState, type FC } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import CustomersReportChartSkeleton from "../../../../shared/ui/Skeletons/Reports/CustomersReport/CustomersReportChartSkeleton";

const COLORS = [
  "#5c67f2",
  "#63b3ed",
  "#48bb78",
  "#ecc94b",
  "#ed64a6",
  "#f56565",
];

interface CustomersReportProps {
  borrowed: { name: string; value: number }[];
  lent: { name: string; value: number }[];
  totalBorrowed: number;
  totalLent: number;
  loading: boolean;
}

const CustomersReportChart: FC<CustomersReportProps> = ({
  borrowed,
  lent,
  totalBorrowed = 0,
  totalLent = 0,
  loading,
}) => {
  const [tab, setTab] = useState<"borrowed" | "lent" | any>("borrowed");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const currentData = tab === "lent" ? lent : borrowed;
  const total = tab === "lent" ? totalLent : totalBorrowed;
  const formatNumber = (num: number) => num.toLocaleString();

  return (
    <div className="w-full">
      <div className="bg-white rounded-[12px] border border-bg-fy overflow-hidden p-4">
        <div className="flex bg-gray-100 p-1 rounded-xl w-full min-[900px]:max-w-[300px]">
          <button
            onClick={() => setTab("borrowed")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              tab === "borrowed"
                ? "bg-white shadow text-indigo-600"
                : "text-slate-500"
            }`}
          >
            Qarzdorlik
          </button>
          <button
            onClick={() => setTab("lent")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              tab === "lent"
                ? "bg-white shadow text-indigo-600"
                : "text-slate-500"
            }`}
          >
            Haqdorlik
          </button>
        </div>

        {loading ? (
          <CustomersReportChartSkeleton />
        ) : (
          <div className="flex flex-col min-[900px]:flex-row items-center min-[850px]:p-6 gap-6 min-[850px]:gap-12">
            <div className="relative  w-50 h-50 min-[900px]:w-[230px] min-[900px]:h-[230px] shrink-0 max-[850px]:mt-4">
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                <span className="text-xl min-[850px]:text-2xl font-black text-slate-800 tracking-tighter">
                  {formatNumber(total)}
                </span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                  Umumiy
                </span>
              </div>

              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={currentData}
                    cx="50%"
                    cy="50%"
                    innerRadius="70%"
                    outerRadius="100%"
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={4}
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    style={{ outline: "none" }}
                  >
                    {currentData?.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        opacity={
                          activeIndex === null || activeIndex === index
                            ? 1
                            : 0.6
                        }
                        className="transition-all duration-300"
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatNumber(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full h-[300px] flex-1">
              <div className="grid grid-cols-1 gap-2">
                {currentData?.map((item, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    className={`flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-transparent transition-all duration-300 ${
                      activeIndex === index
                        ? "bg-indigo-50/50 scale-[1.01]"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                      <div className="flex flex-col">
                        <span className="text-slate-800 font-bold text-sm capitalize leading-none">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {((item.value / total) * 100).toFixed(1)}% ulush
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-900 font-black text-sm tracking-tight">
                        {formatNumber(item.value)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(CustomersReportChart);

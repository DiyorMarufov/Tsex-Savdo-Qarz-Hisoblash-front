import { DatePicker } from "antd";
import dayjs from "dayjs";
import { memo, useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { PieLabelRenderProps } from "recharts";

const data = [
  { name: "Yulduz Tsex", value: 45000000 },
  { name: "Oltin Vodiy", value: 32000000 },
  { name: "Ideal Shoes", value: 28000000 },
  { name: "Zamin Invest", value: 21000000 },
  { name: "Grand Comfort", value: 18000000 },
  { name: "Elite Tsex", value: 15000000 },
  { name: "Universal", value: 12000000 },
  { name: "Sifatli Qadam", value: 9000000 },
];

const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#f43f5e",
  "#f59e0b",
  "#10b981",
  "#06b6d4",
  "#3b82f6",
];

const TsexesReportChart = () => {
  const totalBalance = data.reduce((acc, curr) => acc + curr.value, 0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [filterType, setFilterType] = useState<"oy" | "yil">("oy");
  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 480);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const renderLabel = ({ percent }: PieLabelRenderProps) => {
    if (!percent) return null;
    if (isMobile) return null;
    if (percent < 0.05) return null;
    return `${(percent * 100).toFixed(1)}%`;
  };

  const handleDateChange = (date: any) => {
    if (date) setSelectedDate(date);
  };

  return (
    <div
      className="
        bg-white rounded-xl border border-bg-fy w-full
        p-5
        max-[768px]:p-4
        max-[480px]:p-3
      "
    >
      <div className="mb-3">
        <h3
          className="
            text-lg font-semibold text-slate-800
            max-[480px]:text-[15px]
          "
        >
          Tsexlar balansi taqsimoti
        </h3>

        <p
          className="
            text-sm text-slate-500 mt-1
            max-[480px]:text-[14px]
          "
        >
          Umumiy aylanma:
          <span className="ml-1 font-semibold text-slate-700">
            {totalBalance.toLocaleString()} so'm
          </span>
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 mb-6 max-[500px]:flex-col max-[500px]:items-start max-[500px]:gap-3">
        <div className="flex bg-gray-100 p-1 rounded-lg w-fit max-[500px]:w-full">
          {(["oy", "yil"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all max-[500px]:flex-1 max-[500px]:text-xs ${
                filterType === type
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {type === "oy" ? "Oylik" : "Yillik"}
            </button>
          ))}
        </div>

        <div className="w-auto max-[500px]:w-full">
          <DatePicker
            picker={filterType === "oy" ? "month" : "year"}
            value={selectedDate}
            onChange={handleDateChange}
            allowClear={false}
            className="w-44 h-10 border-gray-200 rounded-lg max-[500px]:w-full max-[500px]:h-9"
          />
        </div>
      </div>

      <div
        className="
          w-full
          h-[340px]
          max-[768px]:h-[300px]
          max-[480px]:h-[260px]
        "
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={isMobile ? 45 : 55}
              outerRadius={isMobile ? 70 : 95}
              paddingAngle={isMobile ? 1 : 3}
              label={renderLabel}
              labelLine={false}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                  opacity={
                    activeIndex === null || activeIndex === index ? 1 : 0.6
                  }
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value: number, name: string) => [
                `${value.toLocaleString()} so'm`,
                name,
              ]}
            />

            <Legend
              iconType="circle"
              formatter={(value: string, entry: any) => {
                const percent = (
                  (entry.payload.value / totalBalance) *
                  100
                ).toFixed(1);
                return (
                  <span
                    className="
                      text-xs text-slate-700
                      max-[480px]:text-[10px]
                    "
                  >
                    {value} — {percent}%
                  </span>
                );
              }}
              wrapperStyle={{
                paddingTop: "10px",
                maxHeight: isMobile ? "70px" : "100px",
                overflowY: "auto",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default memo(TsexesReportChart);

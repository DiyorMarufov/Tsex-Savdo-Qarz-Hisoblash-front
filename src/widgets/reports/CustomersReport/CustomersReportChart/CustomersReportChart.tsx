import { DatePicker } from "antd";
import dayjs from "dayjs";
import { memo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Qarzdorlik", value: 65000000 },
  { name: "Haqdorlik", value: 35000000 },
];

const COLORS = ["#ef4444", "#22c55e"];

const CustomersReportChart = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  const [filterType, setFilterType] = useState<"oy" | "yil">("oy");
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const handleDateChange = (date: any) => {
    if (date) setSelectedDate(date);
  };
  return (
    <div className="bg-white rounded-xl border border-bg-fy w-full p-5">
      <div className="flex justify-between max-[520px]:flex-col">
        <div className="mb-2">
          <h3 className="text-lg font-bold text-slate-800 max-[530px]:text-[15px]">
            Mijozlar balansi holati
          </h3>
          <p className="text-sm text-slate-500">
            Umumiy aylanma: {total.toLocaleString()} so'm
          </p>
        </div>

        <div className="flex items-center gap-2 max-[520px]:w-full max-[520px]:flex-col">
          <div className="flex bg-slate-100 p-1 rounded-lg max-[520px]:w-full">
            {(["oy", "yil"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all max-[520px]:flex-1 ${
                  filterType === type
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {type === "oy" ? "Oylik" : "Yillik"}
              </button>
            ))}
          </div>
          <DatePicker
            picker={filterType === "oy" ? "month" : "year"}
            value={selectedDate}
            onChange={handleDateChange}
            allowClear={false}
            size="middle"
            className="border-slate-200 text-slate-700 w-32 max-[520px]:w-full"
          />
        </div>
      </div>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              stroke="none"
              style={{ cursor: "pointer", outline: "none" }}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  style={{
                    transition: "all 0.3s ease",
                    outline: "none",
                  }}
                  opacity={
                    activeIndex === null || activeIndex === index ? 1 : 0.6
                  }
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value: number) => `${value.toLocaleString()} so'm`}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />

            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              formatter={(value, entry: any) => {
                const percent = ((entry.payload.value / total) * 100).toFixed(
                  1
                );
                return (
                  <span className="text-slate-700 font-medium ml-1">
                    {value}: {percent}%
                  </span>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default memo(CustomersReportChart);

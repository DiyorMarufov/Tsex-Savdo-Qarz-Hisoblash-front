import { useState, useMemo, memo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/uz-latn";

const rawData = {
  kun: [
    { name: "04:00", value: 400 },
    { name: "05:00", value: 300 },
    { name: "06:00", value: 300 },
    { name: "07:00", value: 300 },
    { name: "08:00", value: 300 },
    { name: "09:00", value: 300 },
    { name: "10:00", value: 300 },
    { name: "11:00", value: 300 },
    { name: "12:00", value: 700 },
    { name: "13:00", value: 500 },
  ],
  oy: [
    { name: "1", value: 2000 },
    { name: "2", value: 2500 },
    { name: "3", value: 3200 },
    { name: "4", value: 2800 },
    { name: "5", value: 4500 },
    { name: "6", value: 3000 },
    { name: "7", value: 3500 },
    { name: "8", value: 4000 },
    { name: "9", value: 4800 },
    { name: "10", value: 5200 },
    { name: "11", value: 3000 },
    { name: "12", value: 2800 },
    { name: "13", value: 3600 },
    { name: "14", value: 4200 },
    { name: "15", value: 5000 },
    { name: "16", value: 6000 },
    { name: "17", value: 5500 },
    { name: "18", value: 4500 },
    { name: "19", value: 4000 },
    { name: "20", value: 4200 },
    { name: "21", value: 4800 },
    { name: "22", value: 5100 },
    { name: "23", value: 5800 },
    { name: "24", value: 6200 },
    { name: "25", value: 5500 },
    { name: "26", value: 4800 },
    { name: "27", value: 4300 },
    { name: "28", value: 4000 },
    { name: "29", value: 4500 },
    { name: "30", value: 5200 },
    { name: "31", value: 6500 },
  ],
  yil: [
    { name: "Yan", value: 12000 },
    { name: "Fev", value: 15000 },
    { name: "Mar", value: 10000 },
    { name: "Apr", value: 18000 },
    { name: "May", value: 22000 },
    { name: "Iyun", value: 20000 },
    { name: "Iyul", value: 25000 },
    { name: "Avg", value: 28000 },
    { name: "Sen", value: 21000 },
    { name: "Okt", value: 19000 },
    { name: "Noy", value: 24000 },
    { name: "Dek", value: 32000 },
  ],
};

const SalesReportChart = ({ isAnimationActive = true }) => {
  const [filterType, setFilterType] = useState<"kun" | "oy" | "yil">("kun");
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const activeData = useMemo(
    () => rawData[filterType],
    [filterType, selectedDate]
  );

  const handleDateChange = (date: any) => {
    if (date) setSelectedDate(date);
  };

  return (
    <div className="p-4 bg-white rounded-xl border border-bg-fy w-full max-[500px]:p-2 max-[500px]:rounded-lg">
      <div className="flex items-center justify-between gap-4 mb-6 max-[500px]:flex-col max-[500px]:items-start max-[500px]:gap-3 max-[500px]:mb-4">
        <div className="flex bg-gray-100 p-1 rounded-lg w-fit max-[500px]:w-full">
          {(["kun", "oy", "yil"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all max-[500px]:flex-1 max-[500px]:text-xs ${
                filterType === type
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {type === "kun" ? "Kunlik" : type === "oy" ? "Oylik" : "Yillik"}
            </button>
          ))}
        </div>

        <div className="w-auto max-[500px]:w-full">
          <DatePicker
            picker={
              filterType === "kun"
                ? "date"
                : filterType === "oy"
                ? "month"
                : "year"
            }
            value={selectedDate}
            onChange={handleDateChange}
            allowClear={false}
            className="w-44 h-10 border-gray-200 rounded-lg max-[500px]:w-full max-[500px]:h-9"
          />
        </div>
      </div>

      <div className="h-[350px] w-full max-[500px]:h-[230px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={activeData}
            margin={{
              top: 10,
              right: 5,
              left: -30,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
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
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 10 }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                fontSize: "12px",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#6366f1"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
              animationDuration={800}
              isAnimationActive={isAnimationActive}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default memo(SalesReportChart);

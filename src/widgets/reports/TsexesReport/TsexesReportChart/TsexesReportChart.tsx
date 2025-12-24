import { DatePicker } from "antd";
import dayjs from "dayjs";
import { memo, useEffect, useState } from "react";
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

const data = [
  { name: "Metal", olingan: 45000000, tolovlar: 38000000 },
  { name: "Plastik", olingan: 25000000, tolovlar: 55000000 },
  { name: "Yig'uv", olingan: 60000000, tolovlar: 30000000 },
  { name: "Bo'yoq", olingan: 35000000, tolovlar: 33000000 },
  { name: "Qadoq", olingan: 20000000, tolovlar: 15000000 },
  { name: "Temir", olingan: 48000000, tolovlar: 40000000 },
  { name: "Sifatli", olingan: 30000000, tolovlar: 22000000 },
  { name: "Tayyorlov", olingan: 42000000, tolovlar: 45000000 },
];

const TsexesReportChart = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [filterType, setFilterType] = useState<"oy" | "yil">("oy");
  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 520);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleDateChange = (date: any) => {
    if (date) setSelectedDate(date);
  };

  return (
    <div className="bg-white rounded-xl border border-bg-fy w-full p-4 max-[500px]:p-3">
      <div className="flex flex-col gap-2 mb-5">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-slate-800 max-[500px]:text-[15px]">
            Tsexlar Balans Holati
          </h3>
        </div>

        <div className="flex items-center justify-between gap-3 max-[500px]:flex-col max-[500px]:items-stretch">
          <div className="flex bg-gray-100 p-1 rounded-lg shrink-0">
            {(["oy", "yil"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex-1 min-w-20 ${
                  filterType === type
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
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
            className="border-slate-200 text-slate-700 w-44 h-10 max-[500px]:w-full"
          />
        </div>
      </div>
      <div className="w-full h-[380px] max-[520px]:h-80 overflow-x-auto">
        <div className="min-w-[700px] h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 10,
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
              />
              <Bar
                name="To'lovlar"
                dataKey="tolovlar"
                fill="#94a3b8"
                radius={[4, 4, 0, 0]}
                barSize={isMobile ? 10 : 18}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default memo(TsexesReportChart);

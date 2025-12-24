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
    <div className="bg-white rounded-xl border border-bg-fy w-full p-5">
      <div className="mb-6">
        <div className="flex items-center justify-between gap-4 max-[520px]:flex-col max-[520px]:items-start">
          <h3 className="text-lg font-bold text-slate-800 max-[530px]:text-[15px]">
            Tsexlar Balans Holati
          </h3>

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

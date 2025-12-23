import { DatePicker } from "antd";
import dayjs from "dayjs";
import { memo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

const staticProductData = [
  { name: "Nike Air Jordan", sales: 120 },
  { name: "Adidas Superstar", sales: 98 },
  { name: "Puma Classic", sales: 86 },
  { name: "Reebok Club C", sales: 72 },
  { name: "Nike Dunk Low", sales: 65 },
];

const COLORS = ["#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe", "#e0e7ff"];

const ProductReportChart = () => {
  const [filterType, setFilterType] = useState<"oy" | "yil">("oy");
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateChange = (date: any) => {
    if (date) setSelectedDate(date);
  };

  return (
    <div className="p-4 bg-white rounded-xl border border-bg-fy w-full max-[500px]:p-3">
      <h3 className="text-lg font-bold text-slate-800 mb-6 max-[500px]:text-sm max-[500px]:mb-4">
        Eng ko'p sotilgan mahsulotlar
      </h3>

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

      <div className="h-[300px] w-full max-[500px]:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={staticProductData}
            layout="vertical"
            margin={{ top: 5, right: 45, left: -10, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              width={110}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748b",
                fontSize: 11,
                fontWeight: 600,
              }}
            />
            <Tooltip
              cursor={{ fill: "#f8fafc" }}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                fontSize: "12px",
              }}
              formatter={(value: number) => [`${value} dona`, "Sotilgan"]}
            />
            <Bar dataKey="sales" radius={[0, 4, 4, 0]} barSize={22}>
              <LabelList
                dataKey="sales"
                position="right"
                style={{
                  fill: "#64748b",
                  fontSize: "11px",
                  fontWeight: "bold",
                }}
              />
              {staticProductData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default memo(ProductReportChart);

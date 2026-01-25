import { memo, type FC } from "react";
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
import ProductReportChartSkeleton from "../../../../shared/ui/Skeletons/Reports/ProductsReport/ProductReportChartSkeleton";

interface ProductReportProps {
  data: { name: string; sales: number }[];
  loading: boolean;
}

const COLORS = ["#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe", "#e0e7ff"];

const ProductReportChart: FC<ProductReportProps> = ({ data, loading }) => {
  return (
    <div className="p-4 bg-white rounded-xl border border-bg-fy w-full max-[500px]:p-3">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold text-slate-800 max-[500px]:text-[15px]">
          Eng ko'p sotilgan mahsulotlar
        </h3>
      </div>
      {loading ? (
        <ProductReportChartSkeleton />
      ) : (
        <div className="h-[300px] w-full max-[500px]:h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
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
                formatter={(value: number) => [`${value} ta`, "Sotilgan"]}
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
                {data?.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}{" "}
                )
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default memo(ProductReportChart);

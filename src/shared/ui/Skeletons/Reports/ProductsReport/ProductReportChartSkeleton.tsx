import { memo } from "react";

const ProductReportChartSkeleton = () => {
  return (
    <div className="w-full h-full flex flex-col pt-[5px] pb-[5px] animate-pulse">
      <div className="flex-1 flex flex-col justify-around">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center w-full">
            <div className="w-[110px] flex justify-end pr-[15px] shrink-0">
              <div className="h-[11px] w-16 bg-slate-200 rounded-sm"></div>
            </div>

            <div className="flex-1 flex items-center gap-3">
              <div
                className="h-[22px] bg-slate-100 rounded-r-lg"
                style={{
                  width: `${Math.max(15, 80 - i * 15)}%`,
                  opacity: 1 - i * 0.12,
                }}
              ></div>

              <div className="h-[11px] w-7 bg-slate-100 rounded-sm shrink-0"></div>
            </div>

            <div className="w-[45px] shrink-0"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(ProductReportChartSkeleton);

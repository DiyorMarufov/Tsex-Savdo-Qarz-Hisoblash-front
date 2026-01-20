import { memo } from "react";

const SaleItemReportHeaderSkeleton = () => {
  return (
    <div className="flex justify-between items-center border border-slate-100 bg-[#ffffff] rounded-[12px] p-4 shadow-sm animate-pulse">
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-col gap-2">
          <div className="h-5 w-48 bg-gray-200 rounded-md"></div>

          <div className="flex items-center gap-2">
            <div className="h-[22px] w-20 bg-blue-50/80 rounded-full border border-blue-100/50"></div>
            <div className="h-[22px] w-20 bg-blue-50/80 rounded-full border border-blue-100/50"></div>
          </div>
        </div>

        <div className="h-3.5 w-32 bg-gray-100 rounded"></div>
      </div>

      <div className="flex flex-col items-end bg-blue-50/40 px-4 py-2.5 rounded-[12px] border border-blue-100/40">
        <div className="h-3 w-20 bg-blue-100/60 rounded mb-2"></div>
        <div className="flex items-baseline gap-1">
          <div className="h-7 w-28 bg-blue-200/40 rounded-md"></div>
          <div className="h-4 w-8 bg-blue-200/30 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default memo(SaleItemReportHeaderSkeleton);

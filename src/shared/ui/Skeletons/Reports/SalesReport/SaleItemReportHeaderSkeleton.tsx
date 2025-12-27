import { memo } from "react";

const SaleItemReportHeaderSkeleton = () => {
  return (
    <div className="flex justify-between items-center border border-bg-fy bg-[#ffffff] rounded-[12px] p-4 shadow-sm animate-pulse">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <div className="h-3 w-10 bg-gray-100 rounded"></div>
            <div className="h-[22px] w-24 bg-gray-200 rounded-full"></div>
          </div>
          <div className="h-6 w-40 bg-gray-200 rounded mt-2"></div>
        </div>

        <div className="h-4 w-32 bg-gray-100 rounded mt-1"></div>
      </div>

      <div className="flex flex-col items-end bg-blue-50/50 px-4 py-2 rounded-[12px] border border-blue-100/50">
        <div className="h-3 w-20 bg-blue-100/60 rounded mb-2"></div>
        <div className="h-7 w-36 bg-blue-200/50 rounded-md"></div>
      </div>
    </div>
  );
};

export default memo(SaleItemReportHeaderSkeleton);

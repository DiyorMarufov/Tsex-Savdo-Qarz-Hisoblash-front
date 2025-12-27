import { memo } from "react";

const SaleItemCardReportSkeleton = () => {
  return (
    <div className="mt-4 min-[500px]:hidden flex flex-col gap-5">
      {Array.from({ length: 5 }).map((_, inx: number) => (
        <div
          key={inx}
          className="flex flex-col gap-3 border border-gray-100 bg-[#ffffff] rounded-[12px] overflow-hidden animate-pulse"
        >
          <div className="pt-3 px-3.5">
            <div className="flex flex-col items-start gap-2">
              <div className="h-4 w-20 bg-gray-200 rounded"></div>{" "}
              <div className="h-5 w-3/4 bg-gray-200 rounded"></div>{" "}
            </div>
          </div>

          <div className="flex px-3.5 gap-4">
            <div className="flex flex-col w-1/2 gap-2">
              <div className="h-4 w-12 bg-gray-200 rounded"></div>{" "}
              <div className="h-5 w-16 bg-gray-200 rounded"></div>{" "}
            </div>
            <div className="flex flex-col w-1/2 gap-2">
              <div className="h-4 w-12 bg-gray-200 rounded"></div>{" "}
              <div className="h-5 w-24 bg-gray-200 rounded"></div>{" "}
            </div>
          </div>

          <div className="w-full h-px bg-gray-100"></div>

          <div className="px-3.5 pb-3">
            <div className="flex flex-col gap-2">
              <div className="h-4 w-32 bg-gray-200 rounded"></div>{" "}
              <div className="h-6 w-28 bg-gray-200 rounded"></div>{" "}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(SaleItemCardReportSkeleton);

import { memo } from "react";

const SaleItemCardReportSkeleton = () => {
  return (
    <div className="mt-4 min-[500px]:hidden flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, inx: number) => (
        <div
          key={inx}
          className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px] animate-pulse"
        >
          <div className="flex justify-between px-3.5 py-2.5">
            <div className="flex flex-col gap-2 w-full">
              <div className="h-4 w-16 bg-gray-200 rounded"></div> {/* Brand */}
              <div className="h-5 w-3/4 bg-gray-200 rounded"></div>{" "}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3 px-3.5">
              <div className="flex flex-col gap-2">
                <div className="h-3.5 w-10 bg-gray-100 rounded"></div>
                <div className="h-5 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-3.5 w-20 bg-gray-100 rounded"></div>
                <div className="h-5 w-24 bg-gray-200 rounded"></div>
              </div>
              <div className="flex flex-col gap-2 border-t border-gray-50 pt-2">
                <div className="h-3.5 w-16 bg-gray-100 rounded"></div>
                <div className="h-5 w-20 bg-gray-200 rounded"></div>
              </div>
              <div className="flex flex-col gap-2 border-t border-gray-50 pt-2">
                <div className="h-3.5 w-16 bg-gray-100 rounded"></div>
                <div className="h-5 w-14 bg-gray-200 rounded"></div>
              </div>
            </div>

            <div className="w-full h-px bg-bg-fy mt-1"></div>

            <div className="flex justify-end items-center gap-2 px-3.5 pb-4 pt-1">
              <div className="h-4 w-24 bg-gray-100 rounded"></div>{" "}
              <div className="h-6 w-28 bg-gray-200 rounded"></div>{" "}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(SaleItemCardReportSkeleton);

import { memo } from "react";

const CustomerTransactionDetailCardSkeleton = () => {
  return (
    <div className="min-[500px]:hidden flex flex-col gap-5 mt-4">
      {Array.from({ length: 5 }).map((_, inx: number) => (
        <div
          key={inx}
          className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px] animate-pulse"
        >
          <div className="flex justify-between items-center px-3.5 py-2.5">
            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
            <div className="h-6 bg-gray-200 rounded-full w-24"></div>
          </div>

          <div className="w-full h-px bg-bg-fy"></div>

          <div className="px-3.5 py-2.5 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, subInx) => (
                <div key={subInx} className="flex flex-col gap-2">
                  <div className="h-4 bg-gray-100 rounded w-16"></div>
                  <div className="h-5 bg-gray-200 rounded w-20"></div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <div className="h-4 bg-gray-100 rounded w-12"></div>
              <div className="h-5 bg-gray-200 rounded w-full"></div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="h-4 bg-gray-100 rounded w-24"></div>
              <div className="h-5 bg-gray-200 rounded w-32"></div>
            </div>

            <div className="flex justify-end mt-1 gap-5">
              <div className="h-5 w-5 bg-gray-200 rounded"></div>
              <div className="h-5 w-5 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(CustomerTransactionDetailCardSkeleton);

import { memo } from "react";

const CustomerCardSkeleton = () => {
  return (
    <div className="min-[500px]:hidden flex flex-col gap-5 mt-4">
      {Array.from({ length: 5 }).map((_, inx: number) => (
        <div
          key={inx}
          className="flex flex-col border border-bg-fy bg-white rounded-[12px] overflow-hidden animate-pulse"
        >
          <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-3 px-3.5 py-2.5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="h-3.5 w-12 bg-gray-200 rounded" />
                  <div className="h-4 w-24 bg-gray-100 rounded" />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 pb-2.5 px-3.5 mt-1">
              {[1, 2].map((i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="h-3.5 w-28 bg-gray-200 rounded" />
                  <div className="h-4 w-40 bg-gray-100 rounded" />
                </div>
              ))}
            </div>

            <div className="w-full h-px bg-bg-fy mt-1"></div>

            <div className="flex justify-between items-center px-3.5 py-3">
              <div className="flex items-center gap-5">
                <div className="w-5 h-5 bg-gray-200 rounded" />
                <div className="w-5 h-5 bg-gray-200 rounded" />
              </div>
              <div className="w-24 h-8 bg-gray-200 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(CustomerCardSkeleton);

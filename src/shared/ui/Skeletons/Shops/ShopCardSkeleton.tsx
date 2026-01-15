import { memo } from "react";

const ShopCardSkeleton = () => {
  return (
    <div className="min-[500px]:hidden flex flex-col gap-3 mt-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col border border-gray-200 bg-white rounded-[12px] animate-pulse"
        >
          <div className="px-3.5 py-2.5 flex justify-between">
            <div className="flex flex-col gap-2">
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-3 w-48 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center gap-5">
              <div className="h-7 w-7 bg-gray-200"></div>
              <div className="h-7 w-7 bg-gray-200"></div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-200"></div>

          <div className="px-3.5 py-2.5">
            <div className="h-4 w-58 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}

      <div className="flex justify-center mt-5">
        <div className="h-8 w-64 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export default memo(ShopCardSkeleton);

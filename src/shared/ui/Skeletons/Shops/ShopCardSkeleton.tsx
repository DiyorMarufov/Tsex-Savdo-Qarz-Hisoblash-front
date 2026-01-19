import { memo } from "react";

const ShopCardSkeleton = () => {
  return (
    <div className="min-[500px]:hidden flex flex-col gap-4 mt-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col border border-gray-100 bg-white rounded-2xl p-4 gap-4 animate-pulse"
        >
          <div className="flex justify-between items-start gap-2">
            <div className="flex flex-col gap-2.5 min-w-0">
              <div className="h-5 w-32 bg-gray-200 rounded" />
              <div className="h-4 w-48 bg-gray-100 rounded" />
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <div className="h-9 w-9 bg-gray-100 rounded-lg" />
              <div className="h-9 w-9 bg-gray-100 rounded-lg" />
            </div>
          </div>

          <div className="flex items-center pt-3 border-t border-slate-50">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-100 rounded-full" />
              <div className="h-4 w-40 bg-gray-100 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(ShopCardSkeleton);

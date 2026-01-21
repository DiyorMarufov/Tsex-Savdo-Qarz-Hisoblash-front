import { memo } from "react";

const ProductModelCardSkeleton = () => {
  return (
    <div className="min-[500px]:hidden flex flex-col gap-3 mt-4">
      {Array.from({ length: 5 }).map((_, inx: number) => (
        <div
          key={inx}
          className="bg-white rounded-2xl p-3 flex flex-col min-[385px]:flex-row min-[385px]:items-center gap-4 border border-gray-100 animate-pulse"
        >
          <div className="w-16 h-16 rounded-xl bg-gray-200 shrink-0" />

          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex flex-col gap-1.5">
              <div className="h-2.5 bg-gray-200 rounded w-16" />
              <div className="h-4 bg-gray-200 rounded-md w-3/4" />
            </div>

            <div className="flex items-center gap-2 mt-1">
              <div className="h-3.5 bg-gray-100 rounded w-8" />
              <div className="flex items-center gap-2">
                <div className="h-3 bg-gray-100 rounded w-20" />
                <div className="h-3 bg-gray-100 rounded w-20" />
              </div>
            </div>
          </div>

          <div className="flex flex-row min-[385px]:flex-col items-center min-[385px]:items-end justify-between min-[385px]:justify-start gap-2">
            <div className="h-4 bg-gray-200 rounded w-20" />

            <div className="flex gap-1">
              <div className="w-8 h-8 rounded-lg bg-gray-100" />
              <div className="w-8 h-8 rounded-lg bg-gray-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(ProductModelCardSkeleton);

import { memo } from "react";

const ProductModelCardSkeleton = () => {
  return (
    <div className="min-[500px]:hidden flex flex-col gap-3 mt-4">
      {Array.from({ length: 5 }).map((_, inx: number) => (
        <div
          key={inx}
          className="bg-white rounded-2xl p-3 flex items-center gap-3 border border-gray-100 animate-pulse"
        >
          <div className="w-16 h-16 rounded-xl bg-gray-200 shrink-0" />

          <div className="flex-1 overflow-hidden space-y-2">
            <div className="flex flex-col gap-1.5">
              <div className="h-4 bg-gray-200 rounded-md w-3/4" />
              <div className="h-3 bg-gray-100 rounded-md w-1/4" />
            </div>

            <div className="flex flex-col gap-2 mt-1">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-gray-100 rounded-full" />
                <div className="h-2.5 bg-gray-100 rounded-md w-1/2" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-gray-100 rounded-full" />
                <div className="h-2.5 bg-gray-100 rounded-md w-1/3" />
              </div>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-gray-50 shrink-0" />
        </div>
      ))}
    </div>
  );
};

export default memo(ProductModelCardSkeleton);

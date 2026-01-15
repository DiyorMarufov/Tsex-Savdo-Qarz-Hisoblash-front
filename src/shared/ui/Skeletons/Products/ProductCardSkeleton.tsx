import { memo } from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="min-[500px]:hidden mt-4">
      <div className="grid grid-cols-2 gap-4 max-[330px]:grid-cols-1">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col border border-gray-100 bg-white rounded-2xl p-3 gap-3 animate-pulse"
          >
            <div className="w-full bg-gray-100 rounded-xl h-[130px]"></div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start gap-2">
                <div className="flex flex-col gap-1.5 w-full">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                </div>
                <div className="h-4 w-4 rounded-full bg-gray-200 shrink-0"></div>
              </div>

              <div className="h-5 bg-emerald-50 rounded w-2/3 mt-1"></div>
            </div>

            <div className="w-full h-px bg-slate-50"></div>

            <div className="flex justify-end">
              <div className="h-8 w-20 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(ProductCardSkeleton);

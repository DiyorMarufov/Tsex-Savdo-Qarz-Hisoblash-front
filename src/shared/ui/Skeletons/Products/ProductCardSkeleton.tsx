import { memo } from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="min-[500px]:hidden mt-4">
      <div className="grid grid-cols-2 gap-5 max-[330px]:grid-cols-1">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col border border-gray-200 bg-white rounded-[12px] animate-pulse"
          >
            <div className="p-2.5 flex justify-center items-center">
              <div className="w-full bg-gray-200 rounded-[5px] h-[130px]"></div>
            </div>

            <div className="flex flex-col gap-2 justify-between px-3.5 py-2.5">
              <div className="flex flex-col gap-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="h-4 bg-green-200 rounded w-1/3 mt-1"></div>
            </div>

            <div className="w-full h-px bg-gray-200"></div>

            <div className="mt-1 px-3.5 pt-2 pb-3">
              <div className="flex justify-end">
                <div className="h-8 w-20 bg-blue-400 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(ProductCardSkeleton);

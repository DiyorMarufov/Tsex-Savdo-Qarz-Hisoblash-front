import { memo } from "react";

const SkeletonRow = () => (
  <div className="flex justify-between items-center py-3">
    <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
    <div className="h-4 bg-gray-200 rounded w-1/5 animate-pulse"></div>
  </div>
);

const ProductCardDetailSkeleton = () => {
  return (
    <div className="mx-auto bg-white rounded-[5px] shadow-lg">
      <div className="flex items-center justify-center p-4 border-b relative">
        <div className="h-5 w-5 absolute left-3 bg-gray-200"></div>
        <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
      </div>

      <div className="p-4 lg:p-8">
        <div className="flex max-[1380px]:flex-col gap-8">
          <div className="min-[1380px]:w-1/2 w-full">
            <div className="bg-gray-100 rounded-2xl p-6 flex items-center justify-center min-h-[350px] lg:min-h-[450px]">
              <div className="w-4/5 h-[300px] bg-gray-300 rounded-lg animate-pulse"></div>
            </div>
          </div>

          <div className="min-[1380px]:w-1/2 w-full">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>

            <div className="h-4 bg-gray-200 rounded w-1/3 mb-6 animate-pulse"></div>

            <div className="divide-y divide-gray-100 rounded-xl overflow-hidden border border-gray-100 p-2">
              <div className="flex justify-between items-center py-3">
                <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                <div className="h-4 bg-green-200 rounded w-1/5 animate-pulse"></div>
              </div>
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 px-4 pb-4">
        <div className="h-9 bg-green-300 rounded-md animate-pulse"></div>
        <div className="h-9 bg-red-300 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default memo(ProductCardDetailSkeleton);

import { memo } from "react";

const SkeletonRow = () => (
  <div className="flex justify-between items-center py-3">
    <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
    <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
  </div>
);

const ProductCardDetailSkeleton = () => {
  return (
    <div className="mx-auto bg-white rounded-[5px]">
      <div className="flex items-center px-3 gap-12 h-12 border-b bg-white">
        <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-5 bg-gray-200 rounded w-48 animate-pulse"></div>
      </div>

      <div className="p-4 lg:p-8">
        <div className="flex max-[1380px]:flex-col gap-3">
          <div className="min-[1380px]:w-1/2">
            <div className="bg-gray-50 rounded-2xl p-6 flex items-center justify-center h-full min-h-[350px] lg:min-h-[450px]">
              <div className="w-full h-[300px] bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>

          <div className="min-[1380px]:w-1/2">
            <div className="flex justify-between items-start mb-4">
              <div className="w-full">
                <div className="h-7 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              </div>

              <div className="flex gap-2">
                <div className="h-9 w-9 bg-gray-100 rounded-lg animate-pulse"></div>
                <div className="h-9 w-9 bg-gray-100 rounded-lg animate-pulse"></div>
              </div>
            </div>

            <div className="divide-y rounded-xl overflow-hidden border-t">
              <div className="flex justify-between items-center py-3">
                <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                <div className="h-5 bg-green-200 rounded w-1/4 animate-pulse"></div>
              </div>
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
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
    </div>
  );
};

export default memo(ProductCardDetailSkeleton);

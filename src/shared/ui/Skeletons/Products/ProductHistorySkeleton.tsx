import { memo } from "react";

const ProductHistorySkeleton = () => {
  return (
    <div className="animate-pulse flex justify-between items-center py-3 border-b last:border-0 border-gray-100">
      <div className="flex flex-col gap-2">
        <div className="h-5 w-32 bg-gray-200 rounded-md"></div>
        <div className="h-3 w-24 bg-gray-100 rounded-md"></div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="h-3 w-12 bg-gray-50 rounded-md"></div>
        <div className="h-4 w-28 bg-gray-100 rounded-md"></div>
      </div>
    </div>
  );
};

export default memo(ProductHistorySkeleton);

import { memo } from "react";

const NameSkeleton = () => {
  return (
    <div className="animate-pulse flex items-center">
      <div className="h-7 bg-gray-200 rounded-lg w-[300px] max-[500px]:w-[200px]"></div>

      <div className="ml-2 h-7 bg-gray-100 rounded-lg w-[120px] max-[500px]:hidden"></div>
    </div>
  );
};

export default memo(NameSkeleton);

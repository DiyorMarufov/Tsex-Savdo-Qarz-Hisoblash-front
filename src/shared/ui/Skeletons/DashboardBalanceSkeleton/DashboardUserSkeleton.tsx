import { memo } from "react";

const DashboardUserSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 px-5 py-4 bg-[#ffffff] rounded-2xl border border-[#E2E8F0] animate-pulse">
      <span className="h-6 w-2/5 bg-gray-200 rounded-lg"></span>

      <div className="flex flex-col gap-3 overflow-y-hidden h-[150px]">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex justify-between">
            <span className="h-4 w-1/3 bg-gray-200 rounded"></span>

            <span className="h-4 w-1/4 bg-red-100 rounded"></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(DashboardUserSkeleton);

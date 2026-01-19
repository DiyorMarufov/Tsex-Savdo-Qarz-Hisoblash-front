import { memo } from "react";

const DashboardBalanceSkeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-4 max-[1350px]:grid-cols-3 max-[1100px]:grid-cols-2 max-[380px]:grid-cols-1">
      {Array.from({ length: 4 }).map((_, inx: number) => (
        <div
          key={inx}
          className="border border-[#E2E8F0] bg-[#ffffff] rounded-2xl flex flex-col py-[25px] px-[25px] max-[560px]:px-[15px] animate-pulse"
        >
          <div className="h-5 w-2/3 bg-gray-200 rounded mb-4 max-[560px]:w-3/4"></div>
          <div className="h-9 w-1/2 bg-gray-300 rounded mb-4 max-[560px]:w-2/3 max-[560px]:h-7 max-[480px]:h-6"></div>
        </div>
      ))}
    </div>
  );
};

export default memo(DashboardBalanceSkeleton);

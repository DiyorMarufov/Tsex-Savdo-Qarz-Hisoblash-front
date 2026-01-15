import { memo } from "react";

const UserCardSkeleton = () => {
  return (
    <div className="min-[500px]:hidden flex flex-col gap-3 mt-4">
      {Array.from({ length: 5 }).map((_, inx: number) => (
        <div
          key={inx}
          className="flex flex-col border border-gray-100 bg-[#ffffff] rounded-[12px] animate-pulse"
        >
          <div className="flex justify-between px-3.5 py-2.5">
            <div className="flex flex-col gap-2">
              <div className="h-5 w-32 bg-gray-200 rounded-md"></div>
              <div className="h-4 w-24 bg-gray-100 rounded-md"></div>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-100"></div>

          <div className="flex flex-col px-3.5 py-2.5 gap-3">
            <div className="flex justify-between items-center">
              <div className="h-4 w-12 bg-gray-100 rounded"></div>
              <div className="h-5 w-20 bg-gray-200 rounded"></div>
            </div>

            <div className="flex justify-between items-center">
              <div className="h-4 w-16 bg-gray-100 rounded"></div>
              <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
            </div>

            <div className="flex justify-between items-center">
              <div className="h-4 w-24 bg-gray-100 rounded"></div>
              <div className="h-5 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(UserCardSkeleton);

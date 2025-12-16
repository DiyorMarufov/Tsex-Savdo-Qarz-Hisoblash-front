import { memo } from "react";
// Skeleton importi olib tashlandi

const TsexDataCardSkeleton = () => {
  return (
    <div className="min-[500px]:hidden flex flex-col gap-5 mt-4">
      {Array.from({ length: 5 }).map((_, inx: number) => (
        <div
          key={inx}
          className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px] animate-pulse"
        >
          <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-3 px-3.5 py-2.5">
              <div className="flex flex-col justify-start">
                <span className="text-[15px] font-medium text-[#6B7280]">
                  Nomi
                </span>
                <div className="h-5 w-24 bg-gray-200 rounded"></div>
              </div>

              <div className="flex flex-col justify-start">
                <span className="text-[15px] font-medium text-[#6B7280]">
                  Tsex Manager
                </span>
                <div className="h-5 w-32 bg-gray-200 rounded"></div>
              </div>

              <div className="flex flex-col justify-start">
                <span className="text-[15px] font-medium text-[#6B7280] whitespace-nowrap">
                  Balansi
                </span>
                <div className="h-5 w-20 bg-gray-200 rounded"></div>
              </div>
            </div>

            <div className="flex flex-col gap-3 pb-2.5 mt-2">
              <div className="flex flex-col px-3.5">
                <div>
                  <span className="font-medium text-[#6B7280] text-[15px]">
                    Oxirgi operatsiya
                  </span>
                </div>
                <div className="h-5 w-[90%] bg-gray-200 rounded"></div>
              </div>

              <div className="flex flex-col px-3.5">
                <div>
                  <span className="font-medium text-[#6B7280] text-[15px]">
                    Kiritilgan sana
                  </span>
                </div>
                <div className="h-5 w-32 bg-gray-200 rounded"></div>
              </div>
            </div>

            <div className="w-full h-px bg-bg-fy"></div>

            <div className="flex justify-between mt-1 px-3.5 pt-2 pb-3">
              <div className="flex items-center gap-5">
                <div className="w-6 h-6 bg-gray-300 rounded cursor-pointer"></div>
              </div>
              <div>
                <div className="h-10 w-24 bg-gray-300 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(TsexDataCardSkeleton);

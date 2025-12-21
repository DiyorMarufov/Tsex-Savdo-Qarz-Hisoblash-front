import { memo } from "react";

const TsexTransactionCardSkeleton = () => {
  const baseClass = "bg-gray-200 rounded";
  const pulseClass = "animate-pulse";

  return (
    <div className="min-[500px]:hidden flex flex-col gap-5 mt-4">
      {Array.from({ length: 5 }).map((_, inx: number) => (
        <div
          key={inx}
          className={`flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px] overflow-hidden ${pulseClass}`}
        >
          <div className="px-3.5 py-2.5 flex justify-between items-center">
            <div className={`${baseClass} w-2/5 h-5`}></div>
            <div className={`${baseClass} w-1/5 h-5 rounded-full`}></div>
          </div>

          <div className="w-full h-px bg-bg-fy"></div>

          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3 px-3.5 py-2.5">
              <div className="flex flex-col w-1/2 justify-start">
                <div className={`${baseClass} w-3/4 h-4 mb-1`}></div>{" "}
                <div className={`${baseClass} w-4/5 h-6`}></div>{" "}
              </div>

              <div className="flex flex-col items-end">
                <div className={`${baseClass} w-4/5 h-4 mb-1`}></div>{" "}
                <div className={`${baseClass} w-3/5 h-6`}></div>{" "}
              </div>

              <div className="flex flex-col col-span-2">
                <div className={`${baseClass} w-1/4 h-4 mb-1`}></div>{" "}
                <div className={`${baseClass} w-full h-5 mb-1`}></div>{" "}
                <div className={`${baseClass} w-4/5 h-5`}></div>{" "}
              </div>
            </div>

            <div className="flex justify-between items-center bg-bg-ty px-3.5">
              <div className="py-2 flex flex-col gap-1">
                <div className={`${baseClass} w-28 h-4`}></div>{" "}
                <div className={`${baseClass} w-36 h-4`}></div> {/* Sana */}
              </div>

              <div className={`${baseClass} w-6 h-6 rounded-full`}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(TsexTransactionCardSkeleton);

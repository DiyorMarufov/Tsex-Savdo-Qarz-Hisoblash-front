import { memo } from "react";

const TsexTransactionCardSkeleton = () => {
  const pulseClass = "animate-pulse";

  return (
    <div className="min-[500px]:hidden flex flex-col gap-4 mt-4">
      {Array.from({ length: 5 }).map((_, inx: number) => (
        <div
          key={inx}
          className={`flex flex-col border border-gray-100 bg-white rounded-2xl p-4 gap-4 ${pulseClass}`}
        >
          <div className="flex justify-between items-start gap-2">
            <div className="flex flex-col gap-2 min-w-0">
              <div className="h-5 w-32 bg-gray-200 rounded" />
              <div className="h-4 w-24 bg-gray-100 rounded" />
            </div>

            <div className="flex flex-col items-end shrink-0 gap-2">
              <div className="h-5 w-28 bg-gray-200 rounded" />
              <div className="h-4 w-20 bg-gray-100 rounded-full" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-100 rounded-full" />
              <div className="h-4 w-40 bg-gray-100 rounded" />
            </div>

            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-100 rounded-sm" />
              <div className="h-4 w-full bg-gray-50 rounded" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-50">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-100 rounded-full" />
              <div className="h-4 w-24 bg-gray-50 rounded" />
            </div>

            <div className="h-8 w-8 bg-gray-100 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(TsexTransactionCardSkeleton);

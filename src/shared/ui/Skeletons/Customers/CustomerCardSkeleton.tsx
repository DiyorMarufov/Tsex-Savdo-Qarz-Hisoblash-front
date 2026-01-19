import { memo } from "react";

const CustomerCardSkeleton = () => {
  return (
    <div className="min-[500px]:hidden flex flex-col gap-4 mt-4">
      {Array.from({ length: 5 }).map((_, inx: number) => (
        <div
          key={inx}
          className="flex flex-col border border-gray-100 bg-white rounded-2xl p-4 gap-3 animate-pulse"
        >
          <div className="flex justify-between items-start gap-2">
            <div className="flex flex-col gap-2 min-w-0">
              <div className="h-5 w-32 bg-gray-200 rounded" />
              <div className="h-4 w-24 bg-gray-100 rounded" />
            </div>

            <div className="flex flex-col items-end shrink-0 gap-2">
              <div className="h-5 w-24 bg-gray-200 rounded" />
              <div className="h-3 w-10 bg-gray-100 rounded" />
            </div>
          </div>

          <div className="flex flex-col gap-3 bg-slate-50/50 p-3 rounded-xl border border-slate-100/50">
            <div className="h-4 w-36 bg-gray-200 rounded" />
            <div className="h-3.5 w-44 bg-gray-100 rounded" />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg" />
              <div className="w-8 h-8 bg-gray-100 rounded-lg" />
            </div>

            <div className="flex items-center gap-3">
              <div className="h-3 w-16 bg-gray-50 rounded" />
              <div className="w-20 h-8 bg-gray-200 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(CustomerCardSkeleton);

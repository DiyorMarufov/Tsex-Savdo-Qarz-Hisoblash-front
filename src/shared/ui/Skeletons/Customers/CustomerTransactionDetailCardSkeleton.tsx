import { memo } from "react";

const CustomerTransactionDetailCardSkeleton = () => {
  return (
    <div className="min-[500px]:hidden flex flex-col gap-4 mt-4">
      {Array.from({ length: 5 }).map((_, inx: number) => (
        <div
          key={inx}
          className="flex flex-col border border-gray-100 bg-white rounded-2xl p-4 gap-4 animate-pulse"
        >
          <div className="flex justify-between items-start gap-2">
            <div className="flex flex-col gap-2 min-w-0">
              <div className="h-5 bg-gray-200 rounded w-32"></div>
              <div className="h-4 bg-gray-100 rounded w-20"></div>
            </div>
            <div className="flex flex-col items-end shrink-0 gap-2">
              <div className="h-6 bg-gray-200 rounded w-24"></div>
              <div className="h-3 bg-gray-100 rounded w-12"></div>
            </div>
          </div>

          <div className="flex flex-col gap-3 bg-slate-50/50 p-3 rounded-xl border border-slate-100/50">
            <div className="h-4 bg-gray-200 rounded w-40"></div>
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-100 rounded w-28"></div>
              <div className="h-4 bg-gray-100 rounded w-16"></div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-1">
            <div className="h-4 w-4 bg-gray-100 rounded shrink-0"></div>
            <div className="h-4 bg-gray-100 rounded w-full"></div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-50">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gray-100 rounded-lg"></div>
              <div className="h-8 w-8 bg-gray-100 rounded-lg"></div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-4 bg-gray-50 rounded w-20"></div>
              <div className="h-8 bg-gray-200 rounded-xl w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(CustomerTransactionDetailCardSkeleton);

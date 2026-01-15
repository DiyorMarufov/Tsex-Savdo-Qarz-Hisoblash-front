import { memo } from "react";

const SaleReportCardSkeleton = () => {
  return (
    <div className="min-[500px]:hidden flex flex-col gap-3">
      {Array.from({ length: 5 }).map((_, inx: number) => (
        <div
          key={inx}
          className="flex flex-col border border-gray-100 bg-white rounded-2xl p-4 gap-3 animate-pulse"
        >
          <div className="flex justify-between items-start gap-2">
            <div className="flex gap-3 min-w-0">
              <div className="w-12 h-12 bg-slate-200 rounded-xl shrink-0" />

              <div className="flex flex-col gap-2 min-w-0">
                <div className="h-4 w-32 bg-slate-200 rounded" />
                <div className="h-3.5 w-24 bg-slate-100 rounded" />
              </div>
            </div>

            <div className="flex flex-col items-end shrink-0 gap-2">
              <div className="h-5 w-24 bg-slate-200 rounded" />
              <div className="h-4 w-16 bg-slate-100 rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-3 rounded-xl border border-slate-100/50">
            <div className="flex flex-col gap-2">
              <div className="h-3 w-14 bg-slate-100 rounded" />
              <div className="h-4 w-20 bg-slate-200 rounded" />
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="h-3 w-10 bg-slate-100 rounded" />
              <div className="h-4 w-20 bg-slate-200 rounded" />
            </div>
          </div>

          <div className="flex flex-col gap-2.5 px-1">
            <div className="h-3.5 w-40 bg-slate-100 rounded" />
            <div className="h-3.5 w-48 bg-slate-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(SaleReportCardSkeleton);

import { memo } from "react";

const SaleReportCardSkeleton = () => {
  return (
    <div className="min-[500px]:hidden flex flex-col gap-5">
      {Array.from({ length: 5 }).map((_, inx: number) => (
        <div
          key={inx}
          className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px] overflow-hidden"
        >
          <div className="flex justify-between px-3.5 py-2.5">
            <div className="flex gap-3">
              <div className="w-[50px] h-[50px] shrink-0 bg-slate-200 rounded-[10px] animate-pulse" />

              <div className="flex flex-col gap-1">
                <div className="h-4 w-20 bg-slate-100 rounded animate-pulse" />
                <div className="h-5 w-32 bg-slate-200 rounded animate-pulse" />
              </div>
            </div>

            <div className="flex items-start">
              <div className="h-6 w-24 bg-slate-100 rounded-full animate-pulse" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3 px-3.5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="h-3.5 w-16 bg-slate-100 rounded animate-pulse" />
                  <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-1.5 px-3.5">
              <div className="h-3.5 w-24 bg-slate-100 rounded animate-pulse" />
              <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
            </div>

            <div className="w-full h-px bg-bg-fy"></div>

            <div className="flex justify-end px-3.5 pb-3">
              <div className="h-8 w-24 bg-slate-200 rounded-md animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(SaleReportCardSkeleton);

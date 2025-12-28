import { memo } from "react";

const ProductReportCardSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-5 max-[1250px]:grid-cols-2 max-[500px]:grid-cols-1">
      {Array.from({ length: 2 }).map((_, inx: number) => (
        <div
          key={inx}
          className="border border-bg-fy bg-white rounded-2xl p-7 flex flex-col gap-1 animate-pulse max-[500px]:items-center"
        >
          <div className="h-7 w-3/4 bg-slate-200 rounded-md mb-2"></div>
          <div className="flex flex-col gap-2 max-[500px]:items-center">
            <div className="h-9 w-1/2 bg-slate-200 rounded-md"></div>
            <div className="h-4 w-1/3 bg-slate-100 rounded-md mt-1"></div>
          </div>
        </div>
      ))}

      <div className="border border-bg-fy bg-white rounded-2xl p-7 flex flex-col gap-1 animate-pulse max-[500px]:items-center">
        <div className="h-7 w-3/4 bg-slate-200 rounded-md mb-2"></div>
        <div className="h-9 w-1/2 bg-slate-200 rounded-md"></div>
      </div>
    </div>
  );
};

export default memo(ProductReportCardSkeleton);

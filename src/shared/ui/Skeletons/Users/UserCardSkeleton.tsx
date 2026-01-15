import { memo } from "react";

const UserCardSkeleton = () => {
  return (
    <div className="min-[500px]:hidden flex flex-col gap-3 mt-4">
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

            <div className="flex items-center gap-1 shrink-0">
              <div className="h-9 w-9 bg-gray-100 rounded-lg" />
              <div className="h-9 w-9 bg-gray-100 rounded-lg" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-3 rounded-xl border border-slate-100/50">
            <div className="flex flex-col gap-2">
              <div className="h-3 w-10 bg-gray-100 rounded" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="h-3 w-14 bg-gray-100 rounded" />
              <div className="h-5 w-16 bg-gray-200 rounded-full" />
            </div>
          </div>

          <div className="flex items-center pt-1">
            <div className="h-4 w-40 bg-gray-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(UserCardSkeleton);

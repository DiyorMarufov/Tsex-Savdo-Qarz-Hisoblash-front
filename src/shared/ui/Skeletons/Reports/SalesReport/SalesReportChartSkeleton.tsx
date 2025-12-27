import { memo } from "react";

const SalesReportChartSkeleton = () => {
  return (
    <div className="h-[350px] w-full max-[500px]:h-[250px] relative overflow-hidden bg-white rounded-lg">
      <div className="absolute left-0 top-10 bottom-8 w-[35px] flex flex-col justify-between items-start">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-2.5 w-6 bg-emerald-50 rounded animate-pulse"
          />
        ))}
      </div>

      <div className="absolute right-0 top-10 bottom-8 w-[30px] flex flex-col justify-between items-end">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-2.5 w-5 bg-indigo-50 rounded animate-pulse"
          />
        ))}
      </div>

      <div className="absolute left-10 right-[35px] top-10 bottom-8 flex flex-col justify-between">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="w-full border-b border-slate-50" />
        ))}
      </div>

      <div className="absolute left-10 right-[35px] top-10 bottom-8 overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 350"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="skelSumma" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity="0.2" />
              <stop offset="95%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="skelSoni" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity="0.2" />
              <stop offset="95%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d="M0 200 Q 200 150, 400 250 T 700 100 T 1000 150 V 350 H 0 Z"
            fill="url(#skelSumma)"
            className="animate-pulse"
          />

          <path
            d="M0 280 Q 250 220, 500 260 T 800 180 T 1000 220 V 350 H 0 Z"
            fill="url(#skelSoni)"
            className="animate-pulse"
          />
        </svg>
      </div>

      <div className="absolute bottom-0 left-10 right-[35px] flex justify-between px-1">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="h-2 w-8 bg-slate-100 rounded animate-pulse" />
        ))}
      </div>
    </div>
  );
};

export default memo(SalesReportChartSkeleton);

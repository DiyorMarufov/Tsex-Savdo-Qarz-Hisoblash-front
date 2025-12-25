import { memo } from "react";

const SalesReportChartSkeleton = () => {
  return (
    <div className="p-4 bg-white rounded-xl border border-bg-fy w-full max-[500px]:p-3">
      <div className="flex flex-col gap-2 mb-5">
        <div className="h-6 w-40 bg-gray-100 rounded-md animate-pulse mb-2" />

        <div className="flex items-center justify-between gap-3 max-[500px]:flex-col max-[500px]:items-stretch">
          <div className="flex bg-gray-50 p-1 rounded-lg shrink-0 w-64 h-10 animate-pulse" />
          <div className="h-10 w-44 bg-gray-50 rounded-lg animate-pulse max-[500px]:w-full" />
        </div>
      </div>

      <div className="h-[350px] w-full max-[500px]:h-[250px] relative overflow-hidden bg-slate-50/30 rounded-lg border border-slate-50">
        <div className="absolute inset-0 flex flex-col justify-between py-6 px-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-full border-b border-slate-100" />
          ))}
        </div>

        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 300 Q 100 250, 200 280 T 400 150 T 600 200 T 800 100 T 1000 180 V 350 H 0 Z"
            fill="url(#skeletonGradientGreen)"
            className="animate-pulse"
            style={{ opacity: 0.3 }}
          />
          <path
            d="M0 300 Q 100 250, 200 280 T 400 150 T 600 200 T 800 100 T 1000 180"
            stroke="#10b981"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
            style={{ opacity: 0.2 }}
          />

          <path
            d="M0 320 Q 150 280, 300 300 T 500 220 T 750 260 T 1000 200 V 350 H 0 Z"
            fill="url(#skeletonGradientIndigo)"
            className="animate-pulse"
            style={{ opacity: 0.2 }}
          />

          <defs>
            <linearGradient
              id="skeletonGradientGreen"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient
              id="skeletonGradientIndigo"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute bottom-2 w-full flex justify-between px-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-2 w-10 bg-slate-200 rounded animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(SalesReportChartSkeleton);

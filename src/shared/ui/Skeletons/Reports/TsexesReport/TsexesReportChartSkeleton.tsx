import { memo } from "react";

const TsexesReportChartSkeleton = () => {
  return (
    <div className="bg-white w-full p-4 max-[500px]:p-3 animate-pulse">
      <div className="w-full h-[300px] flex items-end justify-between gap-4 px-2">
        {Array.from({ length: 8 }).map((_, inx) => (
          <div
            key={inx}
            className="flex-1 flex flex-col items-center gap-2 h-full justify-end"
          >
            <div className="flex gap-1 items-end w-full justify-center h-full">
              <div
                className="bg-gray-200 rounded-t w-full max-w-[18px]"
                style={{ height: `${Math.floor(Math.random() * 60) + 20}%` }}
              ></div>
              <div
                className="bg-gray-100 rounded-t w-full max-w-[18px]"
                style={{ height: `${Math.floor(Math.random() * 40) + 10}%` }}
              ></div>
            </div>
            <div className="h-3 bg-gray-100 rounded w-full mt-2"></div>
          </div>
        ))}
      </div>

      <div className="absolute top-14 right-4 flex gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
          <div className="w-12 h-3 bg-gray-100 rounded"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
          <div className="w-12 h-3 bg-gray-100 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default memo(TsexesReportChartSkeleton);

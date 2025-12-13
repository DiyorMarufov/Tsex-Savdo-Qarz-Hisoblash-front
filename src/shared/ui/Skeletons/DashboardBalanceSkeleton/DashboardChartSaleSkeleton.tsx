import { memo } from "react";

const DashboardChartSaleSkeleton = () => {
  return (
    <div className="w-full h-[500px] px-4 py-2 flex flex-col justify-end animate-pulse">
      <div className="grow flex items-end">
        <div className="flex flex-col justify-around h-[85%] w-[30px] pr-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-3 w-4/5 bg-gray-200 rounded my-1"></div>
          ))}
        </div>

        <div className="h-[85%] w-[95%] bg-gray-200 rounded-lg shadow-inner flex items-end justify-between p-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-[10%] bg-gray-300 rounded-t-lg opacity-70"
              style={{ height: `${20 + ((i * 10) % 60)}%` }}
            ></div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-2 ml-10 w-[90%]">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-4 w-10 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  );
};

export default memo(DashboardChartSaleSkeleton);

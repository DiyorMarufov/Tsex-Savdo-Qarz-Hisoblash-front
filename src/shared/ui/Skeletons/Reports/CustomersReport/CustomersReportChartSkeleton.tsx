import { memo } from "react";

const CustomersReportChartSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="bg-white rounded-[12px] border border-gray-100 p-4">
        <div className="flex bg-gray-50 p-1 rounded-xl w-full min-[900px]:max-w-[300px] mb-6">
          <div className="h-8 flex-1 bg-gray-200 rounded-lg"></div>
          <div className="h-8 flex-1 bg-transparent rounded-lg"></div>
        </div>

        <div className="flex flex-col min-[900px]:flex-row items-center min-[850px]:p-6 gap-6 min-[850px]:gap-12">
          <div className="relative w-[230px] h-[230px] shrink-0 flex items-center justify-center">
            <div className="w-full h-full rounded-full border-15 border-gray-100 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="h-6 w-24 bg-gray-200 rounded-md"></div>
                <div className="h-3 w-12 bg-gray-100 rounded-md"></div>
              </div>
            </div>
          </div>

          <div className="w-full flex-1">
            <div className="grid grid-cols-1 gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50/50 border border-transparent"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-gray-200 shrink-0" />
                    <div className="flex flex-col gap-2">
                      <div className="h-4 w-32 bg-gray-200 rounded-md"></div>
                      <div className="h-3 w-16 bg-gray-100 rounded-md"></div>
                    </div>
                  </div>
                  <div className="h-5 w-20 bg-gray-200 rounded-md"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CustomersReportChartSkeleton);

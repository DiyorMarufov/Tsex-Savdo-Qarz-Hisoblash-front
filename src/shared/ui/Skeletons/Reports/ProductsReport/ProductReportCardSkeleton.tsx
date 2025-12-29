import { memo } from "react";

const ProductReportCardSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-5 max-[1250px]:grid-cols-2 max-[500px]:grid-cols-1">
      {Array.from({ length: 2 }).map((_, inx: number) => (
        <div
          key={inx}
          className="border border-bg-fy bg-[#ffffff] rounded-2xl p-7 flex flex-col gap-1 max-[500px]:items-center"
        >
          <div className="animate-pulse w-full flex flex-col max-[500px]:items-center">
            <div className="h-6 bg-gray-200 rounded-lg w-[150px] max-[900px]:h-5 max-[500px]:h-4 max-[500px]:w-[120px]"></div>
          </div>

          <div className="animate-pulse mt-2 w-full flex flex-col max-[500px]:items-center gap-1">
            <div className="h-9 bg-gray-300 rounded-lg w-full max-w-[250px] max-[900px]:h-7 max-[500px]:h-6 max-[500px]:w-[180px]"></div>

            <div className="h-5 bg-gray-200 rounded-lg w-[120px] mt-1 max-[900px]:h-4 max-[500px]:w-[100px]"></div>
          </div>
        </div>
      ))}

      <div
        className="border border-bg-fy bg-[#ffffff] rounded-2xl p-7 flex flex-col gap-1 
        max-[1250px]:col-span-2 max-[1250px]:items-center 
        max-[500px]:col-span-1 max-[500px]:items-center"
      >
        <div className="animate-pulse w-full flex flex-col max-[1250px]:items-center max-[500px]:items-center">
          <div className="h-6 bg-gray-200 rounded-lg w-[150px] max-[900px]:h-5 max-[500px]:h-4 max-[500px]:w-[120px]"></div>
        </div>

        <div className="animate-pulse mt-2 w-full flex flex-col max-[1250px]:items-center max-[500px]:items-center">
          <div className="h-9 bg-gray-300 rounded-lg w-full max-w-[250px] max-[900px]:h-7 max-[500px]:h-6 max-[500px]:w-[180px]"></div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductReportCardSkeleton);

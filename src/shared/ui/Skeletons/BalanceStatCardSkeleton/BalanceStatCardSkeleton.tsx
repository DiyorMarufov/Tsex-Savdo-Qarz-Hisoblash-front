import { memo, type FC } from "react";

interface Props {
  descriptionIndexes?: number[];
  count?: number;
}

const StatCardSkeleton: FC<Props> = ({ descriptionIndexes, count = 3 }) => {
  return (
    <div className="grid grid-cols-3 gap-5 max-[1250px]:grid-cols-2 max-[500px]:grid-cols-1">
      {Array.from({ length: count }).map((_, inx: number) => {
        const hasDescription = descriptionIndexes?.includes(inx);
        const isLast = inx === count - 1;

        return (
          <div
            key={inx}
            className={`border border-bg-fy bg-[#ffffff] rounded-2xl p-7 flex flex-col gap-1 
              ${
                isLast
                  ? "max-[1250px]:col-span-2 max-[1250px]:items-center max-[500px]:col-span-1"
                  : ""
              } 
              max-[500px]:items-center`}
          >
            <div
              className={`animate-pulse w-full flex flex-col ${
                isLast ? "max-[1250px]:items-center" : ""
              } max-[500px]:items-center`}
            >
              <div className="h-6 bg-gray-200 rounded-lg w-[150px] max-[900px]:h-5 max-[500px]:h-4 max-[500px]:w-[120px]"></div>
            </div>

            <div
              className={`animate-pulse mt-2 w-full flex flex-col ${
                isLast ? "max-[1250px]:items-center" : ""
              } max-[500px]:items-center gap-1`}
            >
              <div className="h-9 bg-gray-300 rounded-lg w-full max-w-[250px] max-[900px]:h-7 max-[500px]:h-6 max-[500px]:w-[180px]"></div>

              {hasDescription ? (
                <div className="h-5 bg-gray-200 rounded-lg w-[120px] mt-1 max-[900px]:h-4 max-[500px]:w-[100px]"></div>
              ) : (
                <div className="h-5 mt-1 max-[900px]:h-4"></div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(StatCardSkeleton);

import { memo, type FC } from "react";
import CountUp from "react-countup";

interface Props {
  title: string;
  value: number;
  isValueNegative?: boolean;
  isColSpan?: boolean;
  suffix?: string;
  description?: string;
}

const StatCard: FC<Props> = ({
  title,
  value = 0,
  isValueNegative = false,
  isColSpan = false,
  suffix = " UZS",
  description = "",
}) => {
  return (
    <div
      className={`border border-bg-fy bg-[#ffffff] rounded-2xl p-7 flex flex-col gap-1 max-[500px]:items-center ${
        isColSpan
          ? "max-[1250px]:col-span-2 max-[1250px]:items-center max-[500px]:col-span-1"
          : ""
      }`}
    >
      <span className="text-[22px] font-medium text-bg-py max-[900px]:text-[20px] max-[500px]:text-[17px]">
        {title}
      </span>
      <span
        className={`font-bold text-[30px] ${
          isValueNegative ? "text-red-500" : "text-green-500"
        } max-[900px]:text-[25px] max-[500px]:text-[22px]`}
      >
        <CountUp
          start={0}
          end={value}
          duration={2.5}
          separator=","
          decimal="."
          suffix={suffix}
        />
      </span>
      {description && (
        <span className="text-gray-500 text-sm max-[500px]:text-xs">
          {description}
        </span>
      )}
    </div>
  );
};

export default memo(StatCard);

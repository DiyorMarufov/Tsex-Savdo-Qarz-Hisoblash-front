import { memo, type FC } from "react";
import CountUp from "react-countup";

interface Props {
  title: string;
  value: number;
  isValueNegative?: boolean;
}

const TsexesStatCard: FC<Props> = ({
  title,
  value,
  isValueNegative = false,
}) => {
  return (
    <div className="border border-bg-fy bg-[#ffffff] rounded-2xl p-7 flex flex-col gap-1 max-[500px]:items-center">
      <span className="text-[22px] font-medium text-bg-py max-[900px]:text-[20px] max-[500px]:text-[17px]">
        {title}
      </span>
      <span
        className={`font-bold text-[30px] ${
          isValueNegative ? "text-red-500" : "text-green-500"
        } max-[900px]:text-[25px] max-[500px]:text-[22px]`}
      >
        {isValueNegative ? "-" : null}
        <CountUp
          start={0}
          end={value}
          duration={2.5}
          separator=","
          decimal="."
          suffix=" UZS"
        />
      </span>
    </div>
  );
};

export default memo(TsexesStatCard);

import { memo } from "react";
import CountUp from "react-countup";
import { getUnitOfMeasurement } from "../../../shared/lib/functions/getUnitOfMeasurement";

interface StatCardProps {
  title: string;
  value: number;
  rawValue: string;
  suffix: string;
  isValueNegative?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  rawValue,
  suffix,
  isValueNegative = false,
}) => {
  const valueColor = isValueNegative ? "text-red-500" : "text-green-500";
  return (
    <div className="border border-[#E2E8F0] bg-[#ffffff] rounded-2xl flex flex-col py-[25px] px-[25px] max-[560px]:px-[15px]">
      <span className="text-[19px] font-medium text-[#6B7280] max-[560px]:text-[17px] max-[480px]:text-[16px]">
        {title}
      </span>

      <span
        className={`text-[32px] font-bold ${valueColor} max-[560px]:text-[25px] max-[480px]:text-[20px]`}
      >
        {isValueNegative ? "-" : null}
        <CountUp
          start={0}
          end={value}
          duration={2.5}
          separator=" "
          decimal="."
          decimals={1}
          suffix={`${getUnitOfMeasurement(rawValue)} ${suffix}`}
        />
      </span>
    </div>
  );
};

export default memo(StatCard);

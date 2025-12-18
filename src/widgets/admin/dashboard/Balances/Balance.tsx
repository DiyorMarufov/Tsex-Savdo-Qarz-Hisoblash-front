import { ArrowUp } from "lucide-react";
import { memo } from "react";
import CountUp from "react-countup";

const AdminBalances = () => {
  return (
    <div className="grid grid-cols-4 gap-6 max-[1350px]:grid-cols-3 max-[1070px]:grid-cols-2 max-[365px]:grid-cols-1">
      <div className="border border-[#E2E8F0] bg-[#ffffff] rounded-2xl flex flex-col py-[25px] px-[25px] max-[560px]:px-[15px]">
        <span className="text-[19px] font-medium text-[#6B7280] max-[560px]:text-[17px] max-[480px]:text-[16px]">
          Umumiy Savdo
        </span>
        <span className="text-[32px] font-bold text-bg-py max-[560px]:text-[25px] max-[480px]:text-[20px]">
          <CountUp
            start={0}
            end={125.4}
            duration={2.5}
            separator=" "
            decimal="."
            decimals={1}
            suffix="M UZS"
          />
        </span>
        <span className="flex items-center text-green-500">
          <ArrowUp className="w-4 h-4" /> +<span>12.5</span>%
        </span>
      </div>
      <div className="border border-[#E2E8F0] bg-[#ffffff] rounded-2xl flex flex-col py-[25px] px-[25px] max-[560px]:px-[15px]">
        <span className="text-[19px] font-medium text-[#6B7280] max-[560px]:text-[17px] max-[480px]:text-[16px]">
          To'langan pullar
        </span>
        <span className="text-[32px] font-bold text-bg-py max-[560px]:text-[25px] max-[480px]:text-[20px]">
          <CountUp
            start={0}
            end={125.4}
            duration={2.5}
            separator=" "
            decimal="."
            decimals={1}
            suffix="M UZS"
          />
        </span>
        <span className="flex items-center text-red-500">
          <ArrowUp className="w-4 h-4" /> +<span>12.5</span>%
        </span>
      </div>
      <div className="border border-[#E2E8F0] bg-[#ffffff] rounded-2xl flex flex-col py-[25px] px-[25px] max-[560px]:px-[15px]">
        <span className="text-[19px] font-medium text-[#6B7280] max-[560px]:text-[17px] max-[480px]:text-[16px]">
          Mijozlar Qarzi
        </span>
        <span className="text-[32px] font-bold text-bg-py max-[560px]:text-[25px] max-[480px]:text-[20px]">
          <CountUp
            start={0}
            end={125.4}
            duration={2.5}
            separator=" "
            decimal="."
            decimals={1}
            suffix="M UZS"
          />
        </span>
        <span className="flex items-center text-green-500">
          <ArrowUp className="w-4 h-4" /> +<span>12.5</span>%
        </span>
      </div>
      <div className="border border-[#E2E8F0] bg-[#ffffff] rounded-2xl flex flex-col py-[25px] px-[25px] max-[560px]:px-[15px]">
        <span className="text-[19px] font-medium text-[#6B7280] max-[560px]:text-[17px] max-[480px]:text-[16px]">
          Tsexlar balansi
        </span>
        <span className="text-[32px] font-bold text-bg-py max-[560px]:text-[25px] max-[480px]:text-[20px]">
          <CountUp
            start={0}
            end={125.4}
            duration={2.5}
            separator=" "
            decimal="."
            decimals={1}
            suffix="M UZS"
          />
        </span>
        <span className="flex items-center text-green-500">
          <ArrowUp className="w-4 h-4" /> +<span>12.5</span>%
        </span>
      </div>
    </div>
  );
};

export default memo(AdminBalances);

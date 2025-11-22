import { ArrowUp } from "lucide-react";
import { memo } from "react";

const Balances = () => {
  return (
    <div className="grid grid-cols-4 gap-6 max-[1350px]:grid-cols-3 max-[1070px]:grid-cols-2 max-[380px]:grid-cols-1">
      <div className="border border-[#E2E8F0] bg-[#ffffff] rounded-2xl flex flex-col py-[25px] px-[25px] max-[560px]:px-[15px]">
        <span className="text-[19px] font-medium text-[#6B7280] max-[560px]:text-[17px] max-[480px]:text-[16px]">
          Umumiy Savdo
        </span>
        <span className="text-[32px] font-bold text-bg-py max-[560px]:text-[25px] max-[480px]:text-[20px]">
          125.4M USZ
        </span>
        <span className="flex items-center text-green-500">
          <ArrowUp className="w-4 h-4" /> +<span>12.5</span>%
        </span>
      </div>
      <div className="border border-[#E2E8F0] bg-[#ffffff] rounded-2xl flex flex-col py-[25px] px-[25px] max-[560px]:px-[15px]">
        <span className="text-[19px] font-medium text-[#6B7280] max-[560px]:text-[17px] max-[480px]:text-[16px]">
          Umumiy Qarzlar
        </span>
        <span className="text-[32px] font-bold text-bg-py max-[560px]:text-[25px] max-[480px]:text-[20px]">
          125.4M USZ
        </span>
        <span className="flex items-center text-red-500">
          <ArrowUp className="w-4 h-4" /> +<span>12.5</span>%
        </span>
      </div>
      <div className="border border-[#E2E8F0] bg-[#ffffff] rounded-2xl flex flex-col py-[25px] px-[25px] max-[560px]:px-[15px]">
        <span className="text-[19px] font-medium text-[#6B7280] max-[560px]:text-[17px] max-[480px]:text-[16px]">
          Tsexlar Balansi
        </span>
        <span className="text-[32px] font-bold text-bg-py max-[560px]:text-[25px] max-[480px]:text-[20px]">
          125.4M USZ
        </span>
        <span className="flex items-center text-green-500">
          <ArrowUp className="w-4 h-4" /> +<span>12.5</span>%
        </span>
      </div>
      <div className="border border-[#E2E8F0] bg-[#ffffff] rounded-2xl flex flex-col py-[25px] px-[25px] max-[560px]:px-[15px]">
        <span className="text-[19px] font-medium text-[#6B7280] max-[560px]:text-[17px] max-[480px]:text-[16px]">
          Mijozlar balansi
        </span>
        <span className="text-[32px] font-bold text-bg-py max-[560px]:text-[25px] max-[480px]:text-[20px]">
          125.4M USZ
        </span>
        <span className="flex items-center text-green-500">
          <ArrowUp className="w-4 h-4" /> +<span>12.5</span>%
        </span>
      </div>
    </div>
  );
};

export default memo(Balances);

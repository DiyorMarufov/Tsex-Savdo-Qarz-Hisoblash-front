import { memo } from "react";

const CustomerBalances = () => {
  return (
    <div className="flex flex-col gap-4 p-[25px] bg-[#ffffff] rounded-2xl border border-[#E2E8F0]">
      <span className="text-[20px] text-bg-py font-bold">
        Mijozlar bo'yicha
      </span>

      <div className="flex flex-col gap-4 overflow-y-auto h-[150px]">
        <div className="flex justify-between">
          <span className="font-medium text-[17px] text-[#6B7280] line-clamp-1">
            Alisher Valiyev
          </span>
          <span className="text-[16px] font-bold text-red-500">5.8M USZ</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-[17px] text-[#6B7280] line-clamp-1">
            Salima Azimova
          </span>
          <span className="text-[16px] font-bold text-red-500">5.8M USZ</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-[17px] text-[#6B7280] line-clamp-1">
            Zuhriddin Akromaliyev
          </span>
          <span className="text-[16px] font-bold text-red-500">5.8M USZ</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-[17px] text-[#6B7280] line-clamp-1">
            Muhriddin Muhriddinov
          </span>
          <span className="text-[16px] font-bold text-red-500">5.8M USZ</span>
        </div>
      </div>
    </div>
  );
};

export default memo(CustomerBalances);

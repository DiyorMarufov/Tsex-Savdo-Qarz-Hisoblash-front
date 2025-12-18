import { memo } from "react";
import SaleChart from "../Sale-chart/SaleChart";

const SaleDynamics = () => {
  return (
    <div className="min-[1350px]:w-[70%] bg-[#ffffff] rounded-2xl border border-[#E2E8F0] pb-5">
      <div className="flex items-center justify-between gap-5 pl-5 pr-4 pt-4">
        <div>
          <h1 className="font-bold text-[19px]">Savdo dinamikasi</h1>
          <p className="font-medium text-[16px] text-[#6E6E6E] pt-1">
            Oxirgi 7 kun
          </p>
        </div>
      </div>
      <div className="pt-3">
        <SaleChart />
      </div>
    </div>
  );
};

export default memo(SaleDynamics);

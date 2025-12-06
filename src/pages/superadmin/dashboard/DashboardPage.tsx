import { memo, useEffect } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import Balances from "../../../widgets/superadmin/dashboard/balances/Balance";
import SaleChart from "../../../widgets/superadmin/dashboard/sale-chart/SaleChart";
import CustomerBalances from "../../../widgets/superadmin/dashboard/customer-balances/CustomerBalances";
import TsexBalances from "../../../widgets/superadmin/dashboard/tsex-balances/TsexBalances";
import { Select } from "antd";

const DashboardPage = () => {
  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);
  return (
    <div>
      <LargeTitle title="Boshqaruv paneli" />
      <div className="mt-2">
        <Balances />
      </div>

      <div className="mt-8 flex gap-6 max-[1350px]:flex-col">
        <div className="min-[1350px]:w-[70%] bg-[#ffffff] rounded-2xl border border-[#E2E8F0] pb-5">
          <div className="flex items-center justify-between gap-5 pl-5 pr-4 pt-6 max-[350px]:flex-wrap">
            <div>
              <h1 className="font-bold text-[19px]">Savdo dinamikasi</h1>
              <p className="font-medium text-[16px] text-[#6E6E6E] pt-1">
                Oxirgi 7 kun
              </p>
            </div>
            <Select
              placeholder="Day"
              className="w-[150px] h-10! max-[350px]:w-full!"
            />
          </div>
          <div className="pt-3">
            <SaleChart />
          </div>
        </div>

        <div className="flex min-[1350px]:flex-col gap-6 min-[1350px]:w-[30%] max-[970px]:flex-wrap">
          <div className="max-[1350px]:w-full">
            <CustomerBalances />
          </div>
          <div className="max-[1350px]:w-full">
            <TsexBalances />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(DashboardPage);

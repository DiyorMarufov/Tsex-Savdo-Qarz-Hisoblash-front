import { memo } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import SmallTitle from "../../../shared/ui/Title/SmallTitle/SmallTitle";
import Balances from "../../../widgets/superadmin/dashboard/balances/Balance";
import SaleChart from "../../../widgets/superadmin/dashboard/sale-chart/SaleChart";
import CustomerBalances from "../../../widgets/superadmin/dashboard/customer-balances/CustomerBalances";
import TsexBalances from "../../../widgets/superadmin/dashboard/tsex-balances/TsexBalances";

const DashboardPage = () => {
  return (
    <div>
      <LargeTitle title="Boshqaruv paneli" />
      <SmallTitle title="Biznesingizning asosiy ko'rsatkichlarini kuzatib boring" />

      <div className="mt-6">
        <Balances />
      </div>

      <div className="mt-8 flex gap-6 max-[1350px]:flex-col">
        <div className="min-[1350px]:w-[70%] bg-[#ffffff] rounded-2xl border border-[#E2E8F0]">
          <SaleChart />
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

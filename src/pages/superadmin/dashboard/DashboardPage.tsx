import { memo, useEffect } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import DashboardBalances from "../../../widgets/superadmin/dashboard/Balances/DashboardBalances";
import SaleDynamics from "../../../widgets/superadmin/dashboard/Sale-dynamics/SaleDynamics";
import CustomerBalances from "../../../widgets/superadmin/dashboard/Customer-balances/CustomerBalances";
import TsexBalances from "../../../widgets/superadmin/dashboard/Tsex-balances/TsexBalances";

const DashboardPage = () => {
  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);
  return (
    <div>
      <LargeTitle title="Boshqaruv paneli" />
      <div className="mt-2">
        <DashboardBalances />
      </div>

      <div className="mt-5 flex gap-6 max-[1350px]:flex-col">
        <SaleDynamics />

        <div className="flex min-[1350px]:flex-col gap-6 min-[1350px]:w-[30%] max-[970px]:flex-wrap">
          <CustomerBalances />
          <TsexBalances />
        </div>
      </div>
    </div>
  );
};

export default memo(DashboardPage);

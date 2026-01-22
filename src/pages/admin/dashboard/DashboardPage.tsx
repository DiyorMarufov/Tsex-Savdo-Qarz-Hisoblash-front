import { memo, useEffect } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import DashboardBalances from "../../../widgets/superadmin/dashboard/Balances/DashboardBalances";
import SaleDynamics from "../../../widgets/superadmin/dashboard/Sale-dynamics/SaleDynamics";
import TsexBalances from "../../../widgets/superadmin/dashboard/Tsex-balances/TsexBalances";

const AdminDashboardPage = () => {
  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);
  return (
    <div>
      <LargeTitle title="Boshqaruv paneli" />
      <DashboardBalances />

      <div className="mt-4 flex gap-4 max-[1350px]:flex-col">
        <SaleDynamics />

        <div className="flex min-[1350px]:flex-col gap-4 min-[1350px]:w-[30%] max-[970px]:flex-wrap">
          <TsexBalances />
        </div>
      </div>
    </div>
  );
};

export default memo(AdminDashboardPage);

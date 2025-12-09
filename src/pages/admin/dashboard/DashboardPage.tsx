import { memo, useEffect } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import AdminBalances from "../../../widgets/admin/dashboard/balances/Balance";
import AdminSaleChart from "../../../widgets/admin/dashboard/sale-chart/SaleChart";
import AdminTsexBalances from "../../../widgets/admin/dashboard/tsex-balances/TsexBalances";
import { Select } from "antd";

const AdminDashboardPage = () => {
  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);
  return (
    <div>
      <LargeTitle title="Boshqaruv paneli" />
      <div className="mt-2">
        <AdminBalances />
      </div>

      <div className="mt-8 flex gap-6 max-[1350px]:flex-col">
        <div className="min-[1350px]:w-[70%] bg-[#ffffff] rounded-2xl border border-[#E2E8F0] pb-5">
          <div className="flex items-center justify-between gap-5 pl-5 pr-4 pt-4 max-[350px]:flex-wrap">
            <div>
              <h1 className="font-bold text-[19px] max-[415px]:text-[17px]">Savdo dinamikasi</h1>
              <p className="font-medium text-[16px] text-[#6E6E6E] pt-1 max-[415px]:text-[15px]">
                Oxirgi 7 kun
              </p>
            </div>
            <Select
              placeholder="Day"
              className="w-[150px] h-10! max-[350px]:w-full!"
            />
          </div>
          <div className="pt-3">
            <AdminSaleChart />
          </div>
        </div>

        <div className="min-[1350px]:w-[30%]">
          <div className="max-[1350px]:w-full">
            <AdminTsexBalances />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(AdminDashboardPage);

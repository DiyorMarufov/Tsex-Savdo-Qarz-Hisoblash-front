import { memo } from "react";
import { useCustomer } from "../../../../shared/lib/apis/customers/useCustomer";
import DashboardUserSkeleton from "../../../../shared/ui/Skeletons/DashboardBalanceSkeleton/DashboardUserSkeleton";

const CustomerBalances = () => {
  const { getMostDebtorCustomers } = useCustomer();
  // MostDebtorCustomer starts
  const { data: allDebtorCustomers, isLoading } = getMostDebtorCustomers();
  const debtorCustomers = allDebtorCustomers?.data;
  // MostDebtorCustomer ends

  if (isLoading) return <DashboardUserSkeleton />;

  return (
    <div className="max-[1350px]:w-full">
      <div className="flex flex-col gap-4 px-5 py-4 bg-[#ffffff] rounded-2xl border border-[#E2E8F0]">
        <span className="text-[20px] text-bg-py font-bold">
          Mijozlar bo'yicha
        </span>

        <div className="flex flex-col gap-3 overflow-y-auto h-[150px]">
          {debtorCustomers && debtorCustomers?.length > 0 ? (
            debtorCustomers?.map((cr: any) => (
              <div key={cr?.id} className="flex justify-between">
                <span className="font-medium text-[17px] text-[#6B7280]">
                  {cr?.full_name}
                </span>
                <span className="text-[16px] font-bold text-red-500">
                  -{cr?.balance} UZS
                </span>
              </div>
            ))
          ) : (
            <div className="text-[19px] text-red-500 flex justify-center items-center h-[11vh]">
              Qarzdor mijozlar hozircha yo'q
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(CustomerBalances);

import { memo } from "react";
import CustomersStatCard from "../StatCard/CustomersStatCard";
import { useCustomer } from "../../../../shared/lib/apis/customers/useCustomer";
import TsexAndCustomerCardSkeleton from "../../../../shared/ui/Skeletons/Tsexes/TsexAndCustomerCardSkeleton";

const CustomersBalances = () => {
  // CustomersStatCard start
  const {
    getCustomerCreditorTotalBalance,
    getCustomerDebtorTotalBalance,
    getCustomerNetTotalBalance,
  } = useCustomer();

  const { data: creditorTotalBalance, isLoading: creditorLoading } =
    getCustomerCreditorTotalBalance();
  const { data: debtorTotalBalance, isLoading: debtorLoading } =
    getCustomerDebtorTotalBalance();
  const { data: netTotalBalance, isLoading: netLoading } =
    getCustomerNetTotalBalance();

  const creditor = creditorTotalBalance?.data;
  const debtor = debtorTotalBalance?.data;
  const net = netTotalBalance?.data;

  const anyLoading = creditorLoading || debtorLoading || netLoading;

  if (anyLoading) return <TsexAndCustomerCardSkeleton />;
  // CustomersStatCard end

  return (
    <div className="mt-3 grid grid-cols-3 gap-5 max-[1250px]:grid-cols-2 max-[500px]:grid-cols-1">
      <CustomersStatCard title="Jami haqdorlik" value={Number(creditor)} />
      <CustomersStatCard
        title="Jami qarzdorlik"
        value={Number(debtor)}
        isValueNegative
      />
      <CustomersStatCard
        title="Umumiy balans"
        value={Number(net)}
        isValueNegative={Number(net) < 0}
        isColSpan
      />
    </div>
  );
};

export default memo(CustomersBalances);

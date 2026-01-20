import { memo } from "react";
import { useCustomer } from "../../../../shared/lib/apis/customers/useCustomer";
import StatCard from "../../../../shared/ui/StatCard/StatCard";
import BalanceStatCardSkeleton from "../../../../shared/ui/Skeletons/BalanceStatCardSkeleton/BalanceStatCardSkeleton";

const CustomersBalances = () => {
  // CustomersStatCard start
  const { getCustomerBalanceSummary } = useCustomer();

  const { data: customerBalancesSummary, isLoading: customerBalanceLoading } =
    getCustomerBalanceSummary();
  const customerBalances = customerBalancesSummary?.data;

  const creditor = customerBalances?.creditorTotalBalance;
  const debtor = customerBalances?.debtorTotalBalance;
  const net = customerBalances?.netTotalBalance;

  if (customerBalanceLoading)
    return (
      <div>
        <BalanceStatCardSkeleton />
      </div>
    );
  // CustomersStatCard end

  return (
    <div className="min-[500px]:mt-1 grid grid-cols-3 gap-4 max-[1250px]:grid-cols-2 max-[500px]:grid-cols-1">
      <StatCard title="Umumiy haqdorlik" value={Number(creditor)} />
      <StatCard
        title="Umumiy qarzdorlik"
        value={Number(debtor)}
        isValueNegative
      />
      <StatCard
        title="Umumiy balans"
        value={Number(net)}
        isValueNegative={Number(net) < 0}
        isColSpan
      />
    </div>
  );
};

export default memo(CustomersBalances);

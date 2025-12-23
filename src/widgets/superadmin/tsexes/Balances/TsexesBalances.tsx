import { memo } from "react";
import { useTsex } from "../../../../shared/lib/apis/tsexes/useTsex";
import TsexAndCustomerCardSkeleton from "../../../../shared/ui/Skeletons/Tsexes/TsexAndCustomerCardSkeleton";
import StatCard from "../../../../shared/ui/StatCard/StatCard";

const TsexBalances = () => {
  const {
    getTsexCreditorTotalBalance,
    getTsexDebtorTotalBalance,
    getTsexNetTotalBalance,
  } = useTsex();
  // TsexStatCard starts
  const { data: creditorTotalBalance, isLoading: creditorLoading } =
    getTsexCreditorTotalBalance();
  const { data: debtorTotalBalance, isLoading: debtorLoading } =
    getTsexDebtorTotalBalance();
  const { data: netTotalBalance, isLoading: netLoading } =
    getTsexNetTotalBalance();

  const creditor = creditorTotalBalance?.data;
  const debtor = -(debtorTotalBalance?.data ?? 0);
  const net = netTotalBalance?.data;

  const anyIsLoading = creditorLoading || debtorLoading || netLoading;
  if (anyIsLoading) {
    return <TsexAndCustomerCardSkeleton />;
  }
  // TsexStatCard ends
  return (
    <div className="mt-2 grid grid-cols-3 gap-5 max-[1250px]:grid-cols-2 max-[500px]:grid-cols-1">
      <StatCard title="Jami haqdorlik" value={Number(creditor)} />
      <StatCard
        title="Jami qarzdorlik"
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

export default memo(TsexBalances);

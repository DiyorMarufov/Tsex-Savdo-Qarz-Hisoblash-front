import { memo } from "react";
import { useTsex } from "../../../../shared/lib/apis/tsexes/useTsex";
import StatCard from "../../../../shared/ui/StatCard/StatCard";
import BalanceCardSkeleton from "../../../../shared/ui/Skeletons/BalanceCardSkeleton/BalanceCardSkeleton";

const TsexBalances = () => {
  const { getTsexBalanceSummary } = useTsex();
  // TsexStatCard starts
  const { data: tsexBalancesSummary, isLoading: tsexBalancesLoading } =
    getTsexBalanceSummary();
  const tsexBalances = tsexBalancesSummary?.data;

  const creditor = tsexBalances?.creditorTotalBalance;
  const debtor = -(tsexBalances?.debtorTotalBalance ?? 0);
  const net = tsexBalances?.netTotalBalance;

  if (tsexBalancesLoading) {
    return (
      <div className="mt-2">
        <BalanceCardSkeleton />
      </div>
    );
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

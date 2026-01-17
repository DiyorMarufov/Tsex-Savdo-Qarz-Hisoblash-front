import { memo } from "react";
import { useTsex } from "../../../../shared/lib/apis/tsexes/useTsex";
import StatCard from "../../../../shared/ui/StatCard/StatCard";
import BalanceStatCardSkeleton from "../../../../shared/ui/Skeletons/BalanceStatCardSkeleton/BalanceStatCardSkeleton";

const TsexBalances = () => {
  const { getTsexBalanceSummary } = useTsex();
  // TsexStatCard starts
  const { data: tsexBalancesSummary, isLoading: tsexBalancesLoading } =
    getTsexBalanceSummary();
  const tsexBalances = tsexBalancesSummary?.data;

  const creditor = tsexBalances?.creditorTotalBalance;
  const debtor = -tsexBalances?.debtorTotalBalance;
  const net = tsexBalances?.netTotalBalance;
  const finalNet = net > 0 ? -net : Math.abs(net);

  if (tsexBalancesLoading) {
    return <BalanceStatCardSkeleton />;
  }
  // TsexStatCard ends
  return (
    <div className="min-[500px]:mt-1 grid grid-cols-3 gap-5 max-[1250px]:grid-cols-2 max-[500px]:grid-cols-1">
      <StatCard title="Jami haqdorlik" value={Number(creditor)} />
      <StatCard
        title="Jami qarzdorlik"
        value={Number(debtor)}
        isValueNegative
      />
      <StatCard
        title="Umumiy balans"
        value={finalNet}
        isValueNegative={finalNet < 0}
        isColSpan
      />
    </div>
  );
};

export default memo(TsexBalances);

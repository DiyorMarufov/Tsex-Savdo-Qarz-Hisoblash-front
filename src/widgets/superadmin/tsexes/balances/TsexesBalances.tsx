import { memo } from "react";
import { useTsex } from "../../../../shared/lib/apis/tsexes/useTsex";
import TsexCardSkeleton from "../../../../shared/ui/Skeletons/Tsexes/TsexCardSkeleton";
import TsexesStatCard from "../StatCard/TsexesStatCard";

const TsexBalances = () => {
  const { getCreditorTotalBalance, getDebtorTotalBalance, getNetTotalBalance } =
    useTsex();
  // TsexStatCard starts
  const { data: creditorTotalBalance, isLoading: creditorLoading } =
    getCreditorTotalBalance();
  const { data: debtorTotalBalance, isLoading: debtorLoading } =
    getDebtorTotalBalance();
  const { data: netTotalBalance, isLoading: netLoading } = getNetTotalBalance();

  const creditor = creditorTotalBalance?.data;
  const debtor = debtorTotalBalance?.data;
  const net = netTotalBalance?.data;

  const anyIsLoading = creditorLoading || debtorLoading || netLoading;
  if (anyIsLoading) {
    return (
      <div className="mt-2 grid grid-cols-3 gap-5 max-[1250px]:grid-cols-2 max-[500px]:grid-cols-1">
        <TsexCardSkeleton />
      </div>
    );
  }
  // TsexStatCard ends
  return (
    <div className="mt-2 grid grid-cols-3 gap-5 max-[1250px]:grid-cols-2 max-[500px]:grid-cols-1">
      <TsexesStatCard title="Jami haqdorlik" value={Number(creditor)} />
      <TsexesStatCard
        title="Jami qarzdorlik"
        value={Number(debtor)}
        isValueNegative
      />
      <TsexesStatCard
        title=" Umumiy balans"
        value={Number(net)}
        isValueNegative={Number(net) > 0}
        isColSpan
      />
    </div>
  );
};

export default memo(TsexBalances);

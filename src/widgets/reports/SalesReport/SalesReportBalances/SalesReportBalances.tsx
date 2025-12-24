import { memo } from "react";
import StatCard from "../../../../shared/ui/StatCard/StatCard";
import BalanceCardSkeleton from "../../../../shared/ui/Skeletons/BalanceCardSkeleton/BalanceCardSkeleton";

interface SalesReportBalancesProps {
  isLoading: boolean;
  totalSales: number;
  paidTotal: number;
  unpaidTotal: number;
}

const SalesReportBalances = ({
  isLoading,
  totalSales,
  paidTotal,
  unpaidTotal,
}: SalesReportBalancesProps) => {
  if (isLoading) return <BalanceCardSkeleton />;

  return (
    <div className="grid grid-cols-3 gap-5 max-[1250px]:grid-cols-2 max-[500px]:grid-cols-1">
      <StatCard title="Umumiy savdo" value={totalSales} />
      <StatCard title="To'langan summa" value={paidTotal} />
      <StatCard
        title="To'lanmagan summa"
        value={unpaidTotal}
        isValueNegative={unpaidTotal < 0}
        isColSpan
      />
    </div>
  );
};

export default memo(SalesReportBalances);

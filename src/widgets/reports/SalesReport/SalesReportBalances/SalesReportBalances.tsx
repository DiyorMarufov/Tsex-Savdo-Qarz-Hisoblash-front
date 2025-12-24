import { memo } from "react";
import StatCard from "../../../../shared/ui/StatCard/StatCard";
import { useSale } from "../../../../shared/lib/apis/sales/useSale";
import BalanceCardSkeleton from "../../../../shared/ui/Skeletons/BalanceCardSkeleton/BalanceCardSkeleton";

const SalesReportBalances = () => {
  const { getSalesSummaryForReport } = useSale();

  // SalesSummary starts
  const { data: salesSummary, isLoading: salesReportLoading } =
    getSalesSummaryForReport();
  const summary = salesSummary?.data;

  const totalSales = summary?.totalSales;
  const paidTotal = summary?.paidTotal;
  const unpaidTotal = summary?.unpaidTotal;
  // SalesSummary ends

  if (salesReportLoading) return <BalanceCardSkeleton />;
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

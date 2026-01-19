import { memo } from "react";
import StatCard from "../../../../shared/ui/StatCard/StatCard";
import BalanceStatCardSkeleton from "../../../../shared/ui/Skeletons/BalanceStatCardSkeleton/BalanceStatCardSkeleton";

interface CustomersReportBalancesProps {
  creditor: number;
  debtor: number;
  net: number;
  loading?: boolean;
}

const CustomersReportBalances = ({
  creditor = 0,
  debtor = 0,
  net = 0,
  loading,
}: CustomersReportBalancesProps) => {
  if (loading) return <BalanceStatCardSkeleton />;
  return (
    <div className="grid grid-cols-3 gap-4 max-[1250px]:grid-cols-2 max-[500px]:grid-cols-1">
      <StatCard title="Jami haqdorlik" value={creditor} />
      <StatCard title="Jami qarzdorlik" value={debtor} isValueNegative />
      <StatCard
        title="Umumiy balans"
        value={net}
        isValueNegative={net < 0}
        isColSpan
      />
    </div>
  );
};

export default memo(CustomersReportBalances);

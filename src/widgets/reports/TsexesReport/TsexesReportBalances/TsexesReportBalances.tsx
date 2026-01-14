import { memo, type FC } from "react";
import StatCard from "../../../../shared/ui/StatCard/StatCard";
import BalanceStatCardSkeleton from "../../../../shared/ui/Skeletons/BalanceStatCardSkeleton/BalanceStatCardSkeleton";

interface TsexReportBalanceProps {
  inventoryBalance: number;
  totalPaid: number;
  totalBalance: number;
  totalQuantity: number;
  totalTypes: number;
  loading: boolean;
}

const TsexesReportBalances: FC<TsexReportBalanceProps> = ({
  inventoryBalance = 0,
  totalPaid = 0,
  totalBalance = 0,
  totalQuantity,
  totalTypes,
  loading,
}) => {
  if (loading) return <BalanceStatCardSkeleton descriptionIndexes={[0]} />;
  return (
    <div className="grid grid-cols-3 gap-5 max-[1250px]:grid-cols-2 max-[500px]:grid-cols-1">
      <StatCard
        title="Ombordagi qoldiq"
        value={inventoryBalance}
        description={`${totalQuantity} pochka / ${totalTypes} modeldagi tovar`}
      />

      <StatCard
        title="Tsexlar balansi"
        value={totalBalance > 0 ? -totalBalance : totalBalance}
        isValueNegative={totalBalance > 0}
      />

      <StatCard title="To'langan pullar" value={totalPaid} isColSpan />
    </div>
  );
};

export default memo(TsexesReportBalances);

import { memo } from "react";
import StatCard from "../../../shared/ui/StatCard/StatCard";

const SalesReportBalances = () => {
  return (
    <div className="grid grid-cols-3 gap-5 max-[1250px]:grid-cols-2 max-[500px]:grid-cols-1">
      <StatCard title="Jami savdo" value={1200000} />
      <StatCard title="To'langan summa" value={1200000} />
      <StatCard title="Umumiy qarz" value={1200000} isColSpan/>
    </div>
  );
};

export default memo(SalesReportBalances);

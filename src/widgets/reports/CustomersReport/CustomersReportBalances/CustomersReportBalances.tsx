import { memo } from "react";
import StatCard from "../../../../shared/ui/StatCard/StatCard";

const CustomersReportBalances = () => {
  return (
    <div className="grid grid-cols-3 gap-5 max-[1250px]:grid-cols-2 max-[500px]:grid-cols-1">
      <StatCard title="Jami haqdorlik" value={1200000} />
      <StatCard title="Jami qarzdorlik" value={1200000} isValueNegative />
      <StatCard
        title="Umumiy balans"
        value={1200000}
        isValueNegative
        isColSpan
      />
    </div>
  );
};

export default memo(CustomersReportBalances);

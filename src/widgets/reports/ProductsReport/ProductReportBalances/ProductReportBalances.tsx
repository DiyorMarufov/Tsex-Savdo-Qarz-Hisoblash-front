import { memo } from "react";
import StatCard from "../../../../shared/ui/StatCard/StatCard";

const ProductReportBalances = () => {
  return (
    <div className="grid grid-cols-3 gap-5 max-[1250px]:grid-cols-2 max-[500px]:grid-cols-1">
      <StatCard title="Jami mahsulotlar" value={1200} suffix=" dona" />
      <StatCard title="Umumiy savdo" value={1200000} />
      <StatCard title="Umumiy qarzdorlar" value={12000000} isColSpan suffix=" UZS"/>
    </div>
  );
};

export default memo(ProductReportBalances);

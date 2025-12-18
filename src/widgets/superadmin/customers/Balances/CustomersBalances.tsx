import { memo } from "react";
import CustomersStatCard from "../StatCard/CustomersStatCard";

const CustomersBalances = () => {
  return (
    <div className="mt-3 grid grid-cols-3 gap-5 max-[1250px]:grid-cols-2 max-[500px]:grid-cols-1">
      <CustomersStatCard title="Jami haqdorlik" value={15200000} />
      <CustomersStatCard
        title="Jami qarzdorlik"
        value={15200000}
        isValueNegative
      />
      <CustomersStatCard title="Umumiy balans" value={15200000} isColSpan />
    </div>
  );
};

export default memo(CustomersBalances);

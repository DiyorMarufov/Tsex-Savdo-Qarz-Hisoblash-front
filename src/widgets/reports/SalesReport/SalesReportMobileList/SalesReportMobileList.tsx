import { memo } from "react";
import type { SalesTableListItem } from "../../../../pages/superadmin/reports/model/sales-model";
import SaleReportCard from "../../../../shared/ui/SaleReportCard/SaleReportCard";

interface SalesReportMobileListProps {
  data: SalesTableListItem[];
  onDetail: (id: string) => void;
}

const SalesReportMobileList = ({
  data,
  onDetail,
}: SalesReportMobileListProps) => {
  return (
    <div className="min-[500px]:hidden flex flex-col gap-5 mt-4">
      {data.map((sl) => (
        <SaleReportCard key={sl.id} item={sl} onDetail={onDetail} />
      ))}
    </div>
  );
};

export default memo(SalesReportMobileList);

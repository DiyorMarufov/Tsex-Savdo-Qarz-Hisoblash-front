import { memo } from "react";
import type { SalesTableListItem } from "../../../../pages/superadmin/reports/model/sales-model";
import { Pagination } from "antd";
import SalesReportCardSkeleton from "../../../../shared/ui/Skeletons/Reports/SalesReport/SalesReportCardSkeleton";
import SaleReportCard from "../../../../shared/ui/SaleReportCard/SaleReportCard";

interface SalesReportMobileListProps {
  data: SalesTableListItem[];
  isLoading: boolean;
  total: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number, pageSize?: number) => void;
  onDetail: (id: string) => void;
}

const SalesReportMobileList = ({
  data,
  isLoading,
  total,
  currentPage,
  pageSize,
  onPageChange,
  onDetail,
}: SalesReportMobileListProps) => {
  if (isLoading) return <SalesReportCardSkeleton />;
  return (
    <div className="min-[500px]:hidden">
      <div className="flex flex-col gap-5">
        {data && data.length > 0 ? (
          data?.map((sl) => (
            <SaleReportCard key={sl.id} item={sl} onDetail={onDetail} />
          ))
        ) : (
          <div className="flex justify-center items-center h-[20vh] text-red-500 text-[19px] col-span-2">
            Hozircha ma'lumot yo'q
          </div>
        )}
      </div>
      {total > 0 && (
        <div className="flex mt-4 justify-center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            onChange={onPageChange}
            total={total}
            showSizeChanger
          />
        </div>
      )}
    </div>
  );
};

export default memo(SalesReportMobileList);

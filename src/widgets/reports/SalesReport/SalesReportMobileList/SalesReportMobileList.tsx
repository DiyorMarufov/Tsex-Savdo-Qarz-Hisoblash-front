import { memo } from "react";
import { Pagination } from "antd";
import SalesReportCardSkeleton from "../../../../shared/ui/Skeletons/Reports/SalesReport/SalesReportCardSkeleton";
import SaleReportCard from "../../../../shared/ui/SaleReportCard/SaleReportCard";
import type { SalesTableListItem } from "../../../../shared/lib/model/reports/sales-model";

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
      {total > pageSize && (
        <div className="flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={total}
            onChange={onPageChange}
            showSizeChanger
          />
        </div>
      )}
    </div>
  );
};

export default memo(SalesReportMobileList);

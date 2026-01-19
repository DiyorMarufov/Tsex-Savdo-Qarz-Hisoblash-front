import { memo } from "react";
import SaleItemCardReportSkeleton from "../../../../shared/ui/Skeletons/Reports/SalesReport/SaleItemCardReportSkeleton";
import { Pagination } from "antd";
import type { SaleItemsTableListItem } from "../../../../shared/lib/model/reports/sales-items-detail-model";
import SaleItemCard from "../../../../shared/ui/SaleItemCard/SaleItemCard";

interface SaleItemReportMobileListProps {
  data: SaleItemsTableListItem[];
  total: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number, pageSize?: number) => void;
  loading: boolean;
}

const SaleItemReportMobileList = ({
  data,
  loading,
  total,
  currentPage,
  pageSize,
  onPageChange,
}: SaleItemReportMobileListProps) => {
  return (
    <>
      {loading ? (
        <SaleItemCardReportSkeleton />
      ) : (
        <div className="min-[500px]:hidden flex flex-col gap-4">
          {data && data.length > 0 ? (
            data?.map((item) => (
              <SaleItemCard key={item.id} item={item} />
            ))
          ) : (
            <div className="flex justify-center items-center h-[20vh] text-red-500 text-[19px] col-span-2">
              Hozircha ma'lumot yo'q
            </div>
          )}
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
      )}
    </>
  );
};

export default memo(SaleItemReportMobileList);

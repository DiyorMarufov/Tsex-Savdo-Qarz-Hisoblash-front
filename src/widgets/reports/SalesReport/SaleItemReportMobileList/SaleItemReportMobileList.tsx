import { memo } from "react";
import type { SaleItemsTableListItem } from "../../../../pages/superadmin/reports/model/sales-items-detail-model";
import SaleItemCardReportSkeleton from "../../../../shared/ui/Skeletons/Reports/SalesReport/SaleItemCardReportSkeleton";
import { Pagination } from "antd";
import SaleItemReportCard from "../../../../shared/ui/SaleItemReportCard/SaleItemReportCard";

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
        <div className="min-[500px]:hidden flex flex-col gap-5">
          {data && data.length > 0 ? (
            data?.map((item) => (
              <SaleItemReportCard key={item.id} item={item} />
            ))
          ) : (
            <div className="flex justify-center items-center h-[20vh] text-red-500 text-[19px] col-span-2">
              Hozircha ma'lumot yo'q
            </div>
          )}
          <div className="flex justify-center">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              onChange={onPageChange}
              total={total}
              showSizeChanger
            />
          </div>
        </div>
      )}
    </>
  );
};

export default memo(SaleItemReportMobileList);

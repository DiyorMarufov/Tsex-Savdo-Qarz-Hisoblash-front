import { memo } from "react";
import { Pagination } from "antd";
import CustomerCard from "../../../shared/ui/CustomerCard/CustomerCard";
import CustomerCardSkeleton from "../../../shared/ui/Skeletons/Customers/CustomerCardSkeleton";
import type { CustomersListItemsType } from "../../../shared/lib/model/customers/customers-model";

interface CustomerMobileListProps {
  data: CustomersListItemsType[];
  loading?: boolean;
  total?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange?: (page: number, pageSize?: number) => void;
  onDetail: (id: string) => void;
  isReport?: boolean;
}

const CustomerMobileList = ({
  data,
  loading,
  total = 0,
  currentPage = 1,
  pageSize = 5,
  onPageChange,
  onDetail,
  isReport = false,
}: CustomerMobileListProps) => {
  if (loading) {
    return <CustomerCardSkeleton />;
  }

  return (
    <div
      className={`min-[500px]:hidden flex flex-col gap-5 ${isReport ? "" : "mt-4"}`}
    >
      {data && data.length > 0 ? (
        data.map((cs) => (
          <CustomerCard key={cs.id} cs={cs} onDetail={onDetail} />
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
  );
};

export default memo(CustomerMobileList);

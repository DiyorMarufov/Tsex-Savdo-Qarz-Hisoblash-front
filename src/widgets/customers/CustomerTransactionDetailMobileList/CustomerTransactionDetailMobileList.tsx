import { memo } from "react";
import CustomerTransactionDetailCard from "../../../shared/ui/CustomerTransactionDetailCard/CustomerTransactionDetailCard";
import CustomerTransactionDetailCardSkeleton from "../../../shared/ui/Skeletons/Customers/CustomerTransactionDetailCardSkeleton";
import { Pagination } from "antd";
import type { CustomerTranscationDetailListItemsType } from "../../../shared/lib/model/customers/customer-transactions-detail-model";

interface Props {
  data: CustomerTranscationDetailListItemsType[] | undefined;
  loading: boolean;
  total: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number, pageSize?: number) => void;
}

const CustomerTransactionDetailMobileList = ({
  data,
  loading,
  total,
  currentPage,
  pageSize,
  onPageChange,
}: Props) => {
  if (loading) return <CustomerTransactionDetailCardSkeleton />;
  return (
    <div className="min-[500px]:hidden flex flex-col gap-5">
      {data && data.length > 0 ? (
        data.map((trd) => (
          <CustomerTransactionDetailCard key={trd.id} trd={trd} />
        ))
      ) : (
        <div className="flex justify-center items-center h-[20vh] text-red-500 text-[19px]">
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

export default memo(CustomerTransactionDetailMobileList);

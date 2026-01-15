import React from "react";
import { Pagination } from "antd";
import TsexTransactionCard from "../../../shared/ui/TsexTransactionCard/TsexTransactionCard";
import TsexTransactionCardSkeleton from "../../../shared/ui/Skeletons/TsexTranscations/TsexTransactionCardSkeleton";
import type { TsexTransactionsTableListItem } from "../../../shared/lib/model/tsexes/tsexes-transactions-model";

interface TsexMobileListProps {
  transactions: TsexTransactionsTableListItem[];
  loading: boolean;
  currentPage: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number, pageSize: number) => void;
}

const TsexTransactionMobileList: React.FC<TsexMobileListProps> = ({
  transactions,
  loading,
  currentPage,
  pageSize,
  total,
  onPageChange,
}) => {
  if (loading) return <TsexTransactionCardSkeleton />;
  return (
    <div className="min-[500px]:hidden flex flex-col gap-3">
      {!loading && transactions && transactions.length > 0
        ? transactions.map((dt) => (
            <TsexTransactionCard key={dt.id} data={dt} />
          ))
        : !loading && (
            <div className="flex justify-center items-center h-[20vh] text-red-500 font-medium text-[18px]">
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

export default TsexTransactionMobileList;

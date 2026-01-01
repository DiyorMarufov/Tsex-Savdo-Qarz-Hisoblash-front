import { memo } from "react";
import CustomerTransactionCard from "../../../../shared/ui/CustomerTransactionCard/CustomerTransactionCard";
import type { CustomerTranscationsListItemsType } from "../../../../pages/superadmin/customers/model/customer-transactions-model";
import CustomerCardSkeleton from "../../../../shared/ui/Skeletons/Customers/CustomerCardSkeleton";

interface TransactionMobileListProps {
  transactions: CustomerTranscationsListItemsType[] | undefined;
  loading: boolean;
  handleOpenTransactionDetail: (
    id: string,
    type: "lending" | "borrowing",
  ) => void;
}

const TransactionMobileList = ({
  transactions,
  loading,
  handleOpenTransactionDetail,
}: TransactionMobileListProps) => {
  if (loading) return <CustomerCardSkeleton />;

  return (
    <div className="min-[500px]:hidden flex flex-col gap-5 mt-3">
      {transactions && transactions.length > 0 ? (
        transactions.map((trd) => (
          <CustomerTransactionCard
            key={trd.id}
            trd={trd}
            onDetail={handleOpenTransactionDetail}
          />
        ))
      ) : (
        <div className="flex justify-center items-center h-[20vh] text-red-500 text-[19px]">
          Hozircha ma'lumot yo'q
        </div>
      )}
    </div>
  );
};

export default memo(TransactionMobileList);

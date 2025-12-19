import { memo } from "react";
import type { CustomerTranscationDetailListItemsType } from "../../../pages/superadmin/customers/model/customer-transactions-detail-model";
import CustomerTransactionDetailCard from "../../../shared/ui/CustomerTransactionDetailCard/CustomerTransactionDetailCard";
import CustomerTransactionDetailCardSkeleton from "../../../shared/ui/Skeletons/Customers/CustomerTransactionDetailCardSkeleton";

interface Props {
  data: CustomerTranscationDetailListItemsType[] | undefined;
  loading: boolean;
}

const CustomerTransactionDetailMobileList = ({ data, loading }: Props) => {
  if (loading) return <CustomerTransactionDetailCardSkeleton />;
  return (
    <div className="min-[500px]:hidden flex flex-col gap-5 mt-4">
      {data && data.length > 0 ? (
        data.map((trd) => (
          <CustomerTransactionDetailCard key={trd.id} trd={trd} />
        ))
      ) : (
        <div className="flex justify-center items-center h-[20vh] text-red-500 text-[19px]">
          Hozircha ma'lumot yo'q
        </div>
      )}
    </div>
  );
};

export default memo(CustomerTransactionDetailMobileList);

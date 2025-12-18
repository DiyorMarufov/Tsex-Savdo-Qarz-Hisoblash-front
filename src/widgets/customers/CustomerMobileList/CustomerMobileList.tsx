import { memo } from "react";
import { Pagination } from "antd";
import CustomerCard from "../../../shared/ui/CustomerCard/CustomerCard";
import type { CustomersListItemsType } from "../../../pages/superadmin/customers/model/customers-model";

interface CustomerMobileListProps {
  data: CustomersListItemsType[];
  loading?: boolean;
  total?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange?: (page: number, pageSize?: number) => void;
  onDetail: (id: string) => void;
}

const CustomerMobileList = ({
  data,
  loading,
  total = 0,
  currentPage = 1,
  pageSize = 5,
  onPageChange,
  onDetail,
}: CustomerMobileListProps) => {
  if (loading && data.length === 0) {
    return (
      <div className="flex justify-center items-center h-[20vh]">
        Yuklanmoqda...
      </div>
    );
  }

  return (
    <div className="min-[500px]:hidden flex flex-col gap-5 mt-4">
      {data && data.length > 0 ? (
        data.map((cs) => (
          <CustomerCard key={cs.id} cs={cs} onDetail={onDetail} />
        ))
      ) : (
        <div className="flex justify-center items-center h-[20vh] text-red-500 text-[18px] bg-white rounded-xl border border-dashed border-red-200">
          Mijozlar topilmadi
        </div>
      )}

      {total > pageSize && (
        <div className="flex justify-center mt-2">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={total}
            onChange={onPageChange}
            showSizeChanger={false}
            size="small"
          />
        </div>
      )}
    </div>
  );
};

export default memo(CustomerMobileList);

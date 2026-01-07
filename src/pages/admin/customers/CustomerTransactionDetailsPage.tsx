import { memo, useEffect, useMemo } from "react";
import ProTable from "@ant-design/pro-table";
import { useCustomerTransaction } from "../../../shared/lib/apis/customer-transactions/useCustomerTransaction";
import { useNavigate, useParams } from "react-router-dom";
import CustomerTransactionDetailMobileList from "../../../widgets/customers/CustomerTransactionDetailMobileList/CustomerTransactionDetailMobileList";
import NameSkeleton from "../../../shared/ui/Skeletons/NameSkeleton/NameSkeleton";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import type { QueryParams } from "../../../shared/lib/types";
import { ArrowLeft } from "lucide-react";
import { transactionDetailColumns } from "../../../shared/lib/model/customers/customer-transactions-detail-model";

const CustomerTransactionDetailsPage = () => {
  const { id } = useParams();
  const { getParam, setParams, removeParam } = useParamsHook();
  const navigate = useNavigate();

  const { getCustomerTransactionsDetailByParentTransactionId } =
    useCustomerTransaction();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  // Query starts
  const query: QueryParams = useMemo(() => {
    const page = Number(getParam("page")) || 1;
    const limit = Number(getParam("limit")) || 5;

    return { page, limit };
  }, [getParam]);
  // Query ends

  // CustomerTransactionDetail starts
  const {
    data: customerTransactionDetailsPage,
    isLoading: customerTransactionDetailLoading,
  } = getCustomerTransactionsDetailByParentTransactionId(id as string);
  const transactionDetails = customerTransactionDetailsPage?.data?.data;
  const total = customerTransactionDetailsPage?.data?.total || 0;
  // CustomerTransactionDetail ends

  // PageChange starts
  const handlePageChange = (newPage: number, newPageSize?: number) => {
    const updateParams: { page?: number; limit?: number } = {};

    if (newPage > 1) {
      updateParams.page = newPage;
    }

    if (newPageSize && newPageSize !== 5) {
      updateParams.limit = newPageSize;
    }

    setParams(updateParams);

    if (newPage === 1) {
      removeParam("page");
    }
    if (newPageSize === 5 && getParam("limit")) {
      removeParam("limit");
    }
  };
  // PageChange ends

  return (
    <div className="pb-12">
      <ArrowLeft
        className="hover:opacity-75 cursor-pointer mb-2"
        onClick={() => navigate(-1)}
      />
      <div className="flex flex-col">
        {customerTransactionDetailLoading ? (
          <NameSkeleton />
        ) : (
          <span className="text-[20px] font-medium text-[#4B5563] pb-5">
            {transactionDetails?.[0]?.customer.full_name
              ? transactionDetails?.[0]?.customer.full_name
              : "Hozircha no'malum"}{" "}
            ni tranzaksiyalari
          </span>
        )}
      </div>

      <div className="max-[500px]:hidden">
        <ProTable
          dataSource={transactionDetails}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            responsive: false,
            current: query.page,
            pageSize: query.limit,
            total,
            onChange: handlePageChange,
          }}
          columns={transactionDetailColumns}
          search={false}
          dateFormatter="string"
          scroll={{ x: "max-content" }}
          loading={customerTransactionDetailLoading}
        />
      </div>

      <CustomerTransactionDetailMobileList
        data={transactionDetails}
        loading={customerTransactionDetailLoading}
        total={total}
        currentPage={Number(query.page)}
        pageSize={Number(query.limit)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default memo(CustomerTransactionDetailsPage);

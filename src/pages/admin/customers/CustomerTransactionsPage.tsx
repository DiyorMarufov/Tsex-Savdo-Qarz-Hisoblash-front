import ProTable from "@ant-design/pro-table";
import { memo, useEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useCustomerTransaction } from "../../../shared/lib/apis/customer-transactions/useCustomerTransaction";
import CustomerTransactionMobileList from "../../../widgets/superadmin/customers/CustomerTransactionMobileList/CustomerTransactionMobileList";
import NameSkeleton from "../../../shared/ui/Skeletons/NameSkeleton/NameSkeleton";
import { ArrowLeft } from "lucide-react";
import { transactionColumns } from "../../../shared/lib/model/customers/customer-transactions-model";

const AdminCustomersDetailPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { getCustomerTransactionsByCustomerId } = useCustomerTransaction();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  // CustomerTransaction detail starts
  const handleOpenTransactionDetail = (id: string) => {
    navigate(`detail/${id}`);
  };
  // CustomerTransaction detail ends

  // CustomerTransaction starts
  const { data: customerTransactions, isLoading: customerTransactionLoading } =
    getCustomerTransactionsByCustomerId(id as string);
  const transactions = customerTransactions?.data;
  // CustomerTransaction ends

  if (pathname.includes("/detail/")) {
    return <Outlet />;
  }

  return (
    <div>
      <ArrowLeft
        className="hover:opacity-75 cursor-pointer mb-2"
        onClick={() => navigate(-1)}
      />
      {customerTransactionLoading ? (
        <NameSkeleton />
      ) : (
        <span className="text-[20px] font-medium text-[#4B5563]">
          {transactions?.[0]?.customer.full_name
            ? transactions?.[0]?.customer.full_name
            : "Hozircha no'malum"}{" "}
          ni tranzaksiyalari
        </span>
      )}
      <div className="max-[500px]:hidden">
        <ProTable
          dataSource={transactions}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            responsive: false,
          }}
          columns={transactionColumns(handleOpenTransactionDetail)}
          search={false}
          dateFormatter="string"
          scroll={{ x: "max-content" }}
          loading={customerTransactionLoading}
        />
      </div>

      <CustomerTransactionMobileList
        handleOpenTransactionDetail={handleOpenTransactionDetail}
        transactions={transactions}
        loading={customerTransactionLoading}
      />
    </div>
  );
};

export default memo(AdminCustomersDetailPage);

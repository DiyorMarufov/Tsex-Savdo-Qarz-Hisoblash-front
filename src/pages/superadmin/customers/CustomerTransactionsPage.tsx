import ProTable from "@ant-design/pro-table";
import { memo, useEffect } from "react";
import { transactionColumns } from "./model/customer-transactions-model";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useCustomerTransaction } from "../../../shared/lib/apis/customer-transactions/useCustomerTransaction";
import CustomerTransactionMobileList from "../../../widgets/superadmin/customers/CustomerTransactionMobileList/CustomerTransactionMobileList";

const CustomersDetailPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { getCustomerTransactionsByCustomerId } = useCustomerTransaction();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  // CustomerTransaction detail starts
  const handleOpenTransactionDetail = (id: string) => {
    navigate(`transaction/${id}`);
  };
  // CustomerTransaction detail ends

  // CustomerTransaction starts
  const { data: customerTransactions, isLoading: customerTransactionLoading } =
    getCustomerTransactionsByCustomerId(id as string);
  const transactions = customerTransactions?.data;
  // CustomerTransaction ends

  if (pathname.includes("/transaction/")) {
    return <Outlet />;
  }

  return (
    <>
      <span className="text-[20px] font-medium text-[#4B5563]">
        {transactions?.[0]?.customer.full_name
          ? transactions?.[0]?.customer.full_name
          : "Hozircha no'malum"}{" "}
        ni tranzaksiyalari
      </span>
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
    </>
  );
};

export default memo(CustomersDetailPage);

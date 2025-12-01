import ProTable from "@ant-design/pro-table";
import { memo } from "react";
import {
  fakeTransactionData,
  transactionColumns,
} from "./model/customer-transactions-model";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const CustomersDetailPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // CustomerTransaction detail starts
  const handleOpenTransactionDetail = (id: string) => {
    navigate(`transaction/${id}`);
  };
  // CustomerTransaction detail ends

  if (pathname.includes("/transaction/")) {
    return <Outlet />;
  }
  return (
    <>
      <div>
        <ProTable
          dataSource={fakeTransactionData}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            responsive: false,
          }}
          columns={transactionColumns(handleOpenTransactionDetail)}
          search={false}
          dateFormatter="string"
          scroll={{ x: "max-content" }}
        />
      </div>
    </>
  );
};

export default memo(CustomersDetailPage);

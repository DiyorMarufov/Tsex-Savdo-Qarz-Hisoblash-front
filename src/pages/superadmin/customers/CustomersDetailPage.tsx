import ProTable from "@ant-design/pro-table";
import { memo } from "react";
import {
  fakeTransactionData,
  transactionColumns,
} from "./model/customer-transactions-model";

const CustomersDetailPage = () => {
  return (
    <div>
      <ProTable
        dataSource={fakeTransactionData}
        rowKey="id"
        pagination={{
          showSizeChanger: true,
          responsive: false,
        }}
        columns={transactionColumns}
        search={false}
        dateFormatter="string"
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default memo(CustomersDetailPage);

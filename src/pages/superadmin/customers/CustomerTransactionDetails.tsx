import { memo } from "react";
import ProTable from "@ant-design/pro-table";
import {
  fakeTransactionDetailData,
  transactionDetailColumns,
} from "./model/customer-transactions-detail-model";
import { ArrowDown, ArrowUp, CheckCircle } from "lucide-react";

const CustomerTransactionDetails = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-8 px-3">
        <div className="flex flex-col items-center cursor-pointer text-green-600 hover:text-green-700 transition duration-150">
          <div className="p-3 border-2 border-green-600 rounded-full bg-green-100/50">
            <ArrowUp className="h-8 w-8" />
          </div>
          <span className="text-sm font-medium mt-1 whitespace-nowrap text-center">
            Koproq qarz berish
          </span>
        </div>

        <div className="flex flex-col items-center cursor-pointer text-red-600 hover:text-red-700 transition duration-150">
          <div className="p-3 border-2 border-red-600 rounded-full bg-red-100/50">
            <ArrowDown className="h-8 w-8" />
          </div>
          <span className="text-sm font-medium mt-1 whitespace-nowrap text-center">
            Qabul qilish
          </span>
        </div>

        <div className="flex flex-col items-center cursor-pointer text-blue-600 hover:text-blue-700 transition duration-150">
          <div className="p-3 border-2 border-blue-600 rounded-full bg-blue-100/50">
            <CheckCircle className="h-8 w-8" />
          </div>
          <span className="text-sm font-medium mt-1 whitespace-nowrap text-center">
            Tugatish
          </span>
        </div>
      </div>
      <ProTable
        dataSource={fakeTransactionDetailData}
        rowKey="id"
        pagination={{
          showSizeChanger: true,
          responsive: false,
        }}
        columns={transactionDetailColumns}
        search={false}
        dateFormatter="string"
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default memo(CustomerTransactionDetails);

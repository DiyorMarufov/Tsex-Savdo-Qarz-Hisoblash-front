import { memo } from "react";
import ProTable from "@ant-design/pro-table";
import {
  fakeTransactionDetailData,
  transactionDetailColumns,
  type CustomerTranscationDetailListItemsType,
} from "./model/customer-transactions-detail-model";
import { ArrowDown, ArrowUp, CheckCircle, Edit, Trash } from "lucide-react";

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
      <div className="mt-2 max-[500px]:hidden">
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

      <div>
        <div className="min-[500px]:hidden flex flex-col gap-5 mt-4">
          {fakeTransactionDetailData.map(
            (trd: CustomerTranscationDetailListItemsType) => (
              <div
                key={trd.id}
                className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px]"
              >
                <div className="">
                  <div className="flex flex-col p-5">
                    <a className="text-[17px] font-bold text-green-600 whitespace-nowrap">
                      {trd.customer.full_name}
                    </a>
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          trd.type === "borrow_more"
                            ? "bg-red-500"
                            : trd.type === "lend_more"
                            ? "bg-blue-500"
                            : trd.type === "repayment" ||
                              trd.type === "received"
                            ? "bg-green-500"
                            : trd.type === "paid_off"
                            ? "bg-green-700"
                            : "bg-gray-400"
                        }`}
                      ></div>

                      <span className="text-[17px] font-bold text-[#4B5563]">
                        {trd.type === "borrow_more"
                          ? "Qo'shimcha qarz olish"
                          : trd.type === "repayment"
                          ? "Qarzni qaytarish"
                          : trd.type === "paid_off"
                          ? "To'liq to'landi"
                          : trd.type === "lend_more"
                          ? "Qo'shimcha qarz berish"
                          : trd.type === "received"
                          ? "Qarzni qabul qilish"
                          : trd.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full h-px bg-bg-fy"></div>

                <div className="p-5 flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col justify-start w-1/2">
                      <span className="text-[16px] font-medium text-[#6B7280]">
                        Miqdor
                      </span>
                      <span className="text-[17px] font-bold text-green-600">
                        {trd.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-col justify-start w-1/2">
                      <span className="text-[16px] font-medium text-[#6B7280] whitespace-nowrap">
                        Keyingi Balans
                      </span>
                      {trd.balance_after > 0 ? (
                        <span className="text-[17px] font-bold text-red-500">
                          -{Math.abs(trd.balance_after).toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-[17px] font-bold text-green-500">
                          {Math.abs(trd.balance_after).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col justify-start w-1/2 whitespace-nowrap">
                      <span className="text-[16px] font-medium text-[#6B7280]">
                        Tugash sanasi
                      </span>
                      <span className="text-[17px] font-bold text-[#4B5563]">
                        {trd.due_date.toLocaleString("uz-UZ")}
                      </span>
                    </div>
                    <div className="flex flex-col justify-start w-1/2">
                      <span className="text-[16px] font-medium text-[#6B7280]">
                        Holati
                      </span>
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-3 w-3 rounded-full ${
                            trd.status === "open"
                              ? "bg-green-500"
                              : "bg-gray-400"
                          }`}
                        ></div>

                        <span className="text-[17px] font-bold text-[#4B5563]">
                          {trd.status === "open" ? "Ochiq" : "Yopilgan"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div>
                      <span className="font-medium text-[#6B7280] text-[16px]">
                        Izoh
                      </span>
                    </div>
                    <div>
                      <span className="text-[17px] font-bold text-[#4B5563]">
                        {" "}
                        {trd.description}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div>
                      <span className="font-medium text-[#6B7280] text-[16px]">
                        Kiritilgan sana
                      </span>
                    </div>
                    <div>
                      <span className="text-[17px] font-bold text-[#4B5563]">
                        {" "}
                        {trd.created_at.toLocaleString("uz-UZ")}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end mt-1">
                    <div className="flex items-center gap-5">
                      <Edit className="text-green-600 cursor-pointer hover:opacity-80" />
                      <Trash className="text-red-600 cursor-pointer hover:opacity-80" />
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(CustomerTransactionDetails);

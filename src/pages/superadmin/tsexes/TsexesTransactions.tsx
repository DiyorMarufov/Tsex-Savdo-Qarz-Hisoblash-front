import ProTable from "@ant-design/pro-table";
import { memo, useEffect } from "react";
import {
  fakeTsexTransactionsData,
  tsexTransactionsColumns,
  type TsexTransactionsTableListItem,
} from "./model/tsexes-transactions-model";
import { Pagination } from "antd";
import { Edit } from "lucide-react";

const TsexesTransactions = () => {
  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);
  return (
    <>
      <div className="pb-3 text-[20px] font-medium">
        1 chi tsexning tranzaksiyalari
      </div>
      <ProTable
        dataSource={fakeTsexTransactionsData}
        rowKey="id"
        pagination={{
          showSizeChanger: true,
          responsive: false,
        }}
        columns={tsexTransactionsColumns}
        search={false}
        dateFormatter="string"
        scroll={{ x: "max-content" }}
        className="max-[500px]:hidden"
      />

      <div className="min-[500px]:hidden flex flex-col gap-5">
        {fakeTsexTransactionsData.map((dt: TsexTransactionsTableListItem) => (
          <div
            key={dt.id}
            className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px] overflow-hidden"
          >
            <div className="px-3.5 py-3 flex justify-between items-center">
              <a className="text-[16px] font-bold">{dt.tsex.name}</a>
              <span className="text-[12px] font-bold">
                {(() => {
                  switch (dt.type) {
                    case "payment":
                      return (
                        <span className="bg-green-100 rounded-full text-green-500 px-2 py-1">
                          To'liq To'lov
                        </span>
                      );
                    case "partial_payment":
                      return (
                        <span className="bg-yellow-100 rounded-full text-yellow-500 px-2 py-1">
                          Qisman To'lov
                        </span>
                      );
                    case "avans":
                      return (
                        <span className="bg-blue-100 rounded-full text-blue-500 px-2 py-1">
                          Avans (Oldindan)
                        </span>
                      );
                    default:
                      return dt.type;
                  }
                })()}
              </span>
            </div>
            <div className="w-full h-px bg-bg-fy"></div>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3 px-3.5 py-3">
                <div className="flex flex-col w-1/2 justify-start">
                  <span className="text-[15px] font-medium text-[#6B7280]">
                    Miqdori
                  </span>
                  <span className="text-[16px] font-bold text-green-600">
                    {dt.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[15px] font-medium text-[#6B7280] whitespace-nowrap">
                    Balans (Keyin)
                  </span>
                  {dt.balance_after > 0 ? (
                    <span className="text-[16px] font-bold text-red-500">
                      -{dt.balance_after.toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-[16px] font-bold text-green-500">
                      {dt.balance_after.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="flex flex-col col-span-2">
                  <span className="text-[15px] font-medium text-[#6B7280]">
                    Izoh
                  </span>
                  <span className="text-[16px] font-bold text-[#4B5563]">
                    {dt.description}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center bg-bg-ty px-3.5">
                <div className="py-2 flex flex-col">
                  <span className="text-[#6D7482] font-bold text-[15px]">
                    {dt.created_by.name}
                  </span>
                  <span className="text-[#6D7482] font-bold text-[15px]">
                    {dt.created_at.toLocaleString("uz-UZ")}
                  </span>
                </div>

                <div>
                  <Edit className="text-green-600 cursor-pointer hover:opacity-80" />
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-center">
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default memo(TsexesTransactions);

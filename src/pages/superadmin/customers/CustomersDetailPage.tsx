import ProTable from "@ant-design/pro-table";
import { memo } from "react";
import {
  fakeTransactionData,
  transactionColumns,
  type CustomerTranscationsListItemsType,
} from "./model/customer-transactions-model";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Edit, Trash } from "lucide-react";
import { Button as AntdButton } from "antd";

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
      <div className="max-[500px]:hidden">
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

      <div className="min-[500px]:hidden flex flex-col gap-5 mt-4">
        {fakeTransactionData.map((trd: CustomerTranscationsListItemsType) => (
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
                      trd.type === "borrowing" ? "bg-red-500" : "bg-blue-500"
                    }`}
                  ></div>

                  <span className="text-[17px] font-bold text-[#4B5563]">
                    {trd.type === "borrowing" ? "Qarz olish" : "Qarz berish"}
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
                        trd.status === "open" ? "bg-green-500" : "bg-gray-400"
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

              <div className="flex justify-between mt-1">
                <div className="flex items-center gap-5">
                  <Edit className="text-green-600 cursor-pointer hover:opacity-80" />
                  <Trash className="text-red-600 cursor-pointer hover:opacity-80" />
                </div>
                <div>
                  <AntdButton
                    className="bg-[#1D4ED8]! text-white!"
                    onClick={() =>
                      handleOpenTransactionDetail(trd.id as string)
                    }
                  >
                    Batafsil
                  </AntdButton>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default memo(CustomersDetailPage);

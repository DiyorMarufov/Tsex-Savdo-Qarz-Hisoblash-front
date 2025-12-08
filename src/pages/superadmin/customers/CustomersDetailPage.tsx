import ProTable from "@ant-design/pro-table";
import { memo, useEffect } from "react";
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

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);
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
      <span className="text-[20px] font-medium text-[#4B5563]">Aliyev Dilshod ni tranzaksiyalari</span>
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

      <div className="min-[500px]:hidden flex flex-col gap-5 mt-3">
        {fakeTransactionData.map((trd: CustomerTranscationsListItemsType) => (
          <div
            key={trd.id}
            className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px]"
          >
            <div className="">
              <div className="flex justify-between items-center px-3.5 py-2">
                <a className="text-[16px] font-bold text-green-600 w-fit">
                  {trd.customer.full_name}
                </a>
                <div className="flex justify-between items-center mt-1 whitespace-nowrap">
                  {trd.type === "borrowing" ? (
                    <span className="bg-red-100 text-[12px] rounded-full text-red-600 font-bold px-2 py-1">
                      Qarz olish
                    </span>
                  ) : (
                    <span className="bg-blue-100 text-[12px] rounded-full text-blue-600 font-bold px-2 py-1">
                      Qarz berish
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-bg-fy"></div>

            <div className="p-3.5 py-2.5 flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col justify-start w-1/2">
                  <span className="text-[15px] font-medium text-[#6B7280]">
                    Miqdor
                  </span>

                  <span className="text-[16px] font-bold text-green-600">
                    {trd.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-col justify-start">
                  <span className="text-[15px] font-medium text-[#6B7280]">
                    Keyingi Balans
                  </span>
                  {trd.balance_after > 0 ? (
                    <span className="text-[16px] font-bold text-red-500">
                      -{Math.abs(trd.balance_after).toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-[16px] font-bold text-green-500">
                      {Math.abs(trd.balance_after).toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="flex flex-col justify-start">
                  <span className="text-[15px] font-medium text-[#6B7280]">
                    Tugash sanasi
                  </span>
                  <span className="text-[16px] font-bold text-[#4B5563]">
                    {trd.due_date.toLocaleString("uz-UZ")}
                  </span>
                </div>
                <div className="flex flex-col justify-start">
                  <span className="text-[15px] font-medium text-[#6B7280]">
                    Holati
                  </span>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        trd.status === "open" ? "bg-green-500" : "bg-gray-400"
                      }`}
                    ></div>

                    <span className="text-[16px] font-bold text-[#4B5563]">
                      {trd.status === "open" ? "Ochiq" : "Yopilgan"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <div>
                  <span className="font-medium text-[#6B7280] text-[15px]">
                    Izoh
                  </span>
                </div>
                <div>
                  <span className="text-[16px] font-bold text-[#4B5563]">
                    {" "}
                    {trd.description}
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                <div>
                  <span className="font-medium text-[#6B7280] text-[15px]">
                    Kiritilgan sana
                  </span>
                </div>
                <div>
                  <span className="text-[16px] font-bold text-[#4B5563]">
                    {" "}
                    {trd.created_at.toLocaleString("uz-UZ")}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-1 pb-[1.5px]">
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

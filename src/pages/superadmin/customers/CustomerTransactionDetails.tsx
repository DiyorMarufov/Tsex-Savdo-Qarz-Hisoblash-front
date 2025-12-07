import { memo, useEffect, useRef, useState } from "react";
import ProTable from "@ant-design/pro-table";
import {
  fakeTransactionDetailData,
  transactionDetailColumns,
  type CustomerTranscationDetailListItemsType,
} from "./model/customer-transactions-detail-model";
import { ArrowDown, ArrowUp, CheckCircle, Edit, Trash } from "lucide-react";
import { Modal, type FormProps, Button as AntdButton, Form, Input } from "antd";

type transcationFieldType = {
  amount: number;
  description?: string;
};

const CustomerTransactionDetails = () => {
  const [transactionOpen, setTransactionOpen] = useState<boolean>(false);
  const transactionType = useRef<"borrow_more" | "receive" | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  // Transaction starts
  const handleBorrowMore = () => {
    transactionType.current = "borrow_more";
    setTransactionOpen(true);
  };

  const handleReceive = () => {
    transactionType.current = "receive";
    setTransactionOpen(true);
  };

  const handleCancelTransaction = () => {
    transactionType.current = null;
    setTransactionOpen(false);
  };

  const transactionOnFinish: FormProps<transcationFieldType>["onFinish"] = (
    values: transcationFieldType
  ) => {
    console.log("Success:", values);
  };
  // Transaction ends

  return (
    <div className="flex flex-col gap-5">
      <span className="text-[20px]">Aliyev Dilshod ni tranzaksiyalari</span>
      <div className="grid grid-cols-3 gap-8 px-3">
        <div className="flex flex-col items-center cursor-pointer text-green-600 hover:text-green-700 transition duration-150">
          <div
            className="p-3 border-2 border-green-600 rounded-full bg-green-100/50"
            onClick={handleBorrowMore}
          >
            <ArrowUp className="h-8 w-8" />
          </div>
          <span className="text-sm font-medium mt-1 text-center">
            Koproq qarz berish
          </span>
        </div>

        <div className="flex flex-col items-center cursor-pointer text-red-600 hover:text-red-700 transition duration-150">
          <div
            className="p-3 border-2 border-red-600 rounded-full bg-red-100/50"
            onClick={handleReceive}
          >
            <ArrowDown className="h-8 w-8" />
          </div>
          <span className="text-sm font-medium mt-1 text-center">
            Qabul qilish
          </span>
        </div>

        <div className="flex flex-col items-center cursor-pointer text-blue-600 hover:text-blue-700 transition duration-150">
          <div className="p-3 border-2 border-blue-600 rounded-full bg-blue-100/50">
            <CheckCircle className="h-8 w-8" />
          </div>
          <span className="text-sm font-medium mt-1 text-center">Tugatish</span>
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
                    <a
                      title={trd.customer.full_name}
                      className="text-[17px] font-bold text-green-600 line-clamp-1"
                    >
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
                    <div className="flex flex-col justify-start">
                      <span title="Keyingi Balans" className="text-[16px] font-medium text-[#6B7280] line-clamp-1">
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
                    <div className="flex flex-col justify-start">
                      <span className="text-[16px] font-medium text-[#6B7280]">
                        Tugash sanasi
                      </span>
                      <span
                        title={trd.due_date.toLocaleString("uz-UZ")}
                        className="text-[17px] font-bold text-[#4B5563] line-clamp-1"
                      >
                        {trd.due_date.toLocaleString("uz-UZ")}
                      </span>
                    </div>
                    <div className="flex flex-col justify-start">
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
                      <span
                        title={trd.description}
                        className="text-[17px] font-bold text-[#4B5563] line-clamp-1"
                      >
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
                      <span
                        title={trd.created_at.toLocaleString("uz-UZ")}
                        className="text-[17px] font-bold text-[#4B5563] line-clamp-1"
                      >
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

      <Modal
        centered
        title={"Koproq qarz berish"}
        closable={{ "aria-label": "Custom Close Button" }}
        open={transactionOpen}
        onCancel={handleCancelTransaction}
        footer={
          <div className="flex gap-2 justify-end">
            <AntdButton
              className="bg-red-500! text-white!"
              onClick={handleCancelTransaction}
            >
              Bekor qilish
            </AntdButton>
            <AntdButton
              onClick={() => form.submit()}
              className="bg-green-500! text-white!"
            >
              Tasdiqlash
            </AntdButton>
          </div>
        }
      >
        <div className="mt-6">
          <Form name="basic" onFinish={transactionOnFinish} form={form}>
            <div>
              <span className="flex mb-1 font-medium text-[15px]">
                To'lov summasi
              </span>
              <Form.Item<transcationFieldType>
                name="amount"
                rules={[
                  {
                    required: true,
                    message: "To'lov summasi kiritilishi shart!",
                  },
                ]}
              >
                <Input className="h-10!" placeholder="0.00 UZS" />
              </Form.Item>
            </div>

            <div>
              <span className="flex mb-1 font-medium text-[15px]">
                Izoh (ixtiyoriy)
              </span>
              <Form.Item<transcationFieldType> name="description">
                <Input.TextArea
                  className="h-17!"
                  autoSize={false}
                  placeholder="Izoh"
                />
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default memo(CustomerTransactionDetails);

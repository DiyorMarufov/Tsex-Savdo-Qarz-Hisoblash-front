import { memo, useEffect, useRef, useState } from "react";
import ProTable from "@ant-design/pro-table";
import { transactionDetailColumns } from "./model/customer-transactions-detail-model";
import { ArrowDown, ArrowUp, CheckCircle } from "lucide-react";
import { Modal, type FormProps, Button as AntdButton, Form, Input } from "antd";
import { useCustomerTransaction } from "../../../shared/lib/apis/customer-transactions/useCustomerTransaction";
import { useParams } from "react-router-dom";
import CustomerTransactionDetailMobileList from "../../../widgets/customers/CustomerTransactionDetailMobileList/CustomerTransactionDetailMobileList";

type transcationFieldType = {
  amount: number;
  description?: string;
};

const CustomerTransactionDetails = () => {
  const [transactionOpen, setTransactionOpen] = useState<boolean>(false);
  const transactionType = useRef<"borrow_more" | "receive" | null>(null);
  const [form] = Form.useForm();
  const { id } = useParams();

  const { getCustomerTransactionsDetailByParentTransactionId } =
    useCustomerTransaction();

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

  // CustomerTransactionDetail starts
  const {
    data: customerTransactionDetails,
    isLoading: customerTransactionDetailLoading,
  } = getCustomerTransactionsDetailByParentTransactionId(id as string);
  const transactionDetails = customerTransactionDetails?.data?.data;
  // CustomerTransactionDetail ends

  return (
    <div className="flex flex-col gap-5">
      <span className="text-[20px] font-medium text-[#4B5563]">
        Aliyev Dilshod ni tranzaksiyalari
      </span>
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
          dataSource={transactionDetails}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            responsive: false,
          }}
          columns={transactionDetailColumns}
          search={false}
          dateFormatter="string"
          scroll={{ x: "max-content" }}
          loading={customerTransactionDetailLoading}
        />
      </div>

      <CustomerTransactionDetailMobileList
        data={transactionDetails}
        loading={customerTransactionDetailLoading}
      />

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

import { memo, useEffect, useRef, useState } from "react";
import ProTable from "@ant-design/pro-table";
import { transactionDetailColumns } from "./model/customer-transactions-detail-model";
import { Modal, type FormProps, Button as AntdButton, Form, Input } from "antd";
import { useCustomerTransaction } from "../../../shared/lib/apis/customer-transactions/useCustomerTransaction";
import { useParams } from "react-router-dom";
import CustomerTransactionDetailMobileList from "../../../widgets/customers/CustomerTransactionDetailMobileList/CustomerTransactionDetailMobileList";
import NameSkeleton from "../../../shared/ui/Skeletons/NameSkeleton/NameSkeleton";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import CustomerTransactionDetailTransactions from "../../../widgets/superadmin/customers/CustomerTransactionDetailTransactions/CustomerTransactionDetailTransactions";

type transcationFieldType = {
  amount: number;
  description?: string;
};

const CustomerTransactionDetails = () => {
  const [transactionOpen, setTransactionOpen] = useState<boolean>(false);
  const transactionType = useRef<"borrow_more" | "receive" | null>(null);
  const [form] = Form.useForm();
  const { id } = useParams();
  const { getParam } = useParamsHook();

  const type = getParam("type") || "";

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

  const handleFinish = () => {
    console.log("Tugatish jarayoni boshlandi");
    // Agar tugatish uchun ham modal ochmoqchi bo'lsangiz, shu yerda open qilasiz
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
      {customerTransactionDetailLoading ? (
        <NameSkeleton />
      ) : (
        <span className="text-[20px] font-medium text-[#4B5563]">
          {customerTransactionDetails?.[0]?.customer.full_name
            ? customerTransactionDetails?.[0]?.customer.full_name
            : "Hozircha no'malum"}{" "}
          ni tranzaksiyalari
        </span>
      )}

      <CustomerTransactionDetailTransactions
        type={type}
        handleActionMore={handleBorrowMore}
        handlePayment={handleReceive}
        handleFinish={handleFinish}
      />

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

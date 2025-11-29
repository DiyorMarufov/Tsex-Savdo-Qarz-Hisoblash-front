import { memo, useRef, useState } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import SmallTitle from "../../../shared/ui/Title/SmallTitle/SmallTitle";
import {
  Button as AntdButton,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  type FormProps,
} from "antd";
import { ArrowDown, ArrowUp, Plus } from "lucide-react";
import Button from "../../../shared/ui/Button/Button";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import ProTable from "@ant-design/pro-table";
import { customerColumns, fakeCustomerData } from "./model/customers-model";
import {
  fakeTransactionData,
  transactionColumns,
} from "./model/customer-transactions-model";

type transcationFieldType = {
  customer_id: string;
  amount: number;
  due_date?: Date;
  description?: string;
};

type newCustomerFieldType = {
  full_name: string;
  phone_number: string;
  region: string;
};

const CustomersPage = () => {
  const [transactionOpen, setTransactionOpen] = useState<boolean>(false);
  const transactionType = useRef<"lend" | "borrow" | null>(null);
  const [newCustomerOpen, setNewCustomerOpen] = useState<boolean>(false);
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const customerId = useRef<string | null>(null);
  const [form] = Form.useForm();

  // Transaction starts
  const handleLend = () => {
    transactionType.current = "lend";
    setTransactionOpen(true);
  };

  const handleBorrow = () => {
    transactionType.current = "borrow";
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

  // New Customer starts
  const handleNewCustomer = () => {
    setNewCustomerOpen(true);
  };

  const handleCancelNewCustomer = () => {
    setNewCustomerOpen(false);
  };

  const newCustomerOnFinish: FormProps<transcationFieldType>["onFinish"] = (
    values: transcationFieldType
  ) => {
    console.log("Success:", values);
  };
  // New Customer ends

  // Detail starts
  const handleOpenDetail = (id: string) => {
    customerId.current = id;
    setOpenDetail(true);
  };

  const handleCancelDetail = () => {
    setOpenDetail(false);
  };
  // Detail ends

  return (
    <div>
      <div className="flex items-center justify-between gap-3 max-[1300px]:flex-wrap">
        <div>
          <LargeTitle title="Mijozlar" />
          <SmallTitle title="Qarzdorlik va hisob-kitoblarining joriy balansini kuzatish" />
        </div>

        <div className="grid grid-cols-3 gap-3 max-[1300px]:w-full max-[830px]:grid-cols-2 max-[365px]:grid-cols-1">
          <AntdButton
            className="py-5! rounded-[10px]! bg-[#E5E7EB]! max-[1300px]:w-full"
            onClick={handleLend}
          >
            {" "}
            <ArrowDown />
            Qarz berish
          </AntdButton>
          <AntdButton
            className="py-5! rounded-[10px]! bg-[#E5E7EB]! max-[1300px]:w-full"
            onClick={handleBorrow}
          >
            {" "}
            <ArrowUp />
            Qarz olish
          </AntdButton>
          <Button
            className="rounded-[10px]! max-[1300px]:w-full max-[830px]:col-span-2! max-[365px]:col-span-1!"
            onClick={handleNewCustomer}
          >
            <Plus />
            Yangi mijoz
          </Button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-5 max-[1250px]:grid-cols-2 max-[500px]:grid-cols-1">
        <div className="border border-bg-fy bg-[#ffffff] rounded-2xl p-7 flex flex-col gap-1 max-[500px]:items-center">
          <span className="text-[22px] font-medium text-bg-py max-[900px]:text-[20px] max-[500px]:text-[17px]">
            Jami qarzdorlik
          </span>
          <span className="font-bold text-[30px] text-green-600 max-[900px]:text-[25px] max-[500px]:text-[22px]">
            15,200,000 usz
          </span>
        </div>
        <div className="border border-bg-fy bg-[#ffffff] rounded-2xl p-7 flex flex-col gap-1 max-[500px]:items-center">
          <span className="text-[22px] font-medium text-bg-py max-[900px]:text-[20px] max-[500px]:text-[17px]">
            Jami haqdorlik
          </span>
          <span className="font-bold text-[30px] text-red-600 max-[900px]:text-[25px] max-[500px]:text-[22px]">
            15,200,000 usz
          </span>
        </div>
        <div
          className="border border-[#e5e5e5] bg-white rounded-2xl p-7 flex flex-col gap-1
                max-[1250px]:col-span-2 max-[1250px]:items-center
                max-[500px]:col-span-1"
        >
          <span className="text-[22px] font-medium text-bg-py max-[900px]:text-[20px] max-[500px]:text-[17px]">
            Umumiy balans
          </span>
          <span className="font-bold text-[30px] text-green-600 max-[900px]:text-[25px] max-[500px]:text-[22px]">
            +15,200,000 usz
          </span>
        </div>
      </div>

      <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] mt-6 p-[17px] flex items-center gap-5 max-[960px]:flex-wrap">
        <SearchInput
          placeholder="Tsex nomi yoki operatsiya bo'yicha qidirish"
          className="h-12! bg-bg-ty! text-[17px]!"
        />
        <div className="max-[960px]:w-full">
          <DatePicker
            className="h-12! bg-bg-ty! text-[17px]! w-[300px] max-[960px]:w-full!"
            placeholder="YYYY-MM-DD"
            inputReadOnly={true}
          />
        </div>
      </div>

      <div className="mt-4">
        <ProTable
          dataSource={fakeCustomerData}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            responsive: false,
          }}
          columns={customerColumns(handleOpenDetail)}
          search={false}
          dateFormatter="string"
          scroll={{ x: "max-content" }}
        />
      </div>

      <Modal
        centered
        title={
          transactionType.current === "lend" ? "Qarz berish" : "Qarz olish"
        }
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
                Sotib oluvchi
              </span>
              <Form.Item<transcationFieldType>
                name="customer_id"
                rules={[
                  {
                    required: true,
                    message: "Sotib olunivchi tanlanishi shart!",
                  },
                ]}
              >
                <Select className="h-10!" />
              </Form.Item>
            </div>

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
                Qaytarish muddati (ixtiyoriy)
              </span>
              <Form.Item<transcationFieldType>
                name="due_date"
                className="w-full!"
              >
                <DatePicker
                  className="h-10! w-full"
                  placeholder="YYYY-MM-DD"
                  inputReadOnly={true}
                />
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

      <Modal
        centered
        title="Yengi mijoz qo'shish"
        closable={{ "aria-label": "Custom Close Button" }}
        open={newCustomerOpen}
        onCancel={handleCancelNewCustomer}
        footer={
          <div className="flex gap-2 justify-end">
            <AntdButton
              className="bg-red-500! text-white!"
              onClick={handleCancelNewCustomer}
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
          <Form name="basic" onFinish={newCustomerOnFinish} form={form}>
            <div>
              <span className="flex mb-1 font-medium text-[15px]">
                To'liq ismi
              </span>
              <Form.Item<newCustomerFieldType>
                name="full_name"
                rules={[
                  {
                    required: true,
                    message: "Mijozning to'liq ismi kiritilishi shart!",
                  },
                ]}
              >
                <Input className="h-10!" placeholder="To'liq ism" />
              </Form.Item>
            </div>

            <div>
              <span className="flex mb-1 font-medium text-[15px]">
                To'lov summasi
              </span>
              <Form.Item<newCustomerFieldType>
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: "Mijozning tel raqami kiritilishi shart!",
                  },
                ]}
              >
                <Input className="h-10!" placeholder="0.00 UZS" />
              </Form.Item>
            </div>

            <div>
              <span className="flex mb-1 font-medium text-[15px]">
                Viloyat/Shahar
              </span>
              <Form.Item<newCustomerFieldType>
                name="region"
                className="w-full!"
              >
                <Select
                  className="h-10! w-full"
                  placeholder="Viloyat/Shahar tanlash"
                />
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>

      <Modal
        centered
        title="Moliya tarixi"
        closable={{ "aria-label": "Custom Close Button" }}
        open={openDetail}
        onCancel={handleCancelDetail}
        footer={
          <div className="flex gap-2 justify-end">
            <AntdButton
              className="bg-red-500! text-white!"
              onClick={handleCancelDetail}
            >
              Bekor qilish
            </AntdButton>
          </div>
        }
      >
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
          style={{ width: "100%" }}
        />
      </Modal>
    </div>
  );
};

export default memo(CustomersPage);

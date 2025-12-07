import { memo, useEffect, useRef, useState } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import {
  Button as AntdButton,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  type FormProps,
} from "antd";
import { ArrowDown, ArrowUp, Edit, Plus, Trash } from "lucide-react";
import Button from "../../../shared/ui/Button/Button";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import ProTable from "@ant-design/pro-table";
import {
  customerColumns,
  fakeCustomerData,
  type CustomersListItemsType,
} from "./model/customers-model";
import CountUp from "react-countup";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

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
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);
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
    navigate(`detail/${id}`);
  };

  // Detail ends

  if (pathname.startsWith("/superadmin/customers/detail/")) return <Outlet />;

  return (
    <div>
      <div className="flex items-center justify-between gap-3 max-[1300px]:flex-wrap">
        <div>
          <LargeTitle title="Mijozlar" />
        </div>

        <div className="grid grid-cols-3 gap-3 max-[1300px]:w-full max-[830px]:grid-cols-2 max-[365px]:grid-cols-1 max-[500px]:hidden">
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

        <div className="grid grid-cols-3 gap-8 px-3 w-full min-[500px]:hidden">
          <div className="flex flex-col items-center cursor-pointer text-green-600 hover:text-green-700 transition duration-150">
            <div
              className="p-3 border-2 border-green-600 rounded-full bg-green-100/50"
              onClick={handleLend}
            >
              <ArrowUp className="h-8 w-8" />
            </div>
            <span className="text-sm font-medium mt-1 whitespace-nowrap text-center">
              Qarz berish
            </span>
          </div>

          <div className="flex flex-col items-center cursor-pointer text-red-600 hover:text-red-700 transition duration-150">
            <div
              className="p-3 border-2 border-red-600 rounded-full bg-red-100/50"
              onClick={handleBorrow}
            >
              <ArrowDown className="h-8 w-8" />
            </div>
            <span className="text-sm font-medium mt-1 whitespace-nowrap text-center">
              Qarz olish
            </span>
          </div>

          <div className="flex flex-col items-center cursor-pointer text-blue-600 hover:text-blue-700 transition duration-150">
            <div
              className="p-3 border-2 border-blue-600 rounded-full bg-blue-100/50"
              onClick={handleNewCustomer}
            >
              <Plus className="h-8 w-8" />
            </div>
            <span className="text-sm font-medium mt-1 whitespace-nowrap text-center">
              Yengi mijoz
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-5 max-[1250px]:grid-cols-2 max-[500px]:grid-cols-1">
        <div className="border border-bg-fy bg-[#ffffff] rounded-2xl p-7 flex flex-col gap-1 max-[500px]:items-center">
          <span className="text-[22px] font-medium text-bg-py max-[900px]:text-[20px] max-[500px]:text-[17px]">
            Jami haqdorlik
          </span>
          <span className="font-bold text-[30px] text-green-600 max-[900px]:text-[25px] max-[500px]:text-[22px]">
            <CountUp
              start={0}
              end={15200000}
              duration={2.5}
              separator=","
              decimal="."
              suffix=" UZS"
            />
          </span>
        </div>
        <div className="border border-bg-fy bg-[#ffffff] rounded-2xl p-7 flex flex-col gap-1 max-[500px]:items-center">
          <span className="text-[22px] font-medium text-bg-py max-[900px]:text-[20px] max-[500px]:text-[17px]">
            Jami qarzdorlik
          </span>
          <span className="font-bold text-[30px] text-red-600 max-[900px]:text-[25px] max-[500px]:text-[22px]">
            <CountUp
              start={0}
              end={-15200000}
              duration={2.5}
              separator=","
              decimal="."
              suffix=" UZS"
            />
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
            +
            <CountUp
              start={0}
              end={15200000}
              duration={2.5}
              separator=","
              decimal="."
              suffix=" UZS"
            />
          </span>
        </div>
      </div>

      <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] mt-6 p-3.5 flex items-center gap-5 max-[960px]:flex-wrap">
        <SearchInput
          placeholder="Tsex nomi yoki operatsiya bo'yicha qidirish"
          className="h-12! bg-bg-ty! text-[17px]!"
        />
        <div className="max-[960px]:w-full">
          <Select
            className="h-12! bg-bg-ty! text-[17px]! w-[300px] max-[960px]:w-full!"
            placeholder="Viloyat/Shahar"
          />
        </div>
      </div>

      <div className="mt-4 max-[500px]:hidden">
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

      <div className="mt-4 min-[500px]:hidden flex flex-col gap-5">
        {fakeCustomerData.map((cs: CustomersListItemsType) => (
          <div
            key={cs.id}
            className="flex flex-col gap-3 border border-bg-fy bg-[#ffffff] rounded-[12px] overflow-hidden"
          >
            <div className="flex justify-between items-center gap-3 pt-3 px-3.5">
              <div className="flex flex-col items-start">
                <a
                  className="text-[16px] font-bold"
                >
                  {cs.full_name}
                </a>
                <span
                  className="text-[15px] font-bold text-[#64748B]"
                >
                  {cs.region}
                </span>
              </div>
              <div className="flex flex-col items-end">
                {cs.balance > 0 ? (
                  <span className="text-[16px] font-bold text-red-500">
                    -{Math.abs(cs.balance).toLocaleString()}
                  </span>
                ) : (
                  <span className="text-[16px] font-bold text-green-500">
                    {Math.abs(cs.balance).toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col px-3.5">
              <div className="flex justify-between gap-3">
                <span
                  className="text-[15px] font-medium text-[#6B7280]"
                >
                  Telefon raqami
                </span>
                <span
                  className="text-[16px] font-bold text-[#4B5563]"
                >
                  {cs.phone_number}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span
                  className="text-[15px] font-medium text-[#6B7280]"
                >
                  Oxirgi tranzaksiya
                </span>
                <span
                  className="text-[16px] font-bold text-[#4B5563]"
                >
                  {cs.last_transaction.toLocaleString("uz-UZ")}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span title="Kiritilgan sana" className="text-[15px] font-medium text-[#6B7280]">
                  Kiritilgan sana
                </span>
                <span
                  className="text-[16px] font-bold text-[#4B5563]"
                >
                  {cs.created_at.toLocaleString("uz-UZ")}
                </span>
              </div>
            </div>

            <div className="w-full h-px bg-bg-fy"></div>

            <div className="flex justify-between mt-1 px-3.5 pb-4">
              <div className="flex items-center gap-5">
                <Edit className="text-green-600 cursor-pointer hover:opacity-80" />
                <Trash className="text-red-600 cursor-pointer hover:opacity-80" />
              </div>
              <div>
                <AntdButton
                  className="bg-[#1D4ED8]! text-white!"
                  onClick={() => handleOpenDetail(cs.id as string)}
                >
                  Batafsil
                </AntdButton>
              </div>
            </div>
          </div>
        ))}
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
              <span className="flex mb-1 font-medium text-[15px]">Mijoz</span>
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
                    message: "To'liq ism kiritilishi shart!",
                  },
                ]}
              >
                <Input className="h-10!" placeholder="To'liq ism" />
              </Form.Item>
            </div>

            <div>
              <span className="flex mb-1 font-medium text-[15px]">
                Tel raqami
              </span>
              <Form.Item<newCustomerFieldType>
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: "Tel raqam kiritilishi shart!",
                  },
                ]}
              >
                <Input className="h-10!" placeholder="+998" />
              </Form.Item>
            </div>

            <div>
              <span className="flex mb-1 font-medium text-[15px]">
                Viloyat/Shahar
              </span>
              <Form.Item<newCustomerFieldType>
                name="region"
                className="w-full!"
                rules={[
                  {
                    required: true,
                    message: "Viloyat yoki shahar tanlanishi shart!",
                  },
                ]}
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
    </div>
  );
};

export default memo(CustomersPage);

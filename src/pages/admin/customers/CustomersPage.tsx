import ProTable from "@ant-design/pro-table";
import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import {
  Select,
  Button as AntdButton,
  Modal,
  Form,
  type FormProps,
  Input,
} from "antd";
import Button from "../../../shared/ui/Button/Button";
// import { Edit, Trash } from "lucide-react";
import { Plus } from "lucide-react";
import type { NewCustomerFieldType } from "../../../shared/lib/types";
import { customerColumns } from "../../../shared/lib/model/customers/customers-model";

const AdminCustomersPage = () => {
  const [newCustomerOpen, setNewCustomerOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // NewCustomer create starts
  const handleNewCustomer = () => {
    setNewCustomerOpen(true);
  };

  const handleCancelNewCustomer = () => {
    setNewCustomerOpen(false);
  };

  const transactionOnFinish: FormProps<NewCustomerFieldType>["onFinish"] = (
    values: NewCustomerFieldType,
  ) => {
    console.log("Success:", values);
  };
  // NewCustomer create ends

  // Detail starts
  const handleOpenDetail = (id: string) => {
    navigate(`detail/${id}`);
  };

  // Detail ends
  return (
    <div>
      <div className="flex justify-between gap-3">
        <LargeTitle title="Mijozlar" />
        <div className="max-[500px]:hidden">
          <Button onClick={handleNewCustomer}>
            <Plus />
            Yengi mijoz qo'shish
          </Button>
        </div>

        <div
          className="min-[500px]:hidden p-2.5 rounded-full bg-green-500 cursor-pointer hover:opacity-80"
          onClick={handleNewCustomer}
        >
          <Plus className="text-white" />
        </div>
      </div>

      <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] mt-2 p-3.5 flex items-center gap-3 max-[960px]:flex-wrap">
        <SearchInput
          placeholder="Mijoz ismi yoki tel raqami bo'yicha qidirish"
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
          // dataSource={fakeCustomerData}
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

      {/* <div className="mt-4 min-[500px]:hidden flex flex-col gap-5">
        {fakeCustomerData.map((cs: CustomersListItemsType) => (
          <div
            key={cs.id}
            className="flex flex-col gap-3 border border-bg-fy bg-[#ffffff] rounded-[12px] overflow-hidden"
          >
            <div className="flex justify-between items-center gap-3 pt-2.5 px-3.5">
              <div className="flex flex-col items-start">
                <a className="text-[16px] font-bold">{cs.full_name}</a>
                <span className="text-[15px] font-bold text-[#64748B]">
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
                <span className="text-[15px] font-medium text-[#6B7280]">
                  Telefon raqami
                </span>
                <span className="text-[16px] font-bold text-[#4B5563]">
                  {cs.phone_number}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[15px] font-medium text-[#6B7280]">
                  Oxirgi tranzaksiya
                </span>
                <span className="text-[16px] font-bold text-[#4B5563]">
                  {cs.last_transaction.toLocaleString("uz-UZ")}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span
                  title="Kiritilgan sana"
                  className="text-[15px] font-medium text-[#6B7280]"
                >
                  Kiritilgan sana
                </span>
                <span className="text-[16px] font-bold text-[#4B5563]">
                  {cs.created_at.toLocaleString("uz-UZ")}
                </span>
              </div>
            </div>

            <div className="w-full h-px bg-bg-fy"></div>

            <div className="flex items-center justify-between px-3.5 pb-3">
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
      </div> */}

      <Modal
        centered
        title="Mijoz yaratish"
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
          <Form name="basic" onFinish={transactionOnFinish} form={form}>
            <div>
              <span className="flex mb-1 font-medium text-[15px]">
                Mijoz ismi
              </span>
              <Form.Item<NewCustomerFieldType>
                name="full_name"
                rules={[
                  {
                    required: true,
                    message: "Mijoz to'liq ismi kiritilishi shart!",
                  },
                ]}
              >
                <Input className="h-10!" placeholder="To'liq ismi" />
              </Form.Item>
            </div>

            <div>
              <span className="flex mb-1 font-medium text-[15px]">
                Tel raqami
              </span>
              <Form.Item<NewCustomerFieldType>
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: "Mijoz tel raqami kiritilishi shart!",
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
              <Form.Item<NewCustomerFieldType>
                name="region"
                className="w-full!"
                rules={[
                  {
                    required: true,
                    message: "Mijoz viloyat/shahar tanlanishi shart!",
                  },
                ]}
              >
                <Select placeholder="Viloyat/Shahar" />
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default memo(AdminCustomersPage);

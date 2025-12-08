import { memo, useEffect, useState } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import Button from "../../../shared/ui/Button/Button";
import { Edit, Plus, Trash } from "lucide-react";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import Filter from "../../../shared/ui/Filter/Filter";
import ProTable from "@ant-design/pro-table";
import {
  fakeUsers,
  userColumns,
  type UsersTableListItem,
} from "./model/users-model";
import {
  Modal,
  type FormProps,
  Button as AntdButton,
  Form,
  Input,
  Select,
} from "antd";

type userFieldType = {
  full_name: string;
  phone_number: string;
  password: string;
  role: "admin" | "tsex_manager";
};

const UsersPage = () => {
  const [newUserOpen, setNewUserOpen] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);
  // New user starts
  const handleNewUser = () => {
    setNewUserOpen(true);
  };

  const handleCancelNewUser = () => {
    setNewUserOpen(false);
  };

  const newUserOnFinish: FormProps<userFieldType>["onFinish"] = (
    values: userFieldType
  ) => {
    console.log("Success:", values);
  };
  // New user ends

  return (
    <div>
      <div className="flex justify-between gap-3 items-center max-[750px]:flex-wrap">
        <div>
          <LargeTitle title="Foydalanuvchilar" />
        </div>

        <Button
          className="max-[750px]:w-full! max-[500px]:hidden!"
          onClick={handleNewUser}
        >
          <Plus />
          Foydalanuvchi qo'shish
        </Button>

        <div
          className="min-[500px]:hidden p-2.5 rounded-full bg-green-500 cursor-pointer hover:opacity-80"
          onClick={handleNewUser}
        >
          <Plus className="text-white" />
        </div>
      </div>

      <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] mt-3 p-3.5 flex items-center gap-4 max-[900px]:flex-wrap">
        <SearchInput
          placeholder="Ismi yoki telefon raqami bo'yicha qidirish"
          className="h-12! min-[900px]:w-[50%]! bg-bg-ty! text-[17px]!"
        />
        <div className="flex gap-4 min-[900px]:w-[50%] max-[900px]:w-full max-[370px]:flex-wrap">
          <Filter
            placeholder="Rol bo'yicha"
            className="h-12! min-[900px]:w-[50%]! max-[900px]:w-full! custom-select"
          />
          <Filter
            placeholder="Status bo'yicha"
            className="h-12! min-[900px]:w-[50%]! max-[900px]:w-full! custom-select"
          />
        </div>
      </div>

      <div className="mt-4 max-[500px]:hidden">
        <ProTable
          dataSource={fakeUsers}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            responsive: false,
          }}
          columns={userColumns}
          search={false}
          dateFormatter="string"
          headerTitle="Mahsulotlar"
          scroll={{ x: "max-content" }}
        />
      </div>

      <div className="min-[500px]:hidden flex flex-col gap-5 mt-4">
        {fakeUsers.map((user: UsersTableListItem) => (
          <div
            key={user.id}
            className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px]"
          >
            <div className="flex justify-between px-3.5 py-2.5">
              <div className="flex flex-col">
                <a className="text-[16px] font-bold">{user.full_name}</a>
                <span className="text-[15px] font-bold text-[#4B5563]">
                  {user.phone_number}
                </span>
              </div>
              <div className="flex items-center gap-5">
                <Edit className="text-green-600 cursor-pointer hover:opacity-80" />
                <Trash className="text-red-600 cursor-pointer hover:opacity-80" />
              </div>
            </div>

            <div className="w-full h-px bg-bg-fy"></div>

            <div className="flex flex-col px-3.5 py-2.5 gap-2">
              <div className="flex justify-between">
                <span className="font-medium text-[#6B7280] text-[15px]">
                  Roli
                </span>
                <span className="text-[16px] font-bold text-[#4B5563]">
                  {user.roles.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-[#6B7280] text-[15px]">
                  Faolligi
                </span>
                {user.is_active ? (
                  <div className="px-2 rounded-full bg-green-100 flex justify-center items-center">
                    <span className="font-bold text-green-500 text-[12px]">Faol</span>
                  </div>
                ) : (
                  <div className="px-2 rounded-full bg-red-100 flex justify-center items-center">
                    <span className="font-bold text-red-500 text-[12px]">Nofaol</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-[#6B7280] text-[15px]">
                  Kiritilgan sana
                </span>
                <span className="text-[16px] font-bold text-[#4B5563]">
                  {user.created_at.toLocaleString("uz-UZ")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        centered
        title="Foydalanuvchi yaratish"
        closable={{ "aria-label": "Custom Close Button" }}
        open={newUserOpen}
        onCancel={handleCancelNewUser}
        footer={
          <div className="flex gap-2 justify-end">
            <AntdButton
              className="bg-red-500! text-white!"
              onClick={handleCancelNewUser}
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
          <Form name="basic" onFinish={newUserOnFinish} form={form}>
            <div>
              <span className="flex mb-1 font-medium text-[15px]">
                To'liq ismi
              </span>
              <Form.Item<userFieldType>
                name="full_name"
                rules={[
                  {
                    required: true,
                    message: "To'liq ism kiritish shart!",
                  },
                ]}
              >
                <Input className="h-10!" />
              </Form.Item>
            </div>

            <div>
              <span className="flex mb-1 font-medium text-[15px]">
                Tel raqami
              </span>
              <Form.Item<userFieldType>
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: "Tel raqami kiritilishi shart !",
                  },
                ]}
              >
                <Input className="h-10!" />
              </Form.Item>
            </div>

            <div>
              <span className="flex mb-1 font-medium text-[15px]">Parol</span>
              <Form.Item<userFieldType>
                name="password"
                className="w-full!"
                rules={[
                  {
                    required: true,
                    message: "Parol kiritilishi shart!",
                  },
                ]}
              >
                <Input.Password className="h-10!" placeholder="****" />
              </Form.Item>
            </div>

            <div>
              <span className="flex mb-1 font-medium text-[15px]">Rol</span>
              <Form.Item<userFieldType>
                name="role"
                rules={[
                  {
                    required: true,
                    message: "Rol tanlanishi shart!",
                  },
                ]}
              >
                <Select className="h-10!" />
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default memo(UsersPage);

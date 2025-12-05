import { memo, useState } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import Button from "../../../shared/ui/Button/Button";
import { Plus } from "lucide-react";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import Filter from "../../../shared/ui/Filter/Filter";
import ProTable from "@ant-design/pro-table";
import { fakeUsers, userColumns } from "./model/users-model";
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

        <Button className="max-[750px]:w-full" onClick={handleNewUser}>
          <Plus />
          Foydalanuvchi qo'shish
        </Button>
      </div>

      <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] mt-6 p-[17px] flex items-center gap-4 max-[900px]:flex-wrap">
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

      <div className="mt-4">
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

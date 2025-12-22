import { memo, useEffect, useState } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import Button from "../../../shared/ui/Button/Button";
import { Plus } from "lucide-react";
import ProTable from "@ant-design/pro-table";
import { fakeUsers, userColumns } from "./model/users-model";
import { type FormProps, Form } from "antd";
import UserFilters from "../../../widgets/superadmin/users/UserFilters/UserFilters";
import UserMobileList from "../../../widgets/superadmin/users/UserMobileList/UserMobileList";
import AddUserModal from "../../../widgets/superadmin/users/AddUserModal/AddUserModal";

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

      <UserFilters />

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

      <UserMobileList data={fakeUsers} />

      <AddUserModal
        open={newUserOpen}
        onCancel={handleCancelNewUser}
        onFinish={newUserOnFinish}
        form={form}
      />
    </div>
  );
};

export default memo(UsersPage);

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import Button from "../../../shared/ui/Button/Button";
import { Plus } from "lucide-react";
import ProTable from "@ant-design/pro-table";
import { userColumns } from "./model/users-model";
import { type FormProps, Form } from "antd";
import UserFilters from "../../../widgets/superadmin/users/UserFilters/UserFilters";
import UserMobileList from "../../../widgets/superadmin/users/UserMobileList/UserMobileList";
import AddUserModal from "../../../widgets/superadmin/users/AddUserModal/AddUserModal";
import { useUser } from "../../../features/auth/api/useAuth/useUser";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import type { QueryParams } from "../../../shared/lib/types";
import { debounce } from "../../../shared/lib/functions/debounce";

type userFieldType = {
  full_name: string;
  phone_number: string;
  password: string;
  role: "admin" | "tsex_manager";
};

const UsersPage = () => {
  const [newUserOpen, setNewUserOpen] = useState<boolean>(false);
  const [form] = Form.useForm();

  const { getAllUsers } = useUser();
  const { getParam, setParams, removeParam } = useParamsHook();

  const [localSearch, setLocalSearch] = useState(getParam("search") || "");

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

  // Query starts
  const query: QueryParams = useMemo(() => {
    const page = Number(getParam("page")) || 1;
    const limit = Number(getParam("limit")) || 5;
    const search = getParam("search") || undefined;
    const role = getParam("role") || undefined;
    const status = getParam("status") || undefined;

    return { page, limit, search, role, status };
  }, [getParam]);
  // Query ends

  // UserData starts
  const { data: allUsers, isLoading: usersLoading } = getAllUsers(query);
  const users = allUsers?.data?.data;
  const total = allUsers?.data?.total || 0;

  // UserData ends

  // PageChange starts
  const handlePageChange = (newPage: number, newPageSize?: number) => {
    const updateParams: { page?: number; limit?: number } = {};

    if (newPage > 1) {
      updateParams.page = newPage;
    }

    if (newPageSize && newPageSize !== 5) {
      updateParams.limit = newPageSize;
    }

    setParams(updateParams);

    if (newPage === 1) {
      removeParam("page");
    }
    if (newPageSize === 5 && getParam("limit")) {
      removeParam("limit");
    }
  };
  // PageChange ends

  // Search starts
  const debouncedSetSearchQuery = useCallback(
    debounce((nextValue: string) => {
      setParams({
        search: nextValue || "",
        page: 1,
      });
    }, 500),
    [setParams]
  );

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    debouncedSetSearchQuery(value);
  };
  // Search ends

  // Handle filter starts
  const handleFilterChange = (key: "role" | "status", value: any) => {
    setParams({
      [key]: value || "",
      page: 1,
    });
  };

  const roleOptions = [
    {
      value: "",
      label: "Barcha rollar",
    },
    {
      value: "admin",
      label: "Admin",
    },
    {
      value: "seller",
      label: "Sotuvchi",
    },
    {
      value: "tsex_manager",
      label: "Tsex menejer",
    },
  ];

  const statusOptions = [
    {
      value: "",
      label: "Barcha statuslar",
    },
    {
      value: "true",
      label: "Aktiv",
    },
    {
      value: "false",
      label: "Inaktiv",
    },
  ];

  // Handle filter ends

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

      <UserFilters
        localSearch={localSearch}
        onSearchChange={handleSearchChange}
        role={query.role}
        status={query.status}
        roleOptions={roleOptions}
        statusOptions={statusOptions}
        onFilterChange={handleFilterChange}
      />

      <div className="mt-4 max-[500px]:hidden">
        <ProTable
          dataSource={users}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            responsive: false,
            current: query.page,
            pageSize: query.limit,
            total,
            onChange: handlePageChange,
          }}
          columns={userColumns}
          search={false}
          dateFormatter="string"
          headerTitle="Mahsulotlar"
          scroll={{ x: "max-content" }}
          loading={usersLoading}
        />
      </div>

      <UserMobileList
        data={users}
        isLoading={usersLoading}
        total={total}
        currentPage={Number(query.page)}
        pageSize={Number(query.limit)}
        onPageChange={handlePageChange}
      />

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

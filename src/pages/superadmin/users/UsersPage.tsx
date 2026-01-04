import { memo, useCallback, useEffect, useMemo, useState } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import Button from "../../../shared/ui/Button/Button";
import { Plus } from "lucide-react";
import ProTable from "@ant-design/pro-table";
import { type FormProps, Form } from "antd";
import UserFilters from "../../../widgets/superadmin/users/UserFilters/UserFilters";
import UserMobileList from "../../../widgets/superadmin/users/UserMobileList/UserMobileList";
import AddUserModal from "../../../widgets/superadmin/users/AddUserModal/AddUserModal";
import { useUser } from "../../../features/auth/api/useAuth/useUser";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import type { QueryParams, UserFieldType } from "../../../shared/lib/types";
import { debounce } from "../../../shared/lib/functions/debounce";
import { roleOptions, statusOptions } from "../../../shared/lib/constants";
import { useApiNotification } from "../../../shared/hooks/api-notification/useApiNotification";
import PlusButton from "../../../shared/ui/Button/PlusButton";
import { userColumns } from "../../../shared/lib/model/users/users-model";

const UsersPage = () => {
  const [newUserOpen, setNewUserOpen] = useState<boolean>(false);
  const [form] = Form.useForm();

  const { getAllUsers, createUser } = useUser();
  const { getParam, setParams, removeParam } = useParamsHook();
  const [localSearch, setLocalSearch] = useState(getParam("search") || "");

  const { handleApiError, handleSuccess } = useApiNotification();

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

  const newUserOnFinish: FormProps<UserFieldType>["onFinish"] = (
    values: UserFieldType,
  ) => {
    const { full_name, phone_number, password, role } = values;
    const data = {
      full_name,
      phone_number: phone_number.split(" ").join(""),
      password,
      role,
    };
    createUser.mutate(data, {
      onSuccess: () => {
        handleCancelNewUser();
        form.resetFields();
        handleSuccess("Foydalanuvchi muvaffaqiyatli yaratildi");
      },
      onError: (err: any) => {
        const status = err?.response?.data?.statusCode;
        const msg = err?.response?.data?.message;

        if (status === 409 && msg.startsWith("User with phone number")) {
          handleApiError(
            "Bunday tel raqamli yoki rolelik foydalanuvchi mavjud",
            "topRight",
          );
          return;
        } else {
          handleApiError("Serverda xato", "topRight");
          return;
        }
      },
    });
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
    [setParams],
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

  // Handle filter ends

  return (
    <div className="pb-12">
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

        <PlusButton setOpen={handleNewUser} />
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
            pageSizeOptions: [5, 10, 20, 50, 100],
          }}
          columns={userColumns}
          search={false}
          dateFormatter="string"
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
        loading={createUser.isPending}
      />
    </div>
  );
};

export default memo(UsersPage);

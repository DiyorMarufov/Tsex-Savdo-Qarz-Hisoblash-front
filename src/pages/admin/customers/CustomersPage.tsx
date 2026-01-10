import ProTable from "@ant-design/pro-table";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import { Form, type FormProps } from "antd";
import Button from "../../../shared/ui/Button/Button";
import { Plus } from "lucide-react";
import type {
  NewCustomerFieldType,
  QueryParams,
} from "../../../shared/lib/types";
import { customerColumns } from "../../../shared/lib/model/customers/customers-model";
import CustomerFilters from "../../../widgets/customers/CustomerFilters/CustomerFilters";
import CustomerMobileList from "../../../widgets/customers/CustomerMobileList/CustomerMobileList";
import AddCustomerModal from "../../../widgets/customers/AddCustomerModal/AddCustomerModal";
import { useCustomer } from "../../../shared/lib/apis/customers/useCustomer";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import { useApiNotification } from "../../../shared/hooks/api-notification/useApiNotification";
import { debounce } from "../../../shared/lib/functions/debounce";
import { customerRegions } from "../../../shared/lib/constants";
import PlusButton from "../../../shared/ui/Button/PlusButton";

const AdminCustomersPage = () => {
  const [newCustomerOpen, setNewCustomerOpen] = useState<boolean>(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { getParam, setParams, removeParam } = useParamsHook();
  const [localSearch, setLocalSearch] = useState(getParam("search") || "");
  const { getAllCustomers } = useCustomer();
  const { createCustomer } = useCustomer();
  const { handleApiError, handleSuccess } = useApiNotification();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  // New Customer starts
  const handleNewCustomer = () => {
    setNewCustomerOpen(true);
  };

  const handleCancelNewCustomer = () => {
    setNewCustomerOpen(false);
  };

  // Query starts
  const query: QueryParams = useMemo(() => {
    const page = Number(getParam("page")) || 1;
    const limit = Number(getParam("limit")) || 5;
    const search = getParam("search") || undefined;
    const region = getParam("region") || undefined;
    const is_archived = getParam("is_archived") || undefined;

    return { page, limit, search, region, is_archived };
  }, [getParam]);
  // Query ends

  const newCustomerOnFinish: FormProps<NewCustomerFieldType>["onFinish"] = (
    values: NewCustomerFieldType
  ) => {
    const { full_name, phone_number, region } = values;
    const data = {
      full_name,
      phone_number: phone_number.split(" ").join(""),
      region,
    };
    createCustomer.mutate(data, {
      onSuccess: () => {
        handleCancelNewCustomer();
        form.resetFields();
        handleSuccess("Mijoz muvaffaqiyatli yaratildi");
      },
      onError: (err: any) => {
        const status = err?.response?.data?.statusCode;
        switch (status) {
          case 409:
            handleApiError(
              `${phone_number} raqamli foydalanuvchi mavjud`,
              "topRight"
            );
            break;

          default:
            handleApiError("Serverda xato", "topRight");
            break;
        }
      },
    });
  };
  // New Customer ends

  // Detail starts
  const handleOpenDetail = (id: string) => {
    navigate(`transaction/${id}`);
  };
  // Detail ends

  // CustomerData starts
  const { data: allCustomers, isLoading: customerLoading } =
    getAllCustomers(query);
  const customers = allCustomers?.data?.data;
  const total = allCustomers?.data?.total || 0;
  // CustomerData ends

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

  // Filter starts
  const handleFilterChange = (key: string, value: string) => {
    setParams({
      [key]: value || "",
      page: 1,
    });
  };
  // Filter ends
  return (
    <div>
      <div className="flex justify-between gap-3">
        <LargeTitle title="Mijozlar" />
        <div className="max-[500px]:hidden">
          <Button onClick={handleNewCustomer}>
            <Plus />
            Yangi mijoz qo'shish
          </Button>
        </div>

        <PlusButton setOpen={handleNewCustomer} />
      </div>

      <CustomerFilters
        regionOptions={customerRegions || []}
        onSearchChange={handleSearchChange}
        searchValue={localSearch}
        regionValue={query.region}
        onFilterChange={handleFilterChange}
        isSuperadmin={false}
      />

      <div className="mt-4 max-[500px]:hidden">
        <ProTable
          dataSource={customers}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            responsive: false,
            current: query.page,
            pageSize: query.limit,
            total,
            onChange: handlePageChange,
          }}
          columns={customerColumns(handleOpenDetail)}
          search={false}
          dateFormatter="string"
          scroll={{ x: "max-content" }}
          loading={customerLoading}
        />
      </div>

      <CustomerMobileList
        data={customers}
        onDetail={handleOpenDetail}
        currentPage={query.page}
        pageSize={query.limit}
        total={total}
        onPageChange={handlePageChange}
        loading={customerLoading}
      />

      <AddCustomerModal
        open={newCustomerOpen}
        onCancel={handleCancelNewCustomer}
        onFinish={newCustomerOnFinish}
        form={form}
        loading={createCustomer.isPending}
      />
    </div>
  );
};

export default memo(AdminCustomersPage);

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import { Button as AntdButton, Form, type FormProps } from "antd";
import { ArrowDown, ArrowUp, Plus } from "lucide-react";
import Button from "../../../shared/ui/Button/Button";
import ProTable from "@ant-design/pro-table";
import { customerColumns } from "./model/customers-model";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CustomersBalances from "../../../widgets/superadmin/customers/Balances/CustomersBalances";
import CustomerFilters from "../../../widgets/customers/CustomerFilters/CustomerFilters";
import { useCustomer } from "../../../shared/lib/apis/customers/useCustomer";
import CustomerMobileList from "../../../widgets/customers/CustomerMobileList/CustomerMobileList";
import type {
  newCustomerFieldType,
  Option,
  QueryParams,
  transactionFieldType,
} from "../../../shared/lib/types";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import { debounce } from "../../../shared/lib/functions/debounce";
import { customerRegions } from "../../../shared/lib/constants";
import CustomerTransactionModal from "../../../widgets/superadmin/customers/CustomerTransactionModal/CustomerTransactionModal";
import AddCustomerModal from "../../../widgets/superadmin/customers/AddCustomerModal/AddCustomerModal";
import { useApiNotification } from "../../../shared/hooks/api-notification/useApiNotification";
import { formatPhoneNumber } from "../../../shared/lib/functions/formatPhoneNumber";
import { useCustomerTransaction } from "../../../shared/lib/apis/customer-transactions/useCustomerTransaction";

const CustomersPage = () => {
  const [transactionOpen, setTransactionOpen] = useState<boolean>(false);
  const [transactionType, setTransactionType] = useState<
    "lend" | "borrow" | null
  >(null);
  const [newCustomerOpen, setNewCustomerOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { getAllCustomers } = useCustomer();
  const { getParam, setParams, removeParam } = useParamsHook();
  const [localSearch, setLocalSearch] = useState(getParam("search") || "");
  const [form] = Form.useForm();

  const { createCustomer, getAllCustomersForTransaction } = useCustomer();
  const { createLend, createBorrow } = useCustomerTransaction();
  const { handleApiError, handleSuccess } = useApiNotification();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);
  // Transaction starts
  const handleLend = () => {
    setTransactionType("lend");
    setTransactionOpen(true);
  };

  const handleBorrow = () => {
    setTransactionType("borrow");
    setTransactionOpen(true);
  };

  const handleCancelTransaction = () => {
    setTransactionType(null);
    setTransactionOpen(false);
  };

  const transactionOnFinish: FormProps<transactionFieldType>["onFinish"] = (
    values: transactionFieldType
  ) => {
    const { customer_id, amount, description, due_date } = values;
    const data = {
      customer_id,
      amount: Number(amount.replace(/\D/g, "")),
      due_date,
      description,
    };
    switch (transactionType) {
      case "lend":
        createLend.mutate(data, {
          onSuccess: () => {
            handleCancelTransaction();
            form.resetFields();
            handleSuccess("Muvaffaqiyatli qarz berildi");
          },
          onError: (err: any) => {
            const status = err?.response?.data?.statusCode;
            const msg = err?.response?.data?.message;

            if (status === 404 && msg?.startsWith("Customer with ID")) {
              handleApiError(`Bunday mijoz mavjud emas`, "topRight");
              return;
            } else if (
              status === 409 &&
              msg === "This customer already has an active transaction"
            ) {
              handleApiError("Mijoz aktiv tranzaksiyaga ega", "topRight");
              return;
            } else if (status === 404 && msg.startsWith("User with ID")) {
              handleApiError("Superadmin mavjud emas", "topRight");
              return;
            } else if (status === 400 && msg === "Can't create past due_date") {
              handleApiError("Eski sanani tanlab bo'lmaydi", "topRight");
              return;
            } else {
              handleApiError("Serverda xato", "topRight");
              return;
            }
          },
        });
        break;

      case "borrow":
        createBorrow.mutate(data, {
          onSuccess: () => {
            handleCancelTransaction();
            form.resetFields();
            handleSuccess("Muvaffaqiyatli qarz olindi");
          },
          onError: (err: any) => {
            const status = err?.response?.data?.statusCode;
            const msg = err?.response?.data?.message;

            if (status === 404 && msg?.startsWith("Customer with ID")) {
              handleApiError(`Bunday mijoz mavjud emas`, "topRight");
              return;
            } else if (
              status === 409 &&
              msg === "This customer already has an active transaction"
            ) {
              handleApiError("Mijoz aktiv tranzaksiyaga ega", "topRight");
              return;
            } else if (status === 404 && msg.startsWith("User with ID")) {
              handleApiError("Superadmin mavjud emas", "topRight");
              return;
            } else if (status === 400 && msg === "Can't create past due_date") {
              handleApiError("Eski sanani tanlab bo'lmaydi", "topRight");
              return;
            } else {
              handleApiError("Serverda xato", "topRight");
              return;
            }
          },
        });
        break;
    }
  };
  // Transaction ends

  // New Customer starts
  const handleNewCustomer = () => {
    setNewCustomerOpen(true);
  };

  const handleCancelNewCustomer = () => {
    setNewCustomerOpen(false);
  };

  const newCustomerOnFinish: FormProps<newCustomerFieldType>["onFinish"] = (
    values: newCustomerFieldType
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

  // Query starts
  const query: QueryParams = useMemo(() => {
    const page = Number(getParam("page")) || 1;
    const limit = Number(getParam("limit")) || 5;
    const search = getParam("search") || undefined;
    const region = getParam("region") || undefined;

    return { page, limit, search, region };
  }, [getParam]);
  // Query ends

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

  // Customers list fro transaction starts
  const { data: allCustomersList } = getAllCustomersForTransaction();
  const customerOptions: Option[] =
    allCustomersList?.data.map((cs: any) => ({
      value: cs.id,
      label: (
        <div className="flex items-center justify-between w-full gap-4">
          <span className="font-medium text-slate-800 truncate">
            {cs.full_name}
          </span>
          <span className="text-[12px] text-slate-400 font-normal tabular-nums shrink-0">
            {formatPhoneNumber(cs.phone_number)}
          </span>
        </div>
      ),
    })) || [];

  // Customers list fro transaction ends

  if (pathname.startsWith("/superadmin/customers/transaction/"))
    return <Outlet />;

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

      <CustomersBalances />

      <CustomerFilters
        regionOptions={[
          { value: "", label: "Barcha shaharlar/viloyatlar" },
          ...(customerRegions || []),
        ]}
        onSearchChange={handleSearchChange}
        searchValue={localSearch}
        regionValue={query.region || ""}
        onRegionChange={handleFilterChange}
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

      <CustomerTransactionModal
        open={transactionOpen}
        onCancel={handleCancelTransaction}
        onFinish={transactionOnFinish}
        type={transactionType}
        customers={customerOptions}
        form={form}
        loading={createLend.isPending || createBorrow.isPending}
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

export default memo(CustomersPage);

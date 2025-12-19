import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { ArrowDown, ArrowUp, Plus } from "lucide-react";
import Button from "../../../shared/ui/Button/Button";
import ProTable from "@ant-design/pro-table";
import { customerColumns } from "./model/customers-model";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CustomersBalances from "../../../widgets/superadmin/customers/Balances/CustomersBalances";
import CustomerFilters from "../../../widgets/customers/CustomerFilters/CustomerFilters";
import { useCustomer } from "../../../shared/lib/apis/customers/useCustomer";
import CustomerMobileList from "../../../widgets/customers/CustomerMobileList/CustomerMobileList";
import type { QueryParams } from "../../../shared/lib/types";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import { debounce } from "../../../shared/lib/functions/debounce";
import { customerRegions } from "../../../shared/lib/constants";

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

  const { getAllCustomers } = useCustomer();
  const { getParam, setParams, removeParam } = useParamsHook();
  const [localSearch, setLocalSearch] = useState(getParam("search") || "");

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

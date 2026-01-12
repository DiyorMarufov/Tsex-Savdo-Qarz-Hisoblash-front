import { memo, useCallback, useEffect, useMemo, useState } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import Button from "../../../shared/ui/Button/Button";
import { Plus } from "lucide-react";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import ProTable from "@ant-design/pro-table";
import { Form, type FormProps } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TsexesBalances from "../../../widgets/superadmin/tsexes/Balances/TsexesBalances";
import { useTsex } from "../../../shared/lib/apis/tsexes/useTsex";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import type { Option, QueryParams } from "../../../shared/lib/types";
import { debounce } from "../../../shared/lib/functions/debounce";
import { useTsexTransaction } from "../../../shared/lib/apis/tsex-transactions/useTsexTransaction";
import { useApiNotification } from "../../../shared/hooks/api-notification/useApiNotification";
import TsexesMobileList from "../../../widgets/tsexes/TsexesMobileList/TsexesMobileList";
import TsexTransactionModal from "../../../widgets/superadmin/tsexes/TsexTransactionModal/TsexTransactionModal";
import PlusButton from "../../../shared/ui/Button/PlusButton";
import { tsexColumns } from "../../../shared/lib/model/tsexes/tsexes-model";

type FieldType = {
  tsex_id: string;
  type: "partial_payment" | "payment" | "avans";
  amount: string;
  description?: string;
};

const TsexesPage = () => {
  const [isTsexOpen, setIsTsexOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [form] = Form.useForm();

  const { getParam, setParams, removeParam } = useParamsHook();
  const [localSearch, setLocalSearch] = useState(getParam("search") || "");

  const { getAllTsexes, getAllTsexesForProductsFilter } = useTsex();
  const { createTsexTransaction } = useTsexTransaction();
  const { handleApiError, handleSuccess } = useApiNotification();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  // Query starts
  const query: QueryParams = useMemo(() => {
    const page = Number(getParam("page")) || 1;
    const limit = Number(getParam("limit")) || 5;
    const search = getParam("search") || undefined;

    return { page, limit, search };
  }, [getParam]);
  // Query ends

  // Add Modal starts
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // Add Modal ends

  // Add transaction starts
  const onFinish: FormProps<FieldType>["onFinish"] = (values: FieldType) => {
    const { tsex_id, type, amount, description } = values;
    const data = {
      tsex_id,
      type,
      amount: Number(amount.replace(/\D/g, "")),
      description,
    };
    switch (type) {
      case "payment":
        createTsexTransaction.mutate(
          { data, type: "full-payment" },
          {
            onSuccess: () => {
              handleCancel();
              form.resetFields();
              handleSuccess("Muvaffaqiyatli to'lov qilindi");
            },
            onError: (err: any) => {
              const msg = err?.response?.data?.message;
              switch (msg) {
                case "Amount must be greater than zero":
                  handleApiError(
                    "Summa 0 dan katta bo'lishi kerak",
                    "topRight",
                  );
                  break;

                case "Doesn't have debt":
                  handleApiError("Bu tsexdan qarzingiz yo'q", "topRight");
                  break;

                case "Full payment must exactly match the current balance":
                  handleApiError(
                    "Miqdor tsex hisobi bilan teng bo'lishi kerak",
                    "topRight",
                  );
                  break;

                case "User not registered":
                  handleApiError(
                    "Foydalanuvchi ro'yxatdan o'tmagan",
                    "topRight",
                  );
                  break;

                case "Only superadmin has access":
                  handleApiError("Superadmin huquqiga ega emassiz", "topRight");
                  break;
                default:
                  handleApiError("Serverda xato", "topRight");
                  break;
              }
            },
          },
        );
        break;

      case "partial_payment":
        createTsexTransaction.mutate(
          { data, type: "partial-payment" },
          {
            onSuccess: () => {
              handleCancel();
              form.resetFields();
              handleSuccess("Muvaffaqiyatli to'lov qilindi");
            },
            onError: (err: any) => {
              const msg = err?.response?.data?.message;
              switch (msg) {
                case "Amount must be greater than zero":
                  handleApiError(
                    "Summa 0 dan katta bo'lishi kerak",
                    "topRight",
                  );
                  break;

                case "Doesn't have debt":
                  handleApiError("Bu tsexdan qarzingiz yo'q", "topRight");
                  break;

                case "Can't exceed the main balance":
                  handleApiError(
                    "Miqdor tsex hisobidan oshib ketmasligi kerak",
                    "topRight",
                  );
                  break;

                case "User not registered":
                  handleApiError(
                    "Foydalanuvchi ro'yxatdan o'tmagan",
                    "topRight",
                  );
                  break;

                case "Only superadmin has access":
                  handleApiError("Superadmin huquqiga ega emassiz", "topRight");
                  break;
                default:
                  handleApiError("Serverda xato", "topRight");
                  break;
              }
            },
          },
        );
        break;

      case "avans":
        createTsexTransaction.mutate(
          { data, type: "avans-payment" },
          {
            onSuccess: () => {
              handleCancel();
              form.resetFields();
              handleSuccess("Muvaffaqiyatli to'lov qilindi");
            },
            onError: (err: any) => {
              const msg = err?.response?.data?.message;
              switch (msg) {
                case "Amount must be greater than zero":
                  handleApiError(
                    "Summa 0 dan katta bo'lishi kerak",
                    "topRight",
                  );
                  break;

                case "Avans can only be paid when balance is zero":
                  handleApiError("Birinchi qarzingizni to'lang", "topRight");
                  break;

                case "User not registered":
                  handleApiError(
                    "Foydalanuvchi ro'yxatdan o'tmagan",
                    "topRight",
                  );
                  break;

                case "Only superadmin has access":
                  handleApiError("Superadmin huquqiga ega emassiz", "topRight");
                  break;
                default:
                  handleApiError("Serverda xato", "topRight");
                  break;
              }
            },
          },
        );
        break;
    }
  };
  // Add transaction ends

  // HandleOpenDetail starts
  const handleOpenDetail = (id: string) => {
    navigate(`transactions/${id}`);
  };
  // HanleOpenDetail ends

  // TsexData starts
  const { data: allTsexes, isLoading: tsexLoading } = getAllTsexes(query);
  const tsexes = allTsexes?.data?.data;
  const total = allTsexes?.data?.total || 0;
  // TsexData ends

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

  // Options start
  const { data: tsexesFilter, isLoading: tsexListLoading } =
    getAllTsexesForProductsFilter(isTsexOpen);
  const tsexesOptions = tsexesFilter?.data?.map((ts) => ({
    value: ts?.id,
    label: ts?.name,
  }));

  // Options end

  if (pathname.startsWith("/superadmin/tsexes/transactions")) return <Outlet />;

  return (
    <div className="pb-12">
      <div className="flex items-center justify-between gap-3 max-[500px]:flex-wrap">
        <div>
          <LargeTitle title="Tsexlar" />
        </div>
        <PlusButton setOpen={showModal} />
        <div className="max-[500px]:hidden">
          <Button className="flex gap-2 max-[500px]:w-full" onClick={showModal}>
            <Plus /> Yangi operatsiya
          </Button>
        </div>
      </div>

      <TsexesBalances />

      <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] mt-4 p-3.5 flex items-center gap-5 max-[960px]:flex-wrap">
        <SearchInput
          placeholder="Tsex nomi yoki operatsiya bo'yicha qidirish"
          className="h-10! bg-bg-ty! text-[17px]!"
          value={localSearch}
          onChange={handleSearchChange}
        />
      </div>

      <div className="mt-4 max-[500px]:hidden">
        <ProTable
          dataSource={tsexes}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            responsive: false,
            current: query.page,
            pageSize: query.limit,
            total,
            onChange: handlePageChange,
            pageSizeOptions: [5, 10],
          }}
          columns={tsexColumns(handleOpenDetail)}
          search={false}
          dateFormatter="string"
          scroll={{ x: "max-content" }}
          loading={tsexLoading}
        />
      </div>

      <TsexesMobileList
        data={tsexes}
        currentPage={Number(query.page)}
        pageSize={Number(query.limit)}
        total={total}
        onPageChange={handlePageChange}
        loading={tsexLoading}
        onDetail={handleOpenDetail}
      />

      <TsexTransactionModal
        isOpen={isModalOpen}
        onCancel={handleCancel}
        onFinish={onFinish}
        form={form}
        tsexesOptions={tsexesOptions as Option[]}
        setIsTsexOpen={setIsTsexOpen}
        loading={tsexListLoading}
        pending={createTsexTransaction.isPending}
      />
    </div>
  );
};

export default memo(TsexesPage);

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Button from "../../../shared/ui/Button/Button";
import { Plus } from "lucide-react";
import ProTable from "@ant-design/pro-table";
import { salesColumns } from "../../../shared/lib/model/reports/sales-model";
import PlusButton from "../../../shared/ui/Button/PlusButton";
import SalesFilter from "../../../widgets/sales/SalesFilter/SalesFilter";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import { useSale } from "../../../shared/lib/apis/sales/useSale";
import type { Option, QueryParams } from "../../../shared/lib/types";
import dayjs from "dayjs";
import SalesReportMobileList from "../../../widgets/reports/SalesReport/SalesReportMobileList/SalesReportMobileList";
import { useShop } from "../../../shared/lib/apis/shops/useShop";
import { useTsex } from "../../../shared/lib/apis/tsexes/useTsex";
import { debounce } from "../../../shared/lib/functions/debounce";
import { useCustomer } from "../../../shared/lib/apis/customers/useCustomer";
import { formatPhoneNumber } from "../../../shared/lib/functions/formatPhoneNumber";

const AdminSalesPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { getParam, setParams, removeParam } = useParamsHook();
  const [localSearch, setLocalSearch] = useState(getParam("search") || "");
  const [, setCustomerSearch] = useState(getParam("customer_search") || "");
  const { getAllSales } = useSale();
  const { getInfiniteCustomers } = useCustomer();
  const { getAllShopsForProductsFilter } = useShop();
  const { getAllTsexesForProductsFilter } = useTsex();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  // Query starts
  const query: QueryParams = useMemo(() => {
    const page = Number(getParam("page")) || 1;
    const limit = Number(getParam("limit")) || 5;
    const search = getParam("search") || undefined;
    const s = getParam("startDate");
    const e = getParam("endDate");
    const customerId = getParam("customerId") || "";
    const shopId = getParam("shopId") || "";
    const tsexId = getParam("tsexId") || "";
    const productFilterSearch = getParam("product_search") || undefined;
    const customerFilterSearch = getParam("customer_search") || undefined;

    const isFirstLoad = s === null && e === null;

    return {
      page,
      limit,
      search,
      start: isFirstLoad ? dayjs().startOf("day") : s ? dayjs(s) : null,
      end: isFirstLoad ? dayjs().endOf("day") : e ? dayjs(e) : null,
      startStr: isFirstLoad
        ? dayjs().startOf("day").format("YYYY-MM-DD HH:mm:ss")
        : s || "",
      endStr: isFirstLoad
        ? dayjs().endOf("day").format("YYYY-MM-DD HH:mm:ss")
        : e || "",
      customerId,
      shopId,
      tsexId,
      productFilterSearch,
      customerFilterSearch,
    };
  }, [getParam]);
  // Query ends

  // Sale Items detail starts
  const handleSaleItems = (id: string) => navigate(`${id}`);
  // Sale Items detail ends

  // SalesData starts
  const { data: allSales, isLoading: salesLoading } = getAllSales({
    page: query.page,
    limit: query.limit,
    search: query.search,
    startDate: query.startStr,
    endDate: query.endStr,
    customerId: query.customerId,
    shopId: query.shopId,
    tsexId: query.tsexId,
  });
  const sales = allSales?.data?.data;
  const total = allSales?.data?.total;
  // SalesData ends

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

  const debouncedSetSearchCustomerQuery = useCallback(
    debounce((nextValue: string) => {
      setParams({
        customer_search: nextValue || "",
        page: 1,
      });
    }, 500),
    [setParams],
  );

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    debouncedSetSearchQuery(value);
  };

  const handleSearchCustomerChange = (value: string) => {
    setCustomerSearch(value);
    debouncedSetSearchCustomerQuery(value);
  };
  // Search ends

  // SaleFilter options start
  const {
    data: allCustomersList,
    isLoading: customerListLoading,
    fetchNextPage: customerFetchNextPage,
    hasNextPage: customerHasNextPage,
    isFetchingNextPage: customerIsFetchingNextPage,
  } = getInfiniteCustomers({
    search: query.customerFilterSearch,
  });
  const customerOptions: Option[] = [
    {
      value: "",
      label: "Barcha mijozlar",
    },
    ...(
      allCustomersList?.pages?.flatMap((page: any) => {
        return Array.isArray(page)
          ? page
          : page?.data?.data || page?.data || [];
      }) || []
    ).map((cs: any) => ({
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
    })),
  ];

  const { data: tsexes, isLoading: tsexLoading } =
    getAllTsexesForProductsFilter();
  const tsexesOptions = [
    {
      value: "",
      label: "Barcha tsexlar",
    },
    ...(tsexes?.data?.map((ts) => ({
      value: ts?.id,
      label: ts?.name,
    })) || []),
  ];

  const { data: shops, isLoading: shopLoading } =
    getAllShopsForProductsFilter();
  const shopsOptions = [
    {
      value: "",
      label: "Barcha do'konlar",
    },
    ...(shops?.data?.map((st) => ({
      value: st?.id,
      label: st?.name,
    })) || []),
  ];

  // SaleFilter options end

  // SaleReportFilter onFilterSubmit starts
  const onFilterSubmit = (filters: {
    dates: string[] | null;
    customerId: string;
    shopId: string;
    tsexId: string;
  }) => {
    setParams({
      startDate: filters.dates?.[0] || "",
      endDate: filters.dates?.[1] || "",
      customerId: filters?.customerId || "",
      shopId: filters.shopId || "",
      tsexId: filters.tsexId || "",
    });
  };
  // SaleReportFilter onFilterSubmit ends

  if (pathname.startsWith("/admin/sales/")) return <Outlet />;
  return (
    <div className="pb-12">
      <div className="flex justify-between gap-4">
        <LargeTitle title="Sotuvlar" />
        <div className="max-[500px]:hidden">
          <Button onClick={() => navigate("add")}>
            <Plus />
            Yangi sotuv yaratish
          </Button>
        </div>

        <PlusButton setOpen={() => navigate("add")} />
      </div>
      <div className="flex flex-col gap-4">
        <SalesFilter
          onFilterSubmit={onFilterSubmit}
          start={query.start}
          end={query.end}
          customerId={query.customerId}
          shopId={query.shopId}
          tsexId={query.tsexId}
          localSearch={localSearch}
          customerOptions={customerOptions}
          shopsOptions={shopsOptions}
          tsexesOptions={tsexesOptions}
          customerHasNextPage={customerHasNextPage}
          customerIsFetchingNextPage={customerIsFetchingNextPage}
          customerFetchNextPage={customerFetchNextPage}
          onSearchCustomerChange={handleSearchCustomerChange}
          handleSearchChange={handleSearchChange}
          customerLoading={customerListLoading}
          tsexLoading={tsexLoading}
          shopLoading={shopLoading}
        />

        <div className="max-[500px]:hidden">
          <ProTable
            dataSource={sales}
            rowKey="id"
            pagination={{
              showSizeChanger: true,
              responsive: false,
              current: query.page,
              pageSize: query.limit,
              total,
              onChange: handlePageChange,
            }}
            columns={salesColumns(handleSaleItems)}
            search={false}
            dateFormatter="string"
            scroll={{ x: "max-content" }}
            loading={salesLoading}
          />
        </div>

        <SalesReportMobileList
          data={sales}
          isLoading={salesLoading}
          total={total}
          currentPage={Number(query.page)}
          pageSize={Number(query.limit)}
          onPageChange={handlePageChange}
          onDetail={handleSaleItems}
        />
      </div>
    </div>
  );
};

export default memo(AdminSalesPage);

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import ProTable from "@ant-design/pro-table";
import SalesReportBalances from "../../../widgets/reports/SalesReport/SalesReportBalances/SalesReportBalances";
import SalesReportChart from "../../../widgets/reports/SalesReport/SalesReportChart/SalesReportChart";
import SalesReportMobileList from "../../../widgets/reports/SalesReport/SalesReportMobileList/SalesReportMobileList";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import { useSale } from "../../../shared/lib/apis/sales/useSale";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import dayjs from "dayjs";
import type { QueryParams } from "../../../shared/lib/types";
import { debounce } from "../../../shared/lib/functions/debounce";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ProductsReportFilters from "../../../widgets/reports/ProductsReport/ProductsReportFilters/ProductsReportFilters";
import { useShop } from "../../../shared/lib/apis/shops/useShop";
import { useTsex } from "../../../shared/lib/apis/tsexes/useTsex";
import { salesColumns } from "../../../shared/lib/model/reports/sales-model";

const AdminSalesReportPage = () => {
  const [isTsexOpen, setIsTsexOpen] = useState<boolean>(false);
  const [isShopOpen, setIsShopOpen] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { getParam, setParams, removeParam } = useParamsHook();
  const [localSearch, setLocalSearch] = useState(getParam("search") || "");
  const [, setProductFilterSearch] = useState(getParam("product_search") || "");

  const { getSalesSummaryForReport, getAllSales } = useSale();
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
    const shopId = getParam("shopId") || "";
    const tsexId = getParam("tsexId") || "";
    const productFilterSearch = getParam("product_search") || undefined;

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
      shopId,
      tsexId,
      productFilterSearch,
    };
  }, [getParam]);
  // Query ends

  // Sale Items detail starts
  const handleSaleItems = (id: string) => navigate(`${id}`);
  // Sale Items detail ends

  // SalesSummary starts
  const { data: salesSummary, isLoading: salesSummaryReportLoading } =
    getSalesSummaryForReport({
      startDate: query.startStr,
      endDate: query.endStr,
      shopId: query.shopId,
      tsexId: query.tsexId,
    });
  const summary = salesSummary?.data;

  const totalSales = summary?.totalSales;
  const paidTotal = summary?.paidTotal;
  const unpaidTotal = summary?.unpaidTotal;
  // SalesSummary ends

  // SalesReportData starts
  const { data: allSales, isLoading: salesLoading } = getAllSales({
    page: query.page,
    limit: query.limit,
    search: query.search,
    startDate: query.startStr,
    endDate: query.endStr,
    shopId: query.shopId,
    tsexId: query.tsexId,
  });
  const sales = allSales?.data?.data;
  const total = allSales?.data?.total;
  // SalesReportData ends

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

  const debouncedSetSearchProductFilterQuery = useCallback(
    debounce((nextValue: string) => {
      setParams({
        product_search: nextValue || "",
        page: 1,
      });
    }, 500),
    [setParams]
  );

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    debouncedSetSearchQuery(value);
  };

  const handleSearchProductFilterChange = (value: string) => {
    setProductFilterSearch(value);
    debouncedSetSearchProductFilterQuery(value);
  };
  // Search ends

  // SaleReportFilter options start
  const { data: tsexes, isLoading: tsexLoading } =
    getAllTsexesForProductsFilter(isTsexOpen);
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
    getAllShopsForProductsFilter(isShopOpen);
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
  // SaleReportFilter options end

  // SaleReportFilter onFilterSubmit starts
  const onFilterSubmit = (filters: {
    dates: string[] | null;
    shopId: string;
    tsexId: string;
  }) => {
    setParams({
      startDate: filters.dates?.[0] || "",
      endDate: filters.dates?.[1] || "",
      shopId: filters.shopId || "",
      tsexId: filters.tsexId || "",
    });
  };
  // SaleReportFilter onFilterSubmit ends

  if (pathname.startsWith("/admin/reports/sale/")) return <Outlet />;
  return (
    <div className="flex flex-col gap-4">
      <ProductsReportFilters
        onFilterSubmit={onFilterSubmit}
        start={query.start}
        end={query.end}
        shopId={query.shopId}
        tsexId={query.tsexId}
        shopsOptions={shopsOptions}
        tsexesOptions={tsexesOptions}
        setIsTsexOpen={setIsTsexOpen}
        setIsShopOpen={setIsShopOpen}
        onSearchChange={handleSearchProductFilterChange}
        tsexLoading={tsexLoading}
        shopLoading={shopLoading}
        isProduct={false}
      />

      <SalesReportBalances
        isLoading={salesSummaryReportLoading}
        totalSales={totalSales}
        paidTotal={paidTotal}
        unpaidTotal={unpaidTotal}
      />

      <SalesReportChart
        params={{
          startDate: query.startStr,
          endDate: query.endStr,
          tsexId: query.tsexId as string,
          shopId: query.shopId as string,
        }}
      />

      <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] p-3.5">
        <SearchInput
          placeholder="Do'kon,sotuvchi,mijoz bo'yicha qidirish"
          className="h-10! bg-bg-ty! text-[16px]!"
          value={localSearch}
          onChange={handleSearchChange}
        />
      </div>

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
  );
};

export default memo(AdminSalesReportPage);

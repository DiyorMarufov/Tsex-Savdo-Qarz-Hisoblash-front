import { memo, useCallback, useMemo, useState } from "react";
import ProTable from "@ant-design/pro-table";
import { salesColumns } from "./model/sales-model";
import SalesReportBalances from "../../../widgets/reports/SalesReport/SalesReportBalances/SalesReportBalances";
import SalesReportChart from "../../../widgets/reports/SalesReport/SalesReportChart/SalesReportChart";
import SalesReportMobileList from "../../../widgets/reports/SalesReport/SalesReportMobileList/SalesReportMobileList";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import ReportFilter from "../../../widgets/reports/SalesReport/ReportFilter/ReportFilter";
import { useSale } from "../../../shared/lib/apis/sales/useSale";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import dayjs from "dayjs";
import type { QueryParams } from "../../../shared/lib/types";
import { debounce } from "../../../shared/lib/functions/debounce";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const SalesReportPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { getSalesSummaryForReport } = useSale();
  const { getParam, setParam, setParams, removeParam } = useParamsHook();
  const [localSearch, setLocalSearch] = useState(getParam("search") || "");

  const { getAllSales } = useSale();

  // Query starts
  const query: QueryParams = useMemo(() => {
    const page = Number(getParam("page")) || 1;
    const limit = Number(getParam("limit")) || 5;
    const search = getParam("search") || undefined;
    const s = getParam("startDate");
    const e = getParam("endDate");

    const itemPage = Number(getParam("itemPage")) || 1;
    const itemLimit = Number(getParam("itemLimit")) || 5;

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
      itemPage,
      itemLimit,
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
    });
  const summary = salesSummary?.data;

  const totalSales = summary?.totalSales;
  const paidTotal = summary?.paidTotal;
  const unpaidTotal = summary?.unpaidTotal;
  // SalesSummary ends

  // Report Filter starts
  const handleFilterChange = useCallback(
    (dates: string[] | null) => {
      if (dates) {
        setParam("startDate", dates[0]);
        setParam("endDate", dates[1]);
      } else {
        setParam("startDate", "");
        setParam("endDate", "");
      }
    },
    [setParam]
  );
  // Report Filter ends

  // SalesReportData starts
  const { data: allSales, isLoading: salesLoading } = getAllSales({
    page: query.page,
    limit: query.limit,
    search: query.search,
    startDate: query.startStr,
    endDate: query.endStr,
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

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    debouncedSetSearchQuery(value);
  };
  // Search ends

  if (pathname.startsWith("/superadmin/reports/sale/")) return <Outlet />;
  return (
    <div className="flex flex-col gap-5">
      <ReportFilter
        onFilter={handleFilterChange}
        start={query.start}
        end={query.end}
      />

      <SalesReportBalances
        isLoading={salesSummaryReportLoading}
        totalSales={totalSales}
        paidTotal={paidTotal}
        unpaidTotal={unpaidTotal}
      />

      <SalesReportChart startDate={query.startStr} endDate={query.endStr} />

      <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] p-3.5">
        <SearchInput
          placeholder="Do'kon,sotuvchi,mijoz bo'yicha qidirish"
          className="h-12! bg-bg-ty! text-[16px]!"
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

export default memo(SalesReportPage);

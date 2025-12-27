import { memo, useCallback, useMemo, useState } from "react";
import ProTable from "@ant-design/pro-table";
import { salesColumns } from "./model/sales-model";
import SalesReportBalances from "../../../widgets/reports/SalesReport/SalesReportBalances/SalesReportBalances";
import SalesReportChart from "../../../widgets/reports/SalesReport/SalesReportChart/SalesReportChart";
import SalesReportMobileList from "../../../widgets/reports/SalesReport/SalesReportMobileList/SalesReportMobileList";
import SaleItemDetailModal from "../../../widgets/reports/SalesReport/SaleItemDetailModal/SaleItemDetailModal";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import ReportFilter from "../../../widgets/reports/SalesReport/ReportFilter/ReportFilter";
import { useSale } from "../../../shared/lib/apis/sales/useSale";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import dayjs from "dayjs";
import type { QueryParams } from "../../../shared/lib/types";
import { debounce } from "../../../shared/lib/functions/debounce";
import { useSaleItem } from "../../../shared/lib/apis/sale-items/useSaleItem";

const SalesReportPage = () => {
  const [detailOpen, setdetailOpen] = useState<boolean>(false);
  const [saleId, setSaleId] = useState<string | null>(null);

  const { getSalesSummaryForReport } = useSale();
  const { getParam, setParam, setParams, removeParam } = useParamsHook();
  const [localSearch, setLocalSearch] = useState(getParam("search") || "");

  const { getAllSales } = useSale();
  const { getSaleItemsBySaleId } = useSaleItem();

  // Query starts
  const query: QueryParams = useMemo(() => {
    const page = Number(getParam("page")) || 1;
    const limit = Number(getParam("limit")) || 5;
    const search = getParam("search") || undefined;
    const s = getParam("startDate");
    const e = getParam("endDate");

    const itemPage = Number(getParam("itemPage")) || 1;
    const itemLimit = Number(getParam("itemLimit")) || 5;
    return {
      page,
      limit,
      search,
      start: s ? dayjs(s) : dayjs().startOf("day"),
      end: e ? dayjs(e) : dayjs().endOf("day"),
      startStr: s || dayjs().startOf("day").format("YYYY-MM-DD HH:mm:ss"),
      endStr: e || dayjs().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
      startSale: s,
      endSale: e,
      itemPage,
      itemLimit,
    };
  }, [getParam]);
  // Query ends

  // Sale Items detail starts
  const handleSaleItems = (id: string) => {
    setSaleId(id);
    setdetailOpen(true);
  };

  const handleCancelSaleItems = () => {
    setdetailOpen(false);
    setSaleId(null);
    removeParam("itemPage");
    removeParam("itemLimit");
  };
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
    startDate: query.startSale,
    endDate: query.endSale,
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

  // SaleItemData starts
  const { data: allSaleItems, isLoading: saleItemLoading } =
    getSaleItemsBySaleId(saleId as string);
  const saleItems = allSaleItems?.data?.data;
  const saleInfo = allSaleItems?.data?.saleInfo;
  const saleItemsTotal = allSaleItems?.data?.total;
  // SaleItemData ends

  // ItemPageChange starts
  const handleItemPageChange = (newPage: number, newPageSize?: number) => {
    const updateParams: { itemPage?: number; itemLimit?: number } = {};

    if (newPage > 1) updateParams.itemPage = newPage;
    else removeParam("itemPage");

    if (newPageSize && newPageSize !== 5) updateParams.itemLimit = newPageSize;
    else if (newPageSize === 5) removeParam("itemLimit");

    setParams(updateParams);
  };
  // ItemPageChange ends

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

      <SaleItemDetailModal
        open={detailOpen}
        onCancel={handleCancelSaleItems}
        data={saleItems}
        saleInfo={saleInfo}
        loading={saleItemLoading}
        total={saleItemsTotal}
        currentPage={Number(query.itemPage)}
        pageSize={Number(query.itemLimit)}
        onPageChange={handleItemPageChange}
      />
    </div>
  );
};

export default memo(SalesReportPage);

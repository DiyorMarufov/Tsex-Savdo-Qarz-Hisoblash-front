import { memo, useCallback, useEffect, useMemo, useState } from "react";
import ReportFilter from "../../../widgets/reports/SalesReport/ReportFilter/ReportFilter";
import TsexesReportBalances from "../../../widgets/reports/TsexesReport/TsexesReportBalances/TsexesReportBalances";
import TsexesReportChart from "../../../widgets/reports/TsexesReport/TsexesReportChart/TsexesReportChart";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import type { QueryParams } from "../../../shared/lib/types";
import dayjs from "dayjs";
import { useTsex } from "../../../shared/lib/apis/tsexes/useTsex";
import ProTable from "@ant-design/pro-table";
import { debounce } from "../../../shared/lib/functions/debounce";
import { useNavigate } from "react-router-dom";
import TsexesMobileList from "../../../widgets/tsexes/TsexesMobileList/TsexesMobileList";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import { tsexColumns } from "../../../shared/lib/model/tsexes/tsexes-model";

const TsexesReportPage = () => {
  const navigate = useNavigate();
  const { setParams, getParam, removeParam } = useParamsHook();
  const [localSearch, setLocalSearch] = useState(getParam("search") || "");
  const { getAllTsexes, getAllTsexesForProductsFilter } = useTsex();
  const { getAllTsexesSummaryForReport, getAllTsexesStatisticsForReport } =
    useTsex();

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
    const tsexId = getParam("tsexId") || "";

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
      tsexId,
    };
  }, [getParam]);
  // Query ends

  // Report Filter starts
  const onFilterSubmit = (filters: {
    dates: string[] | null;
    tsexId: string;
  }) => {
    setParams({
      startDate: filters.dates?.[0] || "",
      endDate: filters.dates?.[1] || "",
      tsexId: filters.tsexId || "",
    });
  };
  // Report Filter ends

  // TsexesReportBalances start
  const { data: allTsexesSummary, isLoading: tsexSummaryLoading } =
    getAllTsexesSummaryForReport({
      startDate: query.startStr,
      endDate: query.endStr,
      tsexId: query.tsexId,
    });
  const tsexSummary = allTsexesSummary?.data;
  const inventoryBalance = tsexSummary?.inventoryBalance;
  const totalPaid = tsexSummary?.totalPaid;
  const totalBalance = tsexSummary?.totalBalance;
  const totalQuantity = tsexSummary?.totalQuantity;
  const totalTypes = tsexSummary?.totalTypes;
  // TsexesReportBalances end

  // TsexesReportChart starts
  const { data: allTsexesStats, isLoading: tsexStatsLoading } =
    getAllTsexesStatisticsForReport({
      startDate: query.startStr,
      endDate: query.endStr,
      tsexId: query.tsexId,
    });
  const tsexesStats = allTsexesStats?.data;
  // TsexesReportChart ends

  // TsexReport options start
  const { data: tsexesFilter, isLoading: tsexFilterLoading } =
    getAllTsexesForProductsFilter();
  const tsexesOptions = [
    {
      value: "",
      label: "Barcha tsexlar",
    },
    ...(tsexesFilter?.data?.map((ts) => ({
      value: ts?.id,
      label: ts?.name,
    })) || []),
  ];
  // TsexReport options ends

  // HandleOpenDetail starts
  const handleOpenDetail = (id: string) => {
    navigate(`/superadmin/tsexes/transactions/${id}`);
  };
  // HanleOpenDetail ends

  // TsexData starts
  const { data: allTsexes, isLoading: tsexLoading } = getAllTsexes({
    startDate: query.startStr,
    endDate: query.endStr,
    tsexId: query.tsexId,
    search: query.search,
    page: query.page,
    limit: query.limit,
  });
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

  return (
    <div className="flex flex-col gap-4">
      <ReportFilter
        onFilterSubmit={onFilterSubmit}
        start={query.start}
        end={query.end}
        tsexId={query.tsexId}
        tsexesOptions={tsexesOptions}
        tsexLoading={tsexFilterLoading}
      />

      <TsexesReportBalances
        inventoryBalance={inventoryBalance}
        totalPaid={totalPaid}
        totalBalance={totalBalance}
        totalQuantity={totalQuantity}
        totalTypes={totalTypes}
        loading={tsexSummaryLoading}
      />

      <TsexesReportChart data={tsexesStats} loading={tsexStatsLoading} />

      <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] p-3.5 flex items-center gap-5 max-[960px]:flex-wrap">
        <SearchInput
          placeholder="Tsex nomi yoki operatsiya bo'yicha qidirish"
          className="h-10! bg-bg-ty! text-[17px]!"
          value={localSearch}
          onChange={handleSearchChange}
        />
      </div>

      <div className="max-[500px]:hidden">
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
        isReport
      />
    </div>
  );
};

export default memo(TsexesReportPage);

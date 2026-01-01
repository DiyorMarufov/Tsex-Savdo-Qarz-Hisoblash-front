import { memo, useCallback, useMemo, useState } from "react";
import ReportFilter from "../../../widgets/reports/SalesReport/ReportFilter/ReportFilter";
import TsexesReportBalances from "../../../widgets/reports/TsexesReport/TsexesReportBalances/TsexesReportBalances";
import TsexesReportChart from "../../../widgets/reports/TsexesReport/TsexesReportChart/TsexesReportChart";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import type { QueryParams } from "../../../shared/lib/types";
import dayjs from "dayjs";
import { useTsex } from "../../../shared/lib/apis/tsexes/useTsex";

const TsexesReportPage = () => {
  const [isTsexOpen, setIsTsexOpen] = useState<boolean>(false);
  const { setParams, getParam } = useParamsHook();
  const { getAllTsexesForProductsFilter } = useTsex();
  const { getAllTsexesSummaryForReport, getAllTsexesStatisticsForReport } =
    useTsex();

  // Query starts
  const query: QueryParams = useMemo(() => {
    const s = getParam("startDate");
    const e = getParam("endDate");
    const tsexId = getParam("tsexId") || "";

    const isFirstLoad = s === null && e === null;
    return {
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
  const handleFilterChange = useCallback(
    (dates: string[] | null, tsexId: string) => {
      setParams({
        startDate: dates?.[0] || "",
        endDate: dates?.[1] || "",
        tsexId: tsexId || ""
      });
    },
    [setParams],
  );
  // Report Filter ends

  // TsexesReportBalances start
  const { data: allTsexesSummary, isLoading: tsexSummaryLoading } =
    getAllTsexesSummaryForReport({
      startDate: query.startStr,
      endDate: query.endStr,
      tsexId: query.tsexId
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
    getAllTsexesStatisticsForReport(
      {
        startDate: query.startStr,
        endDate: query.endStr,
        tsexId: query.tsexId
      }
    );
  const tsexesStats = allTsexesStats?.data;
  // TsexesReportChart ends

  // TsexReport options start
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
  // TsexReport options ends

  return (
    <div className="flex flex-col gap-5">
      <ReportFilter
        onFilter={handleFilterChange}
        start={query.start}
        end={query.end}
        tsexId={query.tsexId}
        tsexesOptions={tsexesOptions}
        tsexLoading={tsexLoading}
        setIsTsexOpen={setIsTsexOpen}
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
    </div>
  );
};

export default memo(TsexesReportPage);

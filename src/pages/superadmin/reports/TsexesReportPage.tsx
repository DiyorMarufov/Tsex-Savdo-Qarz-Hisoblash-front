import { memo, useCallback, useMemo } from "react";
import ReportFilter from "../../../widgets/reports/SalesReport/ReportFilter/ReportFilter";
import TsexesReportBalances from "../../../widgets/reports/TsexesReport/TsexesReportBalances/TsexesReportBalances";
import TsexesReportChart from "../../../widgets/reports/TsexesReport/TsexesReportChart/TsexesReportChart";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import type { QueryParams } from "../../../shared/lib/types";
import dayjs from "dayjs";

const TsexesReportPage = () => {
  const { setParam, getParam } = useParamsHook();

  // Query starts
  const query: QueryParams = useMemo(() => {
    const s = getParam("startDate");
    const e = getParam("endDate");

    const isFirstLoad = s === null && e === null;
    return {
      start: isFirstLoad ? dayjs().startOf("day") : s ? dayjs(s) : null,
      end: isFirstLoad ? dayjs().endOf("day") : e ? dayjs(e) : null,
    };
  }, [getParam]);
  // Query ends

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
  return (
    <div className="flex flex-col gap-5">
      <ReportFilter
        onFilter={handleFilterChange}
        start={query.start}
        end={query.end}
      />

      <TsexesReportBalances />

      <TsexesReportChart />
    </div>
  );
};

export default memo(TsexesReportPage);

import { memo } from "react";
// import ReportFilter from "../../../widgets/reports/SalesReport/ReportFilter/ReportFilter";
import TsexesReportBalances from "../../../widgets/reports/TsexesReport/TsexesReportBalances/TsexesReportBalances";
import TsexesReportChart from "../../../widgets/reports/TsexesReport/TsexesReportChart/TsexesReportChart";

const TsexesReportPage = () => {
  return (
    <div className="flex flex-col gap-5">
      {/* <ReportFilter /> */}

      <TsexesReportBalances />

      <TsexesReportChart />
    </div>
  );
};

export default memo(TsexesReportPage);

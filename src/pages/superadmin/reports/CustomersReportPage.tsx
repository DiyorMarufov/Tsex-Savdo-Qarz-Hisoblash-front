import { memo } from "react";
import CustomersReportBalances from "../../../widgets/reports/CustomersReport/CustomersReportBalances/CustomersReportBalances";
// import ReportFilter from "../../../widgets/reports/SalesReport/ReportFilter/ReportFilter";
import CustomersReportChart from "../../../widgets/reports/CustomersReport/CustomersReportChart/CustomersReportChart";

const CustomersReportPage = () => {
  return (
    <div className="flex flex-col gap-5">
      {/* <ReportFilter /> */}
      <CustomersReportBalances />

      <CustomersReportChart />
    </div>
  );
};

export default memo(CustomersReportPage);

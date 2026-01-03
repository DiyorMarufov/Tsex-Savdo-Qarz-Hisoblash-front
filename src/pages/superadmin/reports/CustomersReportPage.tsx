import { memo } from "react";
import CustomersReportBalances from "../../../widgets/reports/CustomersReport/CustomersReportBalances/CustomersReportBalances";
import CustomersReportChart from "../../../widgets/reports/CustomersReport/CustomersReportChart/CustomersReportChart";
import CustomersReportFilter from "../../../widgets/reports/CustomersReport/CustomersReportFilter/CustomersReportFilter";
import { useCustomer } from "../../../shared/lib/apis/customers/useCustomer";

const CustomersReportPage = () => {
  const { getCustomerBalanceSummary, getAllCustomersStatisticsForReport } =
    useCustomer();
  // CustomersReportCard starts

  const { data: customerBalancesSummary, isLoading: customerBalanceLoading } =
    getCustomerBalanceSummary();
  const customerBalances = customerBalancesSummary?.data;
  const creditor = customerBalances?.creditorTotalBalance;
  const debtor = customerBalances?.debtorTotalBalance;
  const net = customerBalances?.netTotalBalance;
  // CustomersReportCard ends

  // CustomersReportChart starts
  const { data: customersStats, isLoading: customersStatsLoading } =
    getAllCustomersStatisticsForReport();
  const borrowed = customersStats?.data?.borrowed;
  const lent = customersStats?.data?.lent;
  const totalBorrowed = customersStats?.data?.totalBorrowed;
  const totalLent = customersStats?.data?.totalLent;
  // CustomersReportChart ends
  return (
    <div className="flex flex-col gap-5">
      <CustomersReportFilter />
      <CustomersReportBalances
        creditor={creditor}
        debtor={debtor}
        net={net}
        loading={customerBalanceLoading}
      />

      <CustomersReportChart
        borrowed={borrowed}
        lent={lent}
        totalBorrowed={totalBorrowed}
        totalLent={totalLent}
        loading={customersStatsLoading}
      />
    </div>
  );
};

export default memo(CustomersReportPage);

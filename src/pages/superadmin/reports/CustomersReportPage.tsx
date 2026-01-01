import { memo } from "react";
import CustomersReportBalances from "../../../widgets/reports/CustomersReport/CustomersReportBalances/CustomersReportBalances";
import CustomersReportChart from "../../../widgets/reports/CustomersReport/CustomersReportChart/CustomersReportChart";
import CustomersReportFilter from "../../../widgets/reports/CustomersReport/CustomersReportFilter/CustomersReportFilter";
import { useCustomer } from "../../../shared/lib/apis/customers/useCustomer";

const CustomersReportPage = () => {
  const { getCustomerBalanceSummary } = useCustomer();
  // CustomersReportCard starts

  const { data: customerBalancesSummary, isLoading: customerBalanceLoading } =
    getCustomerBalanceSummary();
  const customerBalances = customerBalancesSummary?.data;

  const creditor = customerBalances?.creditorTotalBalance;
  const debtor = customerBalances?.debtorTotalBalance;
  const net = customerBalances?.netTotalBalance;

  // CustomersReportCard ends
  return (
    <div className="flex flex-col gap-5">
      <CustomersReportFilter />
      <CustomersReportBalances
        creditor={creditor}
        debtor={debtor}
        net={net}
        loading={customerBalanceLoading}
      />
      <CustomersReportChart />
    </div>
  );
};

export default memo(CustomersReportPage);

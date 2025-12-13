import { memo } from "react";
import { useSale } from "../../../../shared/lib/apis/sales/useSale";
import { formatBalance } from "../../../../shared/lib/functions/formatBalance";
import { useCustomer } from "../../../../shared/lib/apis/customer/useCustomer";
import { useTsex } from "../../../../shared/lib/apis/tsexes/useTsex";
import DashboardBalanceSkeleton from "../../../../shared/ui/Skeletons/DashboardBalanceSkeleton/DashboardBalanceSkeleton";
import StatCard from "../../../dashboard/StatCard/StatCard";
import CountUp from "react-countup";
import { formatUnitOfMeasurement } from "../../../../shared/lib/functions/formatUnitOfMeasurement";

const Balances = () => {
  const { getTotalSales } = useSale();
  const { getTotalTsexBalance } = useTsex();
  const { getTotalCustomerBalance } = useCustomer();

  // TotalSale starts
  const { data: sales, isLoading: totalSalesLoading } = getTotalSales();
  const totalSales = sales?.data;
  const formattedSale = formatBalance(String(totalSales));
  // TotalSale ends

  // TotalTsexBalance starts
  const { data: tsexBalances, isLoading: totalTsexBalanceLoading } =
    getTotalTsexBalance();
  const totalTsexBalance = tsexBalances?.data;
  const formattedTsexBalance = formatBalance(String(totalTsexBalance));
  // TotalTsexBalance ends

  // TotalCustomerBalance starts
  const { data: customerBalances, isLoading: totalCustomerBalanceLoading } =
    getTotalCustomerBalance();
  const totalCustomerBalance = customerBalances?.data;
  const formattedCustomerBalance = formatBalance(String(totalCustomerBalance));
  // TotalCustomerBalance ends

  // Total debt starts
  const tsexBalance =
    formattedTsexBalance > 0 ? -formattedTsexBalance : formattedTsexBalance;
  const customerBalance =
    formattedCustomerBalance < 0
      ? -formattedCustomerBalance
      : formattedCustomerBalance;
  const totalDebt = tsexBalance + customerBalance;
  // Total debt ends

  // Loading starts
  const isAnyLoading =
    totalSalesLoading || totalTsexBalanceLoading || totalCustomerBalanceLoading;

  if (isAnyLoading) {
    return (
      <div className="grid grid-cols-4 gap-6 max-[1350px]:grid-cols-3 max-[1070px]:grid-cols-2 max-[380px]:grid-cols-1">
        <DashboardBalanceSkeleton />
        <DashboardBalanceSkeleton />
        <DashboardBalanceSkeleton />
        <DashboardBalanceSkeleton />
      </div>
    );
  }
  // Loading ends

  return (
    <div className="grid grid-cols-4 gap-6 max-[1350px]:grid-cols-3 max-[1070px]:grid-cols-2 max-[380px]:grid-cols-1">
      <StatCard
        title="Umumiy Savdo"
        value={formattedSale}
        suffix="UZS"
        rawValue={String(totalSales)}
      />

      <div className="border border-[#E2E8F0] bg-[#ffffff] rounded-2xl flex flex-col py-[25px] px-[25px] max-[560px]:px-[15px]">
        <span className="text-[19px] font-medium text-[#6B7280] max-[560px]:text-[17px] max-[480px]:text-[16px]">
          Umumiy Qarzlar
        </span>
        <span
          className={`text-[32px] font-bold ${
            totalDebt < 0 ? "text-red-500" : "text-green-500"
          } max-[560px]:text-[25px] max-[480px]:text-[20px]`}
        >
          <CountUp
            start={0}
            end={totalDebt}
            duration={2.5}
            separator=" "
            decimal="."
            decimals={1}
            suffix={`${formatUnitOfMeasurement(totalDebt)} UZS`}
          />
        </span>
      </div>
      <StatCard
        title="Tsexlar Balansi"
        value={formattedTsexBalance}
        suffix="UZS"
        rawValue={String(totalTsexBalance)}
        isValueNegative={formattedTsexBalance > 0}
      />

      <StatCard
        title="Mijozlar balansi"
        value={formattedCustomerBalance}
        suffix="UZS"
        rawValue={String(totalCustomerBalance)}
        isValueNegative={formattedCustomerBalance < 0}
      />
    </div>
  );
};

export default memo(Balances);

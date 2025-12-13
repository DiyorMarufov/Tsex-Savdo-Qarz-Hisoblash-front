import { memo } from "react";
import { useTsex } from "../../../../shared/lib/apis/tsexes/useTsex";
import DashboardUserSkeleton from "../../../../shared/ui/Skeletons/DashboardBalanceSkeleton/DashboardUserSkeleton";

const TsexBalances = () => {
  const { getMostDebtorTsexes } = useTsex();
  // MostDebtorTsexes start
  const { data: allDebtorTsexes, isLoading } = getMostDebtorTsexes();
  const debtorTsexes = allDebtorTsexes?.data;
  // MostDebtorTsexes end

  if (isLoading) return <DashboardUserSkeleton />;
  return (
    <div className="flex flex-col gap-4 px-5 py-4 bg-[#ffffff] rounded-2xl border border-[#E2E8F0]">
      <span className="text-[20px] text-bg-py font-bold">Tsexlar bo'yicha</span>

      <div className="flex flex-col gap-3 overflow-y-auto h-[150px]">
        {debtorTsexes?.map((ts: any) => (
          <div key={ts?.id} className="flex justify-between">
            <span className="font-medium text-[17px] text-[#6B7280]">
              {ts?.name}
            </span>
            <span className="text-[16px] font-bold text-red-500">
              -{ts?.balance} UZS
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(TsexBalances);

import { memo } from "react";
import StatCard from "../../../../shared/ui/StatCard/StatCard";
import CountUp from "react-countup";
import BalanceStatCardSkeleton from "../../../../shared/ui/Skeletons/BalanceStatCardSkeleton/BalanceStatCardSkeleton";

interface ProductReportBalancesProps {
  totalQuantity: number;
  totalTypes: number;
  totalSold: number;
  totalSoldTypes: number;
  inventoryBalance: number;
  isLoading: boolean;
}

const ProductReportBalances = ({
  totalQuantity = 0,
  totalTypes = 0,
  totalSold = 0,
  totalSoldTypes = 0,
  inventoryBalance = 0,
  isLoading,
}: ProductReportBalancesProps) => {
  if (isLoading) return <BalanceStatCardSkeleton descriptionIndexes={[0, 1]} />;
  return (
    <div className="grid grid-cols-3 gap-4 max-[1250px]:grid-cols-2 max-[500px]:grid-cols-1">
      <div className="border border-bg-fy bg-[#ffffff] rounded-2xl p-7 flex flex-col gap-1 max-[500px]:items-center">
        <span className="text-[22px] font-medium text-bg-py max-[900px]:text-[20px] max-[500px]:text-[17px]">
          Jami mahsulotlar
        </span>
        <div className="flex flex-col max-[500px]:items-center">
          <span className="font-bold text-[30px] text-green-500 max-[900px]:text-[25px] max-[500px]:text-[22px]">
            <CountUp
              start={0}
              end={totalQuantity}
              duration={2.5}
              separator=","
              suffix=" ta"
            />
          </span>
          <span className="text-[16px] text-slate-500 font-normal mt-[-5px] max-[500px]:text-[14px]">
            <CountUp
              start={0}
              end={totalTypes}
              duration={2.5}
              suffix=" xil modelda"
            />
          </span>
        </div>
      </div>

      <div className="border border-bg-fy bg-[#ffffff] rounded-2xl p-7 flex flex-col gap-1 max-[500px]:items-center">
        <span className="text-[22px] font-medium text-bg-py max-[900px]:text-[20px] max-[500px]:text-[17px]">
          Jami sotilgan mahsulotlar
        </span>
        <div className="flex flex-col max-[500px]:items-center">
          <span className="font-bold text-[30px] text-green-500 max-[900px]:text-[25px] max-[500px]:text-[22px]">
            <CountUp
              start={0}
              end={totalSold}
              duration={2.5}
              separator=","
              suffix=" ta"
            />
          </span>
          <span className="text-[16px] text-slate-500 font-normal mt-[-5px] max-[500px]:text-[14px]">
            <CountUp
              start={0}
              end={totalSoldTypes}
              duration={2.5}
              suffix=" xil modelda"
            />
          </span>
        </div>
      </div>

      <StatCard
        title="Ombor balansi"
        value={inventoryBalance}
        isColSpan
        suffix=" UZS"
      />
    </div>
  );
};

export default memo(ProductReportBalances);

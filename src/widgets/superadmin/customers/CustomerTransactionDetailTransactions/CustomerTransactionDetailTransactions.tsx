import { memo } from "react";
import { ArrowUp, ArrowDown, CheckCircle } from "lucide-react";

interface TransactionActionsProps {
  type: "lending" | "borrowing" | string | null;
  handleActionMore: () => void;
  handlePayment: () => void;
  handleFinish: () => void;
}

const CustomerTransactionDetailTransactions = ({
  type,
  handleActionMore,
  handlePayment,
  handleFinish,
}: TransactionActionsProps) => {
  const isLending = type === "lending";

  return (
    <div className="grid grid-cols-3 gap-8 px-3">
      <div
        className="flex flex-col items-center cursor-pointer text-green-600 hover:text-green-700 transition duration-150"
        onClick={handleActionMore}
      >
        <div className="p-3 border-2 border-green-600 rounded-full bg-green-100/50">
          <ArrowUp className="h-8 w-8" />
        </div>
        <span className="text-sm font-medium mt-1 text-center">
          {isLending ? "Ko'proq qarz berish" : "Ko'proq qarz olish"}
        </span>
      </div>

      <div
        className="flex flex-col items-center cursor-pointer text-red-600 hover:text-red-700 transition duration-150"
        onClick={handlePayment}
      >
        <div className="p-3 border-2 border-red-600 rounded-full bg-red-100/50">
          <ArrowDown className="h-8 w-8" />
        </div>
        <span className="text-sm font-medium mt-1 text-center">
          {isLending ? "Qabul qilish" : "To'lash"}
        </span>
      </div>

      <div
        className="flex flex-col items-center cursor-pointer text-blue-600 hover:text-blue-700 transition duration-150"
        onClick={handleFinish}
      >
        <div className="p-3 border-2 border-blue-600 rounded-full bg-blue-100/50">
          <CheckCircle className="h-8 w-8" />
        </div>
        <span className="text-sm font-medium mt-1 text-center">Tugatish</span>
      </div>
    </div>
  );
};

export default memo(CustomerTransactionDetailTransactions);

import { memo } from "react";
import { Edit, Trash } from "lucide-react";
import type { CustomerTranscationDetailListItemsType } from "../../../pages/superadmin/customers/model/customer-transactions-detail-model";

interface TransactionDetailCardProps {
  trd: CustomerTranscationDetailListItemsType;
}

const CustomerTransactionDetailCard = ({ trd }: TransactionDetailCardProps) => {
  const getBadgeStyles = (type: string) => {
    switch (type) {
      case "borrow_more":
        return {
          text: "Qo'shimcha qarz olish",
          bg: "bg-red-100",
          textCol: "text-red-600",
        };
      case "lend_more":
        return {
          text: "Qo'shimcha qarz berish",
          bg: "bg-blue-100",
          textCol: "text-blue-600",
        };
      case "repayment":
      case "received":
        return {
          text:
            type === "repayment" ? "Qarzni qaytarish" : "Qarzni qabul qilish",
          bg: "bg-green-100",
          textCol: "text-green-600",
        };
      case "paid_off":
        return {
          text: "To'liq to'landi",
          bg: "bg-green-700",
          textCol: "text-white",
        };
      default:
        return { text: type, bg: "bg-gray-200", textCol: "text-gray-600" };
    }
  };

  const badge = getBadgeStyles(trd.type);

  return (
    <div className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px]">
      <div className="flex justify-between gap-3 px-3.5 py-2.5">
        <a className="text-[16px] font-bold text-green-600">
          {trd.customer.full_name}
        </a>
        <span
          className={`${badge.bg} ${badge.textCol} rounded-full text-[12px] font-bold px-2 py-1 whitespace-nowrap`}
        >
          {badge.text}
        </span>
      </div>

      <div className="w-full h-px bg-bg-fy"></div>

      <div className="px-3.5 py-2.5 flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col">
            <span className="text-[15px] font-medium text-[#6B7280]">
              Miqdor
            </span>
            <span className="text-[16px] font-bold text-green-600">
              {trd.amount.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-medium text-[#6B7280]">
              Keyingi Balans
            </span>
            <span
              className={`text-[16px] font-bold ${
                trd.balance_after < 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              {trd.balance_after < 0 ? "-" : ""}
              {Math.abs(trd.balance_after).toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-medium text-[#6B7280]">
              Tugash sanasi
            </span>
            <span className="text-[16px] font-bold text-[#4B5563]">
              {new Date(trd.due_date).toLocaleDateString("uz-UZ")}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-medium text-[#6B7280]">
              Holati
            </span>
            <div className="flex items-center gap-2">
              <div
                className={`h-3 w-3 rounded-full ${
                  trd.status === "open" ? "bg-green-500" : "bg-gray-400"
                }`}
              />
              <span className="text-[16px] font-bold text-[#4B5563]">
                {trd.status === "open" ? "Ochiq" : "Yopilgan"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="font-medium text-[#6B7280] text-[15px]">Izoh</span>
          <span className="text-[16px] font-bold text-[#4B5563]">
            {trd.description || "-"}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-medium text-[#6B7280] text-[15px]">
            Kiritilgan sana
          </span>
          <span className="text-[16px] font-bold text-[#4B5563]">
            {new Date(trd.created_at).toLocaleString("uz-UZ")}
          </span>
        </div>

        <div className="flex justify-end mt-1">
          <div className="flex items-center gap-5">
            <Edit
              size={20}
              className="text-green-600 cursor-pointer hover:opacity-80"
            />
            <Trash
              size={20}
              className="text-red-600 cursor-pointer hover:opacity-80"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CustomerTransactionDetailCard);

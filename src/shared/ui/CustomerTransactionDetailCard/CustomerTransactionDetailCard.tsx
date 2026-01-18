import { memo } from "react";
import { Edit, Trash, FileText, History, Wallet } from "lucide-react";
import type { CustomerTranscationDetailListItemsType } from "../../lib/model/customers/customer-transactions-detail-model";

interface TransactionDetailCardProps {
  trd: CustomerTranscationDetailListItemsType;
}

const CustomerTransactionDetailCard = ({ trd }: TransactionDetailCardProps) => {
  const getBadgeStyles = (type: string) => {
    switch (type) {
      case "borrow_more":
        return {
          text: "Qo'shimcha qarz olish",
          bg: "bg-rose-50",
          textCol: "text-rose-600",
        };
      case "lend_more":
        return {
          text: "Qo'shimcha qarz berish",
          bg: "bg-blue-50",
          textCol: "text-blue-600",
        };
      case "repayment":
      case "received":
        return {
          text:
            type === "repayment" ? "Qarzni qaytarish" : "Qarzni qabul qilish",
          bg: "bg-emerald-50",
          textCol: "text-emerald-600",
        };
      case "paid_off":
        return {
          text: "To'liq to'landi",
          bg: "bg-emerald-600",
          textCol: "text-white",
        };
      default:
        return { text: type, bg: "bg-slate-50", textCol: "text-slate-600" };
    }
  };

  const badge = getBadgeStyles(trd.type);
  const isBalanceDebt = trd.balance_after < 0;

  return (
    <div className="flex flex-col border border-bg-fy bg-white rounded-2xl p-4 gap-3">
      <div className="flex justify-between items-start gap-2">
        <div className="flex flex-col min-w-0">
          <h3 className="text-[17px] font-bold text-slate-900 truncate tracking-tight">
            {trd.customer.full_name}
          </h3>
          <div className="mt-1">
            <span
              className={`${badge.bg} ${badge.textCol} text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide`}
            >
              {badge.text}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end shrink-0">
          <span className="text-[18px] font-bold text-green-500 tabular-nums leading-tight">
            {trd.amount.toLocaleString()} UZS
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Miqdor
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 bg-slate-50/50 p-3 rounded-xl border border-slate-100/50">
        <div className="flex items-center gap-2 text-slate-600">
          <Wallet size={14} className="text-slate-400" />
          <span className="text-[13px] font-medium text-slate-400">
            Keyingi balans:
          </span>
          <span
            className={`text-[15px] font-bold ${isBalanceDebt ? "text-red-500" : "text-green-500"}`}
          >
            {isBalanceDebt ? "-" : ""}
            {Math.abs(trd.balance_after).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex items-start gap-2 px-1">
        <FileText size={14} className="text-slate-400 mt-0.5 shrink-0" />
        <p className="text-[13px] text-slate-500 font-medium leading-tight italic truncate">
          {trd.description || "Izoh qoldirilmagan"}
        </p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-50">
        <div className="flex items-center gap-2 text-slate-400">
          <History size={14} />
          <span className="text-[12px] font-medium">
            {new Date(trd.created_at).toLocaleString("uz-UZ")}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <div className="p-2 hover:bg-emerald-50 rounded-lg cursor-pointer transition-colors group">
            <Edit
              size={18}
              className="text-slate-400 group-hover:text-emerald-600"
            />
          </div>
          <div className="p-2 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors group">
            <Trash
              size={18}
              className="text-slate-400 group-hover:text-rose-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CustomerTransactionDetailCard);

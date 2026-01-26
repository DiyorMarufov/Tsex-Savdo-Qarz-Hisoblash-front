import React from "react";
import { Edit, History, FileText, User, Wallet } from "lucide-react";

interface Props {
  data: any;
}

const TsexTransactionCard: React.FC<Props> = ({ data }) => {
  const renderStatus = (type: string) => {
    const statusMap: Record<
      string,
      { bg: string; text: string; label: string }
    > = {
      "To'liq to'lov": {
        bg: "bg-emerald-50",
        text: "text-emerald-600",
        label: "To'liq To'lov",
      },
      "Qisman to'lov": {
        bg: "bg-amber-50",
        text: "text-amber-600",
        label: "Qisman To'lov",
      },
      "Qo'shimcha to'lov": {
        bg: "bg-blue-50",
        text: "text-blue-600",
        label: "Avans",
      },
      "Mol olish": {
        bg: "bg-rose-50",
        text: "text-rose-600",
        label: "Mol Olish",
      },
    };

    const status = statusMap[type] || {
      bg: "bg-slate-50",
      text: "text-slate-600",
      label: type,
    };

    return (
      <span
        className={`${status.bg} ${status.text} text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide`}
      >
        {status.label}
      </span>
    );
  };

  const isBalanceNegative = data.balance_after > 0;

  return (
    <div className="flex flex-col border border-bg-fy bg-white rounded-2xl p-4  gap-4">
      <div className="flex justify-between items-start gap-2">
        <div className="flex flex-col min-w-0">
          <h3 className="text-[17px] font-bold text-slate-900 truncate tracking-tight">
            {data.tsex}
          </h3>
          <div className="flex items-center gap-1.5 text-slate-500 mt-1">
            <User size={14} />
            <span className="text-[14px] font-medium truncate italic text-slate-400">
              {data.created_by}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end shrink-0">
          <span className="text-[18px] font-bold text-green-500 tabular-nums leading-tight">
            +{data.amount.toLocaleString()} UZS
          </span>
          <div className="mt-1">{renderStatus(data.type)}</div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400">
            <Wallet size={14} />
            <span className="text-[13px]">
              Balans:{" "}
              <span
                className={`font-bold ${isBalanceNegative ? "text-red-500" : "text-green-500"}`}
              >
                {isBalanceNegative ? "-" : ""}
                {Math.abs(data.balance_after).toLocaleString()}
              </span>
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <FileText size={14} className="text-slate-400 mt-0.5 shrink-0" />
          <span className="text-[12px] font-bold text-slate-500 tracking-tight line-clamp-1">
            {data.description || "Izoh qoldirilmagan"}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-50">
        <div className="flex items-center gap-2 text-slate-400">
          <History size={14} />
          <span className="text-[12px] font-medium">
            {new Date(data.created_at).toLocaleString("uz-UZ")}
          </span>
        </div>

        <div className="p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group">
          <Edit
            size={18}
            className="text-slate-400 group-hover:text-emerald-600"
          />
        </div>
      </div>
    </div>
  );
};

export default TsexTransactionCard;

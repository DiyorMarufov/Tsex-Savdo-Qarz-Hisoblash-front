import { Edit, Trash, History, FileText, Calendar, Circle } from "lucide-react";
import { Button as AntdButton } from "antd";
import { memo } from "react";
import type { CustomerTranscationsListItemsType } from "../../lib/model/customers/customer-transactions-model";

interface TransactionCardProps {
  trd: CustomerTranscationsListItemsType;
  onDetail: (id: string, type: "lending" | "borrowing") => void;
}

const CustomerTransactionCard = ({ trd, onDetail }: TransactionCardProps) => {
  const isBalanceDebt = trd.balance_after < 0;

  return (
    <div className="flex flex-col border border-bg-fy bg-white rounded-2xl p-4 gap-3">
      <div className="flex justify-between items-start gap-2">
        <div className="flex flex-col min-w-0">
          <h3 className="text-[17px] font-bold text-slate-900 truncate tracking-tight">
            {trd.customer.full_name}
          </h3>
          <div className="mt-1">
            {(() => {
              switch (trd.type) {
                case "borrowing":
                  return (
                    <span className="bg-rose-50 text-[11px] rounded-full text-rose-600 font-bold px-2 py-0.5 uppercase tracking-wide">
                      Qarz olish
                    </span>
                  );
                case "real":
                  return (
                    <span className="bg-orange-50 text-[11px] rounded-full text-orange-600 font-bold px-2 py-0.5 uppercase tracking-wide">
                      Real
                    </span>
                  );
                case "lending":
                  return (
                    <span className="bg-blue-50 text-[11px] rounded-full text-blue-600 font-bold px-2 py-0.5 uppercase tracking-wide">
                      Qarz berish
                    </span>
                  );
                case "full_payment":
                  return (
                    <span className="bg-emerald-50 text-[11px] rounded-full text-emerald-600 font-bold px-2 py-0.5 uppercase tracking-wide">
                      To'liq to'lov
                    </span>
                  );
                case "partial_payment":
                  return (
                    <span className="bg-sky-50 text-[11px] rounded-full text-sky-600 font-bold px-2 py-0.5 uppercase tracking-wide">
                      Qisman to'lov
                    </span>
                  );
                case "avans":
                  return (
                    <span className="bg-purple-50 text-[11px] rounded-full text-purple-600 font-bold px-2 py-0.5 uppercase tracking-wide">
                      Avans
                    </span>
                  );
                default:
                  return (
                    <span className="bg-slate-50 text-[11px] rounded-full text-slate-600 font-bold px-2 py-0.5 uppercase tracking-wide">
                      {trd.type}
                    </span>
                  );
              }
            })()}
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-600">
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

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400">
            <Calendar size={14} />
            <span className="text-[13px]">
              Muddati:{" "}
              <span className="text-slate-600 font-bold">
                {trd.due_date
                  ? new Date(trd.due_date).toLocaleDateString("uz-UZ")
                  : "-"}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Circle
              size={8}
              fill={trd.status === "open" ? "#10b981" : "#94a3b8"}
              className={
                trd.status === "open" ? "text-emerald-500" : "text-slate-400"
              }
            />
            <span className="text-[12px] font-bold text-slate-500 uppercase">
              {trd.status === "open" ? "Ochiq" : "Yopilgan"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2 px-1">
        <FileText size={14} className="text-slate-400 mt-0.5 shrink-0" />
        <p className="text-[13px] text-slate-500 font-medium leading-tight italic truncate">
          {trd.description || "Izoh qoldirilmagan"}
        </p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-50">
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

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-400">
            <History size={14} />
            <span className="text-[12px]">
              {new Date(trd.created_at).toLocaleString("uz-UZ")}
            </span>
          </div>
          {(trd.type === "lending" || trd.type === "borrowing") && (
            <AntdButton
              type="primary"
              className="h-8! rounded-xl! border-none!"
              onClick={() =>
                onDetail(trd.id as string, trd.type as "lending" | "borrowing")
              }
            >
              Batafsil
            </AntdButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(CustomerTransactionCard);

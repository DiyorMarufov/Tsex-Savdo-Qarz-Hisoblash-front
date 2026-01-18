import { memo } from "react";
import { Button as AntdButton } from "antd";
import { Edit, Trash, MapPin, Phone, Calendar, Circle } from "lucide-react";
import { formatPhoneNumber } from "../../lib/functions/formatPhoneNumber";
import type { CustomersListItemsType } from "../../lib/model/customers/customers-model";

interface Props {
  cs: CustomersListItemsType;
  onDetail: (id: string) => void;
}

const CustomerCard = ({ cs, onDetail }: Props) => {
  const isDebt = cs.balance < 0;

  return (
    <div className="flex flex-col border border-bg-fy bg-white rounded-2xl p-4 gap-3">
      <div className="flex justify-between items-start gap-2">
        <div className="flex flex-col min-w-0">
          <h3 className="text-[18px] font-bold text-slate-900 truncate tracking-tight leading-tight">
            {cs.full_name}
          </h3>
          <div className="flex items-center gap-1.5 text-slate-500 mt-1">
            <MapPin size={14} />
            <span className="text-[14px] font-medium truncate italic">
              {cs.region}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end shrink-0">
          <span
            className={`text-[17px] font-bold tabular-nums ${isDebt ? "text-red-500" : "text-green-500"}`}
          >
            {isDebt ? "-" : "+"}
            {Math.abs(cs.balance).toLocaleString()} UZS
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Balans
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 bg-slate-50/50 p-3 rounded-xl border border-slate-100/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-600">
            <Phone size={14} className="text-slate-400" />
            <span className="text-[14px] font-bold tracking-tight">
              {formatPhoneNumber(cs.phone_number)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Circle
            size={8}
            fill={cs.last_transaction ? "#10b981" : "#94a3b8"}
            className={
              cs.last_transaction ? "text-green-500" : "text-slate-400"
            }
          />
          <span className="text-[12px] font-bold text-slate-500 truncate tracking-tight">
            {cs.last_transaction
              ? cs.last_transaction
              : "Hozircha yo'q"}
          </span>
        </div>
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
            <Calendar size={13} />
            <span className="text-[12px]">
              {new Date(cs.created_at).toLocaleDateString("uz-UZ")}
            </span>
          </div>
          <AntdButton
            type="primary"
            className="h-8! rounded-xl! border-none!"
            onClick={() => onDetail(cs.id as string)}
          >
            Batafsil
          </AntdButton>
        </div>
      </div>
    </div>
  );
};

export default memo(CustomerCard);

import { memo } from "react";
import { Button as AntdButton } from "antd";
import { Edit, User, Calendar, Circle } from "lucide-react";
import type { TsexTableListItem } from "../../lib/model/tsexes/tsexes-model";

interface TsexCardProps {
  ts: TsexTableListItem;
  onDetail: (id: string) => void;
}

const TsexCard = ({ ts, onDetail }: TsexCardProps) => {
  const isNegative = ts?.balance > 0;

  return (
    <div className="flex flex-col border border-bg-fy bg-white rounded-2xl p-4 gap-3">
      <div className="flex justify-between items-start gap-2">
        <div className="flex flex-col min-w-0">
          <h3 className="text-[18px] font-bold text-slate-900 truncate tracking-tight leading-tight">
            {ts?.name}
          </h3>
          <div className="flex items-center gap-1.5 text-slate-500 mt-1">
            <User size={14} />
            <span className="text-[14px] font-medium truncate italic">
              {ts?.manager?.full_name}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end shrink-0">
          <span
            className={`text-[17px] font-bold tabular-nums ${isNegative ? "text-red-500" : "text-green-500"}`}
          >
            {isNegative ? "-" : "+"}
            {Math.abs(ts?.balance).toLocaleString()} UZS
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Balans
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400">
            <Calendar size={14} />
            <span className="text-[13px]">
              Kiritilgan: {new Date(ts.created_at).toLocaleDateString("uz-UZ")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Circle
            size={8}
            fill={ts?.last_transaction ? "#10b981" : "#94a3b8"}
            className={
              ts?.last_transaction ? "text-emerald-500" : "text-slate-400"
            }
          />
          <span className="text-[12px] font-bold text-slate-500 tracking-tight">
            {ts?.last_transaction ? ts?.last_transaction : "Hozircha yo'q"}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-50">
        <div className="p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group">
          <Edit
            size={18}
            className="text-slate-400 group-hover:text-emerald-600"
          />
        </div>

        <AntdButton
          type="primary"
          className="h-8! rounded-xl! border-none!"
          onClick={() => onDetail(ts.id)}
        >
          Batafsil
        </AntdButton>
      </div>
    </div>
  );
};

export default memo(TsexCard);

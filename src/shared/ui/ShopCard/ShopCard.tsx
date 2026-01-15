import { memo } from "react";
import { Edit, Trash, MapPin, Calendar } from "lucide-react";
import type { StoresTableListItem } from "../../lib/model/shops/shops-table-model";

interface StoreCardProps {
  store: StoresTableListItem;
}

const StoreCard = ({ store }: StoreCardProps) => {
  return (
    <div className="flex flex-col border border-bg-fy bg-white rounded-2xl p-4 gap-4">
      <div className="flex justify-between items-start gap-2">
        <div className="flex flex-col min-w-0">
          <h3 className="text-[17px] font-bold text-slate-900 truncate tracking-tight">
            {store?.name}
          </h3>

          <div className="flex items-start gap-1.5 text-slate-500 mt-1">
            <MapPin size={14} className="mt-0.5 shrink-0" />
            <span className="text-[14px] font-medium leading-tight">
              {store?.address}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <div className="p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group">
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

      <div className="flex items-center pt-3 border-t border-slate-50">
        <div className="flex items-center gap-2 text-slate-400">
          <Calendar size={14} />
          <span className="text-[13px] font-medium text-slate-500">
            Kiritilgan sana:{" "}
            <span className="font-bold">
              {new Date(store.created_at).toLocaleDateString("uz-UZ")}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(StoreCard);

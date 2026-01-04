import { memo } from "react";
import { Edit, Trash } from "lucide-react";
import type { StoresTableListItem } from "../../lib/model/shops/shops-table-model";

interface StoreCardProps {
  store: StoresTableListItem;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const StoreCard = ({ store, onEdit, onDelete }: StoreCardProps) => {
  return (
    <div className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px]">
      <div className="px-3.5 py-2.5 flex justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[16px] font-bold">{store?.name}</span>
          <span className="font-bold text-[15px] text-[#4B5563]">
            {store?.address}
          </span>
        </div>
        <div className="flex items-center gap-5">
          <Edit
            className="text-green-600 cursor-pointer hover:opacity-80"
            onClick={() => onEdit?.(store.id)}
          />
          <Trash
            className="text-red-600 cursor-pointer hover:opacity-80"
            onClick={() => onDelete?.(store.id)}
          />
        </div>
      </div>

      <div className="w-full h-px bg-bg-fy"></div>

      <div className="px-3.5 py-2.5">
        <span className="text-[15px] font-medium text-[#6B7280]">
          Kiritilgan sana:{" "}
          <span className="text-[16px] font-bold text-[#4B5563]">
            {new Date(store.created_at)?.toLocaleString("uz-UZ")}
          </span>
        </span>
      </div>
    </div>
  );
};

export default memo(StoreCard);

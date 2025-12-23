import { memo } from "react";
import { Edit } from "lucide-react";
import type { SaleItemsTableListItem } from "../../../pages/superadmin/reports/model/sales-items-detail-model";

interface SaleItemDetailCardProps {
  item: SaleItemsTableListItem;
}

const SaleItemDetailCard = ({ item }: SaleItemDetailCardProps) => {
  return (
    <div className="flex flex-col gap-3 border border-bg-fy bg-[#ffffff] rounded-[12px] overflow-hidden">
      <div className="flex justify-between items-center gap-3 pt-3 px-3.5">
        <div className="flex flex-col items-start">
          <span className="text-[15px] font-bold text-[#64748B]">Mahsulot</span>
          <a className="text-[16px] font-bold">{item.product.name}</a>
        </div>
        <div className="flex flex-col items-end">
          <Edit className="text-green-600 cursor-pointer hover:opacity-80" />
        </div>
      </div>

      <div className="flex px-3.5">
        <div className="flex flex-col w-1/2">
          <span className="text-[15px] font-medium text-[#6B7280]">Soni</span>
          <span className="text-[16px] font-bold text-[#4B5563]">
            {item.quantity}
          </span>
        </div>
        <div className="flex flex-col w-1/2">
          <span className="text-[15px] font-medium text-[#6B7280]">Narxi</span>
          <span className="text-[16px] font-bold text-green-500">
            {item.price.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="w-full h-px bg-bg-fy"></div>

      <div className="flex px-3.5 pb-3">
        <div className="flex flex-col w-1/2">
          <span className="text-[15px] font-medium text-[#6B7280]">
            Umumiy Summa
          </span>
          <span className="text-[16px] font-bold text-green-500">
            {item.total_amount.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col w-1/2">
          <span className="text-[15px] font-medium text-[#6B7280]">
            Sotuv Sanasi
          </span>
          <span className="text-[15px] font-bold text-[#4B5563]">
            {item.created_at.toLocaleString("uz-UZ")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(SaleItemDetailCard);

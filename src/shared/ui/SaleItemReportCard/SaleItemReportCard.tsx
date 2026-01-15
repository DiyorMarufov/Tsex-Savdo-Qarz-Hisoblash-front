import { memo } from "react";
import { Package, Tag, Calculator, Layers } from "lucide-react";
import type { SaleItemsTableListItem } from "../../lib/model/reports/sales-items-detail-model";

interface SaleItemRepordCard {
  item: SaleItemsTableListItem;
}

const SaleItemReportCard = ({ item }: SaleItemRepordCard) => {
  return (
    <div className="flex flex-col border border-bg-fy bg-white rounded-2xl p-4 transition-all gap-3">
      <div className="flex justify-between items-start gap-2">
        <div className="flex flex-col min-w-0">
          <h3 className="text-[17px] font-bold text-slate-900 truncate tracking-tight leading-tight">
            {item.product}
          </h3>
          <div className="flex items-center gap-1.5 text-slate-500 mt-1">
            <Tag size={14} className="text-slate-400" />
            <span className="text-[14px] font-medium truncate italic text-slate-400">
              {item.product_brand}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end shrink-0">
          <span className="text-[18px] font-bold text-green-500 tabular-nums leading-tight">
            {item.total_amount?.toLocaleString()} uzs
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Jami Summa
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-3 rounded-xl border border-slate-100/50">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
            Soni
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Package size={14} className="text-slate-400" />
            <span className="text-[15px] font-bold text-slate-700">
              {item.quantity}{" "}
              <small className="text-[11px] font-medium text-slate-400">
                pochka
              </small>
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight text-right">
            Sotuv narxi
          </span>
          <span className="text-[15px] font-bold text-green-500">
            {item.sale_price?.toLocaleString()} uzs
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between text-[13px]">
          <div className="flex items-center gap-2 text-slate-400">
            <Layers size={14} />
            <span>Pochkada:</span>
          </div>
          <span className="font-bold text-slate-600">
            {item.product_unit_in_package} talik
          </span>
        </div>

        <div className="flex items-center justify-between text-[13px]">
          <div className="flex items-center gap-2 text-slate-400">
            <Calculator size={14} />
            <span>Tannarxi:</span>
          </div>
          <span className="font-bold text-green-500">
            {item.product_price?.toLocaleString()} uzs
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(SaleItemReportCard);

import { memo } from "react";
import type { SaleItemsTableListItem } from "../../../pages/superadmin/reports/model/sales-items-detail-model";

interface SaleItemRepordCard {
  item: SaleItemsTableListItem;
}

const SaleItemReportCard = ({ item }: SaleItemRepordCard) => {
  return (
    <div className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px]">
      <div className="flex justify-between px-3.5 py-2.5">
        <div className="flex flex-col">
          <span className="text-[15px] font-bold text-[#4B5563]">
            {item.product_brand}
          </span>
          <a className="text-[16px] font-bold">{item.product}</a>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3 px-3.5">
          <div className="flex flex-col">
            <span className="text-[15px] font-medium text-[#6B7280]">Soni</span>
            <span className="text-[16px] font-bold text-[#4B5563]">
              {item.quantity} dona
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-medium text-[#6B7280]">
              Sotuv narxi
            </span>
            <span className="text-[16px] font-bold text-green-600">
              {item.sale_price?.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col border-t border-gray-50">
            <span className="text-[15px] font-medium text-[#6B7280]">
              Tannarxi
            </span>
            <span className="text-[16px] font-bold text-green-600">
              {item.product_price?.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col border-t border-gray-50">
            <span className="text-[15px] font-medium text-[#6B7280]">
              Pochkada
            </span>
            <span className="text-[16px] font-bold text-[#4B5563]">
              {item.product_unit_in_package} talik
            </span>
          </div>
        </div>

        <div className="w-full h-px bg-bg-fy mt-1"></div>

        <div className="flex justify-end gap-1 items-center px-3.5 pb-4 pt-1">
          <span className="text-[15px] font-medium text-[#6B7280]">
            Jami Summa:
          </span>
          <span className="text-[18px] font-bold text-green-600">
            {item.total_amount?.toLocaleString()}{" "}
            <small className="text-[12px]">uzs</small>
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(SaleItemReportCard);

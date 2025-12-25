import { memo } from "react";
import { Button as AntdButton } from "antd";
import type { SalesTableListItem } from "../../../pages/superadmin/reports/model/sales-model";

interface SaleReportCardProps {
  item: SalesTableListItem;
  onDetail: (id: string) => void;
}

const SaleReportCard = ({ item, onDetail }: SaleReportCardProps) => {
  return (
    <div className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px]">
      <div className="flex justify-between px-3.5 py-2.5">
        <div className="flex flex-col">
          <span className="text-[15px] font-bold text-[#6B7280]">
            {item.shop.name}
          </span>
          <a className="text-[16px] font-bold">{item.customer.full_name}</a>
        </div>
        <div className="flex items-center gap-3">
          <div
            className={`px-2 rounded-full text-[16px] font-bold 
            ${
              item.type === "full_payment"
                ? "bg-green-100 text-green-700"
                : item.type === "partial_payment"
                ? "bg-yellow-100 text-yellow-700"
                : item.type === "real"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-[#4B5563]"
            }`}
          >
            <span className="text-[12px] font-bold">
              {item.type === "full_payment"
                ? "To'liq to'lov"
                : item.type === "partial_payment"
                ? "Qisman to'lov"
                : item.type === "real"
                ? "Real"
                : item.type}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3 px-3.5">
          <div className="flex flex-col justify-start">
            <span className="text-[15px] font-medium text-[#6B7280]">
              Summa
            </span>
            <span className="text-[16px] font-bold text-green-600">
              {item.total_amount.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col justify-start">
            <span className="text-[15px] font-medium text-[#6B7280]">
              To'langan
            </span>
            <span className="text-[16px] font-bold text-green-600">
              {item.paid_amount.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col justify-start">
            <span className="text-[15px] font-medium text-[#6B7280]">Qarz</span>
            <span
              className={`text-[16px] font-bold ${
                item.debt > 0 ? "text-red-500" : "text-green-600"
              }`}
            >
              {item.debt > 0
                ? `-${item.debt.toLocaleString()}`
                : item.debt.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col justify-start">
            <span className="text-[15px] font-medium text-[#6B7280]">
              Sotuvchi
            </span>
            <span className="text-[16px] font-bold text-[#4B5563]">
              {item.seller.full_name}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-start px-3.5">
          <span className="text-[15px] font-medium text-[#6B7280]">
            Kiritilgan sana
          </span>
          <span className="text-[16px] font-bold text-[#4B5563]">
            {new Date(item.created_at).toLocaleString("uz-UZ")}
          </span>
        </div>

        <div className="w-full h-px bg-bg-fy"></div>

        <div className="flex justify-end px-3.5 pb-3">
          <AntdButton
            className="bg-[#1D4ED8]! text-white!"
            onClick={() => onDetail(item.id as string)}
          >
            Batafsil
          </AntdButton>
        </div>
      </div>
    </div>
  );
};

export default memo(SaleReportCard);

import { memo } from "react";

interface SaleInfo {
  customerName?: string;
  date?: string | Date;
  totalAmount?: number;
}

interface SaleItemReportHeaderProps {
  saleInfo: SaleInfo;
  total: number;
}

const SaleItemReportHeader = ({
  saleInfo,
  total,
}: SaleItemReportHeaderProps) => {
  return (
    <div className="flex justify-between items-center border border-bg-fy bg-[#ffffff] rounded-[12px] p-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-[#6B7280] font-bold uppercase tracking-widest">
              Mijoz
            </span>
            <span className="bg-blue-50 text-blue-600 text-[11px] font-bold px-2 py-0.5 rounded-full border border-blue-100">
              {total || 0} ta mahsulot
            </span>
          </div>
          <h2 className="text-[18px] font-extrabold text-[#111827] leading-tight mt-0.5">
            {saleInfo?.customerName || "Noma'lum"}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-[#94A3B8] font-medium">
            {saleInfo?.date
              ? new Date(saleInfo.date).toLocaleString("uz-UZ")
              : "---"}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end bg-blue-50 px-4 py-2 rounded-[12px] border border-blue-100">
        <span className="text-[11px] text-blue-500 font-bold uppercase tracking-wider">
          Umumiy summa
        </span>
        <div className="flex items-baseline">
          <span className="text-[20px] font-black text-blue-600">
            {saleInfo?.totalAmount?.toLocaleString()}
          </span>
          <small className="ml-1 text-[12px] font-bold text-blue-600 uppercase">
            UZS
          </small>
        </div>
      </div>
    </div>
  );
};

export default memo(SaleItemReportHeader);

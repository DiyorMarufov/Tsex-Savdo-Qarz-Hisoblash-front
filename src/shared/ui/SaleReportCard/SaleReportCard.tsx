import { memo } from "react";
import { Button as AntdButton, Image } from "antd";
import { User, Store, Calendar, CreditCard, Wallet } from "lucide-react";
import type { SalesTableListItem } from "../../lib/model/reports/sales-model";

interface SaleReportCardProps {
  item: SalesTableListItem;
  onDetail: (id: string) => void;
}

const SaleReportCard = ({ item, onDetail }: SaleReportCardProps) => {
  const isDebt = item.debt > 0;

  const renderStatus = (type: string) => {
    const statusMap: Record<
      string,
      { bg: string; text: string; label: string }
    > = {
      full_payment: {
        bg: "bg-emerald-50",
        text: "text-emerald-600",
        label: "To'liq to'lov",
      },
      partial_payment: {
        bg: "bg-amber-50",
        text: "text-amber-600",
        label: "Qisman to'lov",
      },
      real: { bg: "bg-blue-50", text: "text-blue-600", label: "Real" },
    };

    const status = statusMap[type] || {
      bg: "bg-slate-50",
      text: "text-slate-600",
      label: type,
    };

    return (
      <span
        className={`${status.bg} ${status.text} text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide`}
      >
        {status.label}
      </span>
    );
  };

  return (
    <div className="flex flex-col border border-bg-fy bg-white rounded-2xl p-4 gap-3">
      <div className="flex justify-between items-start gap-2">
        <div className="flex gap-3 min-w-0">
          <div className="w-12 h-12 border border-bg-fy rounded-xl overflow-hidden">
            <Image
              src={item.images?.[0]?.image_url}
              alt="sale"
              className="w-full! h-full! object-cover!"
              wrapperClassName="w-full h-full"
            />
          </div>

          <div className="flex flex-col min-w-0">
            <h3 className="text-[16px] font-bold text-slate-900 truncate leading-tight">
              {item.customer.full_name}
            </h3>
            <div className="flex items-center gap-1.5 text-slate-500 mt-1">
              <Store size={14} className="text-slate-400" />
              <span className="text-[13px] font-medium truncate italic">
                {item.shop.name}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end shrink-0 gap-1.5">
          <span className="text-[17px] font-bold text-green-500 tabular-nums leading-tight">
            {item.total_amount.toLocaleString()} uzs
          </span>
          {renderStatus(item.type)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-3 rounded-xl border border-slate-100/50">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-slate-400">
            <CreditCard size={13} />
            <span className="text-[10px] font-bold uppercase tracking-tight">
              To'langan
            </span>
          </div>
          <span className="text-[15px] font-bold text-green-500">
            {item.paid_amount.toLocaleString()} uzs
          </span>
        </div>

        <div className="flex flex-col gap-1 items-end">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Wallet size={13} />
            <span className="text-[10px] font-bold uppercase tracking-tight">
              Qarz
            </span>
          </div>
          <span
            className={`text-[15px] font-bold ${isDebt ? "text-red-500" : "text-emerald-500"}`}
          >
            {isDebt ? "-" : ""}
            {Math.abs(item.debt).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 px-1">
        <div className="flex items-center gap-2 text-slate-500">
          <User size={14} className="text-slate-400" />
          <span className="text-[13px] font-medium">
            Sotuvchi:{" "}
            <span className="text-slate-700 font-bold">
              {item.seller.full_name}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <Calendar size={14} className="text-slate-400" />
          <span className="text-[13px] font-medium">
            Sana:{" "}
            <span className="font-bold text-slate-600">
              {new Date(item.created_at).toLocaleString("uz-UZ")}
            </span>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-end pt-2 border-t border-slate-50">
        <AntdButton
          type="primary"
          className="h-8! rounded-xl! border-none!"
          onClick={() => onDetail(item.id as string)}
        >
          Batafsil
        </AntdButton>
      </div>
    </div>
  );
};

export default memo(SaleReportCard);

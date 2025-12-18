import { memo } from "react";
import { Button as AntdButton } from "antd";
import { Edit } from "lucide-react";
import type { TsexTableListItem } from "../../../pages/superadmin/tsexes/model/tsexes-model";

interface TsexCardProps {
  ts: TsexTableListItem;
  onDetail: (id: string) => void;
}

const TsexCard = ({ ts, onDetail }: TsexCardProps) => {
  return (
    <div className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px] overflow-hidden">
      <div className="flex flex-col">
        <div className="grid grid-cols-2 gap-3 px-3.5 py-2.5">
          <div className="flex flex-col justify-start">
            <span className="text-[15px] font-medium text-[#6B7280]">Nomi</span>
            <a className="text-[16px] font-bold text-green-600 truncate">
              {ts?.name}
            </a>
          </div>
          <div className="flex flex-col justify-start">
            <span className="text-[15px] font-medium text-[#6B7280]">
              Tsex Manager
            </span>
            <span className="text-[16px] font-bold text-[#4B5563] truncate">
              {ts?.tsex}
            </span>
          </div>
          <div className="flex flex-col justify-start">
            <span className="text-[15px] font-medium text-[#6B7280] whitespace-nowrap">
              Balansi
            </span>
            {ts?.balance > 0 ? (
              <span className="text-[16px] font-bold text-red-500">
                -{Math.abs(ts?.balance).toLocaleString()}
              </span>
            ) : (
              <span className="text-[16px] font-bold text-green-500">
                {Math.abs(ts?.balance).toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 pb-2.5 px-3.5">
          <div className="flex flex-col">
            <span className="font-medium text-[#6B7280] text-[15px]">
              Oxirgi operatsiya
            </span>
            <span className="text-[16px] font-bold text-[#4B5563]">
              {ts?.last_operation}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-medium text-[#6B7280] text-[15px]">
              Kiritilgan sana
            </span>
            <span className="text-[16px] font-bold text-[#4B5563]">
              {ts.created_at.toLocaleString("uz-UZ")}
            </span>
          </div>
        </div>

        <div className="w-full h-px bg-bg-fy"></div>

        <div className="flex justify-between items-center px-3.5 py-3">
          <div className="flex items-center gap-5">
            <Edit className="text-green-600 cursor-pointer hover:opacity-80 transition-opacity" />
          </div>
          <AntdButton
            className="bg-[#1D4ED8]! text-white! border-none"
            onClick={() => onDetail(ts.id)}
          >
            Batafsil
          </AntdButton>
        </div>
      </div>
    </div>
  );
};

export default memo(TsexCard);

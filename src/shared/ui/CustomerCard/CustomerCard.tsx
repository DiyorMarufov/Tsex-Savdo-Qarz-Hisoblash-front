import { memo } from "react";
import { Button as AntdButton } from "antd";
import { Edit, Trash } from "lucide-react";
import type { CustomersListItemsType } from "../../../pages/superadmin/customers/model/customers-model";

interface Props {
  cs: CustomersListItemsType;
  onDetail: (id: string) => void;
}

const CustomerCard = ({ cs, onDetail }: Props) => {
  return (
    <div className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px] overflow-hidden">
      <div className="flex flex-col">
        <div className="grid grid-cols-2 gap-3 px-3.5 py-2.5">
          <div className="flex flex-col justify-start">
            <span className="text-[15px] font-medium text-[#6B7280]">
              Mijoz
            </span>
            <a className="text-[16px] font-bold text-green-600 truncate">
              {cs.full_name}
            </a>
          </div>
          <div className="flex flex-col justify-start">
            <span className="text-[15px] font-medium text-[#6B7280]">
              Hudud
            </span>
            <span className="text-[16px] font-bold text-[#4B5563] truncate">
              {cs.region}
            </span>
          </div>
          <div className="flex flex-col justify-start">
            <span className="text-[15px] font-medium text-[#6B7280] whitespace-nowrap">
              Balansi
            </span>
            {cs.balance > 0 ? (
              <span className="text-[16px] font-bold text-red-500">
                -{Math.abs(cs.balance).toLocaleString()}
              </span>
            ) : (
              <span className="text-[16px] font-bold text-green-500">
                {Math.abs(cs.balance).toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex flex-col justify-start">
            <span className="text-[15px] font-medium text-[#6B7280]">
              Telefon
            </span>
            <span className="text-[16px] font-bold text-[#4B5563] truncate">
              {cs.phone_number}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 pb-2.5 px-3.5">
          <div className="flex flex-col">
            <span className="font-medium text-[#6B7280] text-[15px]">
              Oxirgi operatsiya
            </span>
            <span className="text-[16px] font-bold text-[#4B5563]">
              {cs.last_transaction ? cs.last_transaction : "Hozircha yo'q"}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-medium text-[#6B7280] text-[15px]">
              Kiritilgan sana
            </span>
            <span className="text-[16px] font-bold text-[#4B5563]">
              {new Date(cs.created_at).toLocaleString("uz-UZ")}
            </span>
          </div>
        </div>

        <div className="w-full h-px bg-bg-fy"></div>

        <div className="flex justify-between items-center px-3.5 py-3">
          <div className="flex items-center gap-5">
            <Edit className="text-green-600 cursor-pointer hover:opacity-80 transition-opacity" />
            <Trash className="text-red-600 cursor-pointer hover:opacity-80 transition-opacity" />
          </div>
          <AntdButton
            className="bg-[#1D4ED8]! text-white! border-none"
            onClick={() => onDetail(cs.id as string)}
          >
            Batafsil
          </AntdButton>
        </div>
      </div>
    </div>
  );
};

export default memo(CustomerCard);

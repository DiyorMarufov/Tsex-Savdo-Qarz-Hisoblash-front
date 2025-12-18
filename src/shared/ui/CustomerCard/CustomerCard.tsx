import { memo } from "react";
import { Button as AntdButton } from "antd";
import { Edit, Trash } from "lucide-react";
import type { CustomersListItemsType } from "../../../pages/superadmin/customers/model/customers-model";

interface Props {
  cs: CustomersListItemsType;
  onDetail: (id: string) => void;
}

const CustomerCard = ({ cs, onDetail }: Props) => (
  <div className="flex flex-col gap-3 border border-bg-fy bg-[#ffffff] rounded-[12px] overflow-hidden">
    <div className="flex justify-between items-center gap-3 pt-2.5 px-3.5">
      <div className="flex flex-col items-start">
        <span className="text-[16px] font-bold">{cs.full_name}</span>
        <span className="text-[15px] font-bold text-[#64748B]">
          {cs.region}
        </span>
      </div>
      <div className="flex flex-col items-end">
        <span
          className={`text-[16px] font-bold ${
            cs.balance > 0 ? "text-red-500" : "text-green-500"
          }`}
        >
          {cs.balance > 0
            ? `-${Math.abs(cs.balance).toLocaleString()}`
            : Math.abs(cs.balance).toLocaleString()}
        </span>
      </div>
    </div>
    <div className="flex flex-col px-3.5 gap-1">
      <div className="flex justify-between">
        <span className="text-[#6B7280]">Tel</span>
        <span className="font-bold">{cs.phone_number}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-[#6B7280]">Sana</span>
        <span className="font-bold">
          {cs.created_at.toLocaleString("uz-UZ")}
        </span>
      </div>
    </div>
    <div className="w-full h-px bg-bg-fy"></div>
    <div className="flex items-center justify-between px-3.5 pb-3">
      <div className="flex gap-5">
        <Edit className="text-green-600" />
        <Trash className="text-red-600" />
      </div>
      <AntdButton
        className="bg-[#1D4ED8]! text-white!"
        onClick={() => onDetail(cs.id as string)}
      >
        Batafsil
      </AntdButton>
    </div>
  </div>
);

export default memo(CustomerCard);

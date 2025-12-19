import { Edit, Trash } from "lucide-react";
import { Button as AntdButton } from "antd";
import { memo } from "react";
import type { CustomerTranscationsListItemsType } from "../../../pages/superadmin/customers/model/customer-transactions-model";

interface TransactionCardProps {
  trd: CustomerTranscationsListItemsType;
  onDetail: (id: string) => void;
}

const CustomerTransactionCard = ({ trd, onDetail }: TransactionCardProps) => {
  return (
    <div className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px]">
      <div className="flex justify-between items-center px-3.5 py-2">
        <a className="text-[16px] font-bold text-green-600 w-fit">
          {trd.customer.full_name}
        </a>
        <div className="mt-1 whitespace-nowrap">
          {trd.type === "borrowing" ? (
            <span className="bg-red-100 text-[12px] rounded-full text-red-600 font-bold px-2 py-1">
              Qarz olish
            </span>
          ) : (
            <span className="bg-blue-100 text-[12px] rounded-full text-blue-600 font-bold px-2 py-1">
              Qarz berish
            </span>
          )}
        </div>
      </div>

      <div className="w-full h-px bg-bg-fy"></div>

      <div className="p-3.5 py-2.5 flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col">
            <span className="text-[15px] font-medium text-[#6B7280]">
              Miqdor
            </span>
            <span className="text-[16px] font-bold text-green-600">
              {trd.amount.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-medium text-[#6B7280]">
              Balans
            </span>
            <span
              className={`text-[16px] font-bold ${
                trd.balance_after < 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              {trd.balance_after < 0 ? "-" : ""}
              {Math.abs(trd.balance_after).toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-medium text-[#6B7280]">
              Muddati
            </span>
            <span className="text-[16px] font-bold text-[#4B5563]">
              {new Date(trd.due_date).toLocaleDateString("uz-UZ")}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-medium text-[#6B7280]">
              Holati
            </span>
            <div className="flex items-center gap-2">
              <div
                className={`h-3 w-3 rounded-full ${
                  trd.status === "open" ? "bg-green-500" : "bg-gray-400"
                }`}
              />
              <span className="text-[16px] font-bold text-[#4B5563]">
                {trd.status === "open" ? "Ochiq" : "Yopilgan"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="font-medium text-[#6B7280] text-[15px]">Izoh</span>
          <span className="text-[16px] font-bold text-[#4B5563]">
            {trd.description || "-"}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-medium text-[#6B7280] text-[15px]">
            Kiritilgan sana
          </span>
          <span className="text-[16px] font-bold text-[#4B5563]">
            {new Date(trd.created_at).toLocaleString("uz-UZ")}
          </span>
        </div>

        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center gap-5">
            <Edit
              size={20}
              className="text-green-600 cursor-pointer hover:opacity-80"
            />
            <Trash
              size={20}
              className="text-red-600 cursor-pointer hover:opacity-80"
            />
          </div>
          <AntdButton
            className="bg-[#1D4ED8]! text-white!"
            onClick={() => onDetail(trd.id as string)}
          >
            Batafsil
          </AntdButton>
        </div>
      </div>
    </div>
  );
};

export default memo(CustomerTransactionCard);

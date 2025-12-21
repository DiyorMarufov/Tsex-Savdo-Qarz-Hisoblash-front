import React, { type JSX } from "react";
import { Edit } from "lucide-react"; // Yoki sizda qaysi kutubxona bo'lsa

interface Props {
  data: any;
}

const TsexTransactionCard: React.FC<Props> = ({ data }) => {
  const renderStatus = (type: string) => {
    const statusMap: Record<string, JSX.Element> = {
      "To'liq to'lov": (
        <span className="bg-green-100 rounded-full text-green-500 px-2 py-1">
          To'liq To'lov
        </span>
      ),
      "Qisman to'lov": (
        <span className="bg-yellow-100 rounded-full text-yellow-500 px-2 py-1">
          Qisman To'lov
        </span>
      ),
      "Qo'shimcha to'lov": (
        <span className="bg-blue-100 rounded-full text-blue-500 px-2 py-1">
          Avans (Oldindan)
        </span>
      ),
      "Mol olish": (
        <span className="bg-red-100 rounded-full text-red-500 px-2 py-1">
          Mol Olish
        </span>
      ),
    };
    return statusMap[type] || type;
  };

  return (
    <div className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px] overflow-hidden">
      <div className="px-3.5 py-2.5 flex justify-between items-center">
        <a className="text-[16px] font-bold">{data.tsex}</a>
        <span className="text-[12px] font-bold">{renderStatus(data.type)}</span>
      </div>

      <div className="w-full h-px bg-bg-fy"></div>

      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3 px-3.5 py-2.5">
          <div className="flex flex-col w-1/2 justify-start">
            <span className="text-[15px] font-medium text-[#6B7280]">
              Miqdori
            </span>
            <span className="text-[16px] font-bold text-green-600">
              {data.amount.toLocaleString()}
            </span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[15px] font-medium text-[#6B7280] whitespace-nowrap">
              Balans (Keyin)
            </span>
            <span
              className={`text-[16px] font-bold ${
                data.balance_after > 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              {data.balance_after > 0
                ? `-${data.balance_after.toLocaleString()}`
                : data.balance_after.toLocaleString()}
            </span>
          </div>

          <div className="flex flex-col col-span-2">
            <span className="text-[15px] font-medium text-[#6B7280]">Izoh</span>
            <span className="text-[16px] font-bold text-[#4B5563]">
              {data.description || "Izoh yo'q"}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center bg-bg-ty px-3.5">
          <div className="py-2 flex flex-col">
            <span className="text-[#6D7482] font-bold text-[15px]">
              {data.created_by}
            </span>
            <span className="text-[#6D7482] font-bold text-[15px]">
              {new Date(data.created_at).toLocaleString("uz-UZ")}
            </span>
          </div>
          <div>
            <Edit className="text-green-600 cursor-pointer hover:opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TsexTransactionCard;

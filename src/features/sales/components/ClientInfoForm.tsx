import { Select } from "antd";
import { Plus } from "lucide-react";
import { memo } from "react";

const ClientInfoForm = () => {
  return (
    <div className="border border-bg-fy rounded-[5px] overflow-hidden">
      <div className="flex flex-col justify-end gap-2 bg-[#ffffff] p-4">
        <span className="text-[18px] text-[#232E2F]">Mijoz ma'lumotlari</span>
        <div className="flex items-end w-full gap-5">
          <div className="w-full flex flex-col gap-1">
            <span className="text-[16px] text-[#232E2F]">Mijoz</span>
            <Select
              placeholder="Mijozni qidiring yoki tanlang"
              className="h-10! w-full"
            />
          </div>
          <div className="p-2.5 rounded-full bg-green-500 cursor-pointer hover:opacity-80">
            <Plus className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ClientInfoForm);

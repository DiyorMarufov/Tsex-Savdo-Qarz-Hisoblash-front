import { memo } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import SmallTitle from "../../../shared/ui/Title/SmallTitle/SmallTitle";
import { Button as AntdButton, DatePicker } from "antd";
import { ArrowDown, ArrowUp, Plus } from "lucide-react";
import Button from "../../../shared/ui/Button/Button";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import ProTable from "@ant-design/pro-table";
import { customerColumns, fakeCustomerData } from "./model/customers-model";

const CustomersPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 max-[1300px]:flex-wrap">
        <div>
          <LargeTitle title="Mijozlar" />
          <SmallTitle title="Qarzdorlik va hisob-kitoblarining joriy balansini kuzatish" />
        </div>

        <div className="grid grid-cols-3 gap-3 max-[1300px]:w-full max-[830px]:grid-cols-2 max-[365px]:grid-cols-1">
          <AntdButton className="py-5! rounded-[10px]! bg-[#E5E7EB]! max-[1300px]:w-full">
            {" "}
            <ArrowDown/>
            Qarz berish
          </AntdButton>
          <AntdButton className="py-5! rounded-[10px]! bg-[#E5E7EB]! max-[1300px]:w-full">
            {" "}
            <ArrowUp />
            Qarz olish
          </AntdButton>
          <Button className="rounded-[10px]! max-[1300px]:w-full max-[830px]:col-span-2! max-[365px]:col-span-1!">
            <Plus />
            Yangi mijoz
          </Button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-5 max-[1250px]:grid-cols-2 max-[500px]:grid-cols-1">
        <div className="border border-bg-fy bg-[#ffffff] rounded-2xl p-7 flex flex-col gap-1 max-[500px]:items-center">
          <span className="text-[22px] font-medium text-bg-py max-[900px]:text-[20px] max-[500px]:text-[17px]">
            Jami qarzdorlik
          </span>
          <span className="font-bold text-[30px] text-green-600 max-[900px]:text-[25px] max-[500px]:text-[22px]">
            15,200,000 usz
          </span>
        </div>
        <div className="border border-bg-fy bg-[#ffffff] rounded-2xl p-7 flex flex-col gap-1 max-[500px]:items-center">
          <span className="text-[22px] font-medium text-bg-py max-[900px]:text-[20px] max-[500px]:text-[17px]">
            Jami haqdorlik
          </span>
          <span className="font-bold text-[30px] text-red-600 max-[900px]:text-[25px] max-[500px]:text-[22px]">
            15,200,000 usz
          </span>
        </div>
        <div
          className="border border-[#e5e5e5] bg-white rounded-2xl p-7 flex flex-col gap-1
                max-[1250px]:col-span-2 max-[1250px]:items-center
                max-[500px]:col-span-1"
        >
          <span className="text-[22px] font-medium text-bg-py max-[900px]:text-[20px] max-[500px]:text-[17px]">
            Umumiy balans
          </span>
          <span className="font-bold text-[30px] text-green-600 max-[900px]:text-[25px] max-[500px]:text-[22px]">
            +15,200,000 usz
          </span>
        </div>
      </div>

      <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] mt-6 p-[17px] flex items-center gap-5 max-[960px]:flex-wrap">
        <SearchInput
          placeholder="Tsex nomi yoki operatsiya bo'yicha qidirish"
          className="h-12! bg-bg-ty! text-[17px]!"
        />
        <div className="max-[960px]:w-full">
          <DatePicker className="h-12! bg-bg-ty! text-[17px]! w-[300px] max-[960px]:w-full!" />
        </div>
      </div>

      <div className="mt-4">
        <ProTable
          dataSource={fakeCustomerData}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            responsive: false,
          }}
          columns={customerColumns}
          search={false}
          dateFormatter="string"
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default memo(CustomersPage);

import { memo } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import SmallTitle from "../../../shared/ui/Title/SmallTitle/SmallTitle";
import Button from "../../../shared/ui/Button/Button";
import { Plus } from "lucide-react";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import { DatePicker } from "antd/lib";
import ProTable from "@ant-design/pro-table";
import { fakeTsexData, tsexColumns } from "./model/tsexes-model";

const TsexesPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 max-[500px]:flex-wrap">
        <div>
          <LargeTitle title="Tsexlar" />
          <SmallTitle title="Barcha tsexlarning moliyaviy balanslarini kuzatish va boshqarish" />
        </div>
        <div className="max-[500px]:w-full">
          <Button className="flex gap-2 max-[500px]:w-full">
            <Plus /> Yangi operatsiya
          </Button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-5 max-[1250px]:grid-cols-2 max-[500px]:grid-cols-1">
        <div className="border border-bg-fy bg-[#ffffff] rounded-2xl p-7 flex flex-col gap-1 max-[500px]:items-center">
          <span className="text-[22px] font-medium text-bg-py max-[900px]:text-[20px] max-[500px]:text-[17px]">
            Jami haqdorlik
          </span>
          <span className="font-bold text-[30px] text-green-600 max-[900px]:text-[25px] max-[500px]:text-[22px]">
            15,200,000 usz
          </span>
        </div>
        <div className="border border-bg-fy bg-[#ffffff] rounded-2xl p-7 flex flex-col gap-1 max-[500px]:items-center">
          <span className="text-[22px] font-medium text-bg-py max-[900px]:text-[20px] max-[500px]:text-[17px]">
            Jami qarzdorlik
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
          className="h-12! min-[1000px]:w-[50%]! bg-bg-ty! text-[17px]!"
        />
        <div className="w-full">
          <DatePicker className="h-12! bg-bg-ty! text-[17px]! w-[300px] max-[960px]:w-full!" />
        </div>
      </div>

      <div className="mt-4">
        <ProTable
          dataSource={fakeTsexData}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            responsive: false,
          }}
          columns={tsexColumns}
          search={false}
          dateFormatter="string"
          headerTitle="Tsexlar"
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default memo(TsexesPage);

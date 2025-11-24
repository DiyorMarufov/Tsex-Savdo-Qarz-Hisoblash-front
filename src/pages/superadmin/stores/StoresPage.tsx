import { memo } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import SmallTitle from "../../../shared/ui/Title/SmallTitle/SmallTitle";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import ProTable from "@ant-design/pro-table";
import { fakeStores, storesColumns } from "./model/stores-table-model";

const StoresPage = () => {
  return (
    <div>
      <div>
        <LargeTitle title="Do'konlar" />
        <SmallTitle title="Do'konlarni ko'ring, tahrirlang, yoki o'chiring" />
      </div>

      <div className="mt-4 rounded-[12px] border border-e-bg-fy bg-[#ffffff] p-[17px]">
        <SearchInput
          placeholder="Do'kon nomi yoki manzili bo'yicha qidirish"
          className="h-12! bg-bg-ty! text-[17px]!"
        />
      </div>

      <div className="mt-4">
        <ProTable
          dataSource={fakeStores}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            responsive: false,
          }}
          columns={storesColumns}
          search={false}
          dateFormatter="string"
          headerTitle="Do'konlar"
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default memo(StoresPage);

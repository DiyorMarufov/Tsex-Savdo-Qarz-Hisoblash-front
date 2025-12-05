import { memo } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import ProTable from "@ant-design/pro-table";
import {
  fakeStores,
  storesColumns,
  type StoresTableListItem,
} from "./model/stores-table-model";
import { Edit, Trash } from "lucide-react";
import { Pagination } from "antd";

const StoresPage = () => {
  return (
    <div>
      <div>
        <LargeTitle title="Do'konlar" />
      </div>

      <div className="mt-3 rounded-[12px] border border-e-bg-fy bg-[#ffffff] p-[17px]">
        <SearchInput
          placeholder="Do'kon nomi yoki manzili bo'yicha qidirish"
          className="h-12! bg-bg-ty! text-[17px]!"
        />
      </div>

      <div className="max-[500px]:hidden mt-4">
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

      <div className="min-[500px]:hidden flex flex-col gap-5 mt-4">
        {fakeStores.map((st: StoresTableListItem) => (
          <div
            key={st.id}
            className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px]"
          >
            <div className="p-5 flex justify-between">
              <div className="flex flex-col gap-2">
                <a className="text-[17px] font-bold">{st.name}</a>
                <span className="font-bold text-[17px] text-[#4B5563]">
                  {st.address}
                </span>
              </div>
              <div className="flex items-center gap-5">
                <Edit className="text-green-600 cursor-pointer hover:opacity-80" />
                <Trash className="text-red-600 cursor-pointer hover:opacity-80" />
              </div>
            </div>

            <div className="w-full h-px bg-bg-fy"></div>

            <div className="p-5">
              <span className="text-[16px] font-medium text-[#6B7280]">
                Kiritilgan sana:{" "}
                <span className="text-[17px] font-bold text-[#4B5563]">
                  {st.created_at.toLocaleString("uz-UZ")}
                </span>
              </span>
            </div>
          </div>
        ))}
        <div className="flex justify-center">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default memo(StoresPage);

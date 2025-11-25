import { memo } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import Filter from "../../../shared/ui/Filter/Filter";
import { ProTable } from "@ant-design/pro-components";
import { columns, fakeProducts } from "./model/product-table-model";
import SmallTitle from "../../../shared/ui/Title/SmallTitle/SmallTitle";

const ProductsPage = () => {
  return (
    <div>
      <LargeTitle title="Mahsulotlar" />
      <SmallTitle title="Mahsulotlarni kuzatish"/>

      <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] mt-6 p-[17px] flex items-center gap-4 max-[900px]:flex-wrap">
        <SearchInput
          placeholder="Mahsulot nomi,brandi bo'yicha qidirish"
          className="h-12! min-[900px]:w-[50%]! bg-bg-ty! text-[17px]!"
        />
        <div className="flex gap-4 min-[900px]:w-[50%] max-[900px]:w-full max-[400px]:flex-wrap">
          <Filter
            placeholder="Barcha do'konlar"
            className="h-12! min-[900px]:w-[50%]! max-[900px]:w-full! custom-select"
          />
          <Filter
            placeholder="Barcha tsexlar"
            className="h-12! min-[900px]:w-[50%]! max-[900px]:w-full! custom-select"
          />
        </div>
      </div>

      <div className="mt-4">
        <ProTable
          dataSource={fakeProducts}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            responsive: false,
          }}
          columns={columns}
          search={false}
          dateFormatter="string"
          headerTitle="Mahsulotlar"
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default memo(ProductsPage);

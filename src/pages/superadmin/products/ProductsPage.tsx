import { memo } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import Filter from "../../../shared/ui/Filter/Filter";
import { ProTable } from "@ant-design/pro-components";
import {
  columns,
  fakeProducts,
  type ProductTableListItem,
} from "./model/product-table-model";
import SmallTitle from "../../../shared/ui/Title/SmallTitle/SmallTitle";
import { Edit, Trash } from "lucide-react";
import { Pagination } from "antd";

const ProductsPage = () => {
  return (
    <div>
      <LargeTitle title="Mahsulotlar" />
      <SmallTitle title="Mahsulotlarni kuzatish" />

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

      <div className="max-[500px]:hidden mt-4">
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

      <div className="min-[500px]:hidden flex flex-col gap-5 mt-4">
        {fakeProducts.map((pr: ProductTableListItem) => (
          <div
            key={pr.id}
            className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px]"
          >
            <div className="flex justify-between p-5">
              <a className="text-[17px] font-bold">{pr.name}</a>
              <span className="text-[15px] font-bold text-[#6B7280]">
                {pr.brand}
              </span>
            </div>

            <div className="w-full h-px bg-bg-fy"></div>

            <div className="p-5 flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col justify-start w-1/2">
                  <span className="text-[16px] font-medium text-[#6B7280]">
                    Narxi
                  </span>
                  <span className="text-[17px] font-bold text-green-600">
                    {pr.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-col justify-start w-1/2">
                  <span className="text-[16px] font-medium text-[#6B7280]">
                    Miqdori
                  </span>
                  <span className="text-[17px] font-bold text-[#4B5563]">
                    {pr.quantity}
                  </span>
                </div>
                <div className="flex flex-col justify-start w-1/2">
                  <span className="text-[16px] font-medium text-[#6B7280] whitespace-nowrap">
                    Pochkadagi soni
                  </span>
                  <span className="text-[17px] font-bold text-[#4B5563]">
                    {pr.unit_in_package}
                  </span>
                </div>
                <div className="flex flex-col justify-start w-1/2">
                  <span className="text-[16px] font-medium text-[#6B7280]">
                    O'lchami
                  </span>
                  <span className="text-[17px] font-bold text-[#4B5563]">
                    {pr.size}
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                <div>
                  <span className="font-medium text-[#6B7280] text-[16px]">
                    Do'kon / Tsex
                  </span>
                </div>
                <div>
                  <span className="text-[17px] font-bold text-[#4B5563]">
                    {pr.shop.name} / <span>{pr.tsex.name}</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                <div>
                  <span className="font-medium text-[#6B7280] text-[16px]">
                    Kim kiritgan / Sana
                  </span>
                </div>
                <div>
                  <span className="text-[17px] font-bold text-[#4B5563]">
                    {pr.created_by.full_name} /{" "}
                    <span>{pr.created_at.toLocaleString("uz-UZ")}</span>
                  </span>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="flex items-center gap-5">
                  <Edit className="text-green-600 cursor-pointer hover:opacity-80" />
                  <Trash className="text-red-600 cursor-pointer hover:opacity-80" />
                </div>
              </div>
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

export default memo(ProductsPage);

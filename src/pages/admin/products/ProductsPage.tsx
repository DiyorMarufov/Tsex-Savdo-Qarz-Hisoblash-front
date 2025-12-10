import { memo, useEffect } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import Filter from "../../../shared/ui/Filter/Filter";
import { ProTable } from "@ant-design/pro-components";

import { Edit, Plus, Trash } from "lucide-react";
import { Pagination } from "antd";
import {
  columns,
  fakeProducts,
  type ProductTableListItem,
} from "../../superadmin/products/model/product-table-model";
import Button from "../../../shared/ui/Button/Button";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const AdminProductsPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  if (pathname.startsWith("/admin/products/")) return <Outlet />;
  return (
    <div>
      <div className="flex justify-between gap-3">
        <LargeTitle title="Mahsulotlar" />
        <div className="max-[500px]:hidden">
          <Button onClick={() => navigate("add")}>
            <Plus />
            Yengi mahsulot qo'shish
          </Button>
        </div>

        <div
          className="min-[500px]:hidden p-2.5 rounded-full bg-green-500 cursor-pointer hover:opacity-80"
          onClick={() => navigate("add")}
        >
          <Plus className="text-white" />
        </div>
      </div>

      <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] mt-2 p-3.5 flex items-center gap-4 max-[900px]:flex-wrap">
        <SearchInput
          placeholder="Mahsulot nomi,brandi bo'yicha qidirish"
          className="h-12! min-[900px]:w-[50%]! bg-bg-ty! text-[16px]!"
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
            <div className="flex justify-between px-3.5 py-2.5">
              <a className="text-[16px] font-bold">{pr.name}</a>
              <span className="text-[14px] font-bold text-[#6B7280]">
                {pr.brand}
              </span>
            </div>

            <div className="w-full h-px bg-bg-fy"></div>

            <div className="px-3.5 py-2.5 flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col justify-start w-1/2">
                  <span className="text-[15px] font-medium text-[#6B7280]">
                    Narxi
                  </span>
                  <span className="text-[16px] font-bold text-green-600">
                    {pr.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-col justify-start w-1/2">
                  <span className="text-[15px] font-medium text-[#6B7280]">
                    Miqdori
                  </span>
                  <span className="text-[16px] font-bold text-[#4B5563]">
                    {pr.quantity}
                  </span>
                </div>
                <div className="flex flex-col justify-start w-1/2">
                  <span className="text-[15px] font-medium text-[#6B7280] whitespace-nowrap">
                    Pochkadagi soni
                  </span>
                  <span className="text-[16px] font-bold text-[#4B5563]">
                    {pr.unit_in_package}
                  </span>
                </div>
                <div className="flex flex-col justify-start w-1/2">
                  <span className="text-[15px] font-medium text-[#6B7280]">
                    O'lchami
                  </span>
                  <span className="text-[16px] font-bold text-[#4B5563]">
                    {pr.size}
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                <div>
                  <span className="font-medium text-[#6B7280] text-[15px]">
                    Do'kon / Tsex
                  </span>
                </div>
                <div className="w-full">
                  <span className="text-[16px] font-bold text-[#4B5563]">
                    {pr.shop.name} / <span>{pr.tsex.name}</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                <div>
                  <span className="font-medium text-[#6B7280] text-[15px]">
                    Kim kiritgan / Sana
                  </span>
                </div>
                <div>
                  <span className="text-[16px] font-bold text-[#4B5563]">
                    {pr.created_by.full_name} /{" "}
                    <span>{pr.created_at.toLocaleString("uz-UZ")}</span>
                  </span>
                </div>
              </div>

              <div className="flex justify-end pb-px">
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

export default memo(AdminProductsPage);

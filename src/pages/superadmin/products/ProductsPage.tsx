import { memo, useEffect } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import Filter from "../../../shared/ui/Filter/Filter";
import { ProTable } from "@ant-design/pro-components";
import {
  productColumns,
  type ProductTableListItem,
} from "./model/product-table-model";
import { Image, Pagination, Button as AntdButton } from "antd";
import { useProduct } from "../../../shared/lib/apis/products/useProduct";
import { Edit } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { getAllProducts } = useProduct();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  // Products start
  const { data: allProducts } = getAllProducts();
  const products = allProducts?.data;
  // Products end

  // Product detail starts
  const handleProductDetailOpen = (id: string) => {
    navigate(`${id}`);
  };
  // Product detail ends

  if (pathname.startsWith(`/superadmin/products/`)) return <Outlet />;
  return (
    <div>
      <LargeTitle title="Mahsulotlar" />

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
          dataSource={products}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            responsive: false,
          }}
          columns={productColumns(handleProductDetailOpen)}
          search={false}
          dateFormatter="string"
          headerTitle="Mahsulotlar"
          scroll={{ x: "max-content" }}
        />
      </div>

      <div className="min-[500px]:hidden grid grid-cols-2 gap-5 mt-4 max-[330px]:grid-cols-1">
        {products?.map((pr: ProductTableListItem) => (
          <div
            key={pr.id}
            className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px]"
          >
            <div className="p-2.5 flex justify-center items-center">
              {/* @ts-ignore */}
              <Image
                src={pr.images[0].image_url}
                className="w-full rounded-[5px] object-contain h-[130px]!"
              />
            </div>
            <div className="flex flex-col gap-1 justify-between px-3.5 py-2.5">
              <div className="flex flex-col">
                <a className="text-[16px] font-bold">{pr.name}</a>
                <span className="text-[14px] font-bold text-[#6B7280]">
                  {pr.brand}
                </span>
              </div>
              <span className="text-[17px] text-green-500 font-bold">
                {pr.price.toLocaleString()}
              </span>
            </div>

            <div className="w-full h-px bg-bg-fy"></div>

            <div className="flex justify-between mt-1 px-3.5 pt-2 pb-3">
              <div className="flex items-center gap-5">
                <Edit className="text-green-600 cursor-pointer hover:opacity-80" />
              </div>
              <div>
                <AntdButton
                  className="bg-[#1D4ED8]! text-white!"
                  onClick={() => handleProductDetailOpen(pr.id)}
                >
                  Batafsil
                </AntdButton>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-4 justify-center">
        <Pagination />
      </div>
    </div>
  );
};

export default memo(ProductsPage);

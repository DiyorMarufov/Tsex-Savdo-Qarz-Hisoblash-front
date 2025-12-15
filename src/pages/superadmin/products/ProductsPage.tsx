import { memo, useCallback, useEffect, useMemo, useState } from "react";
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
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ProductCardSkeleton from "../../../shared/ui/Skeletons/Products/ProductCardSkeleton";
import { debounce } from "../../../shared/lib/functions/debounce";
import type { ProductQueryParams } from "../../../shared/lib/types";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import { useTsex } from "../../../shared/lib/apis/tsexes/useTsex";
import { useShop } from "../../../shared/lib/apis/shops/useShop";

const ProductsPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { getAllProducts } = useProduct();
  const { getAllShopsForProductsFilter } = useShop();
  const { getAllTsexesForProductsFilter } = useTsex();

  const { getParam, setParams, removeParam } = useParamsHook();

  const [localSearch, setLocalSearch] = useState(getParam("search") || "");

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  // Query starts
  const query: ProductQueryParams = useMemo(() => {
    const page = Number(getParam("page")) || 1;
    const limit = Number(getParam("limit")) || 10;
    const search = getParam("search") || undefined;
    const shopId = getParam("shopId") || undefined;
    const tsexId = getParam("tsexId") || undefined;

    return { page, limit, search, shopId, tsexId };
  }, [getParam]);
  // Query ends

  // Products start
  const { data: allProducts, isLoading: productLoading } =
    getAllProducts(query);
  const products = allProducts?.data?.data;
  const total = allProducts?.data?.total || 0;
  // Products end

  // Product detail starts
  const handleProductDetailOpen = (id: string) => {
    navigate(`${id}`);
  };
  // Product detail ends

  // PageChange starts
  const handlePageChange = (newPage: number, newPageSize?: number) => {
    const updateParams: { page?: number; limit?: number } = {};

    if (newPage > 1) {
      updateParams.page = newPage;
    }

    if (newPageSize && newPageSize !== 10) {
      updateParams.limit = newPageSize;
    }

    setParams(updateParams);

    if (newPage === 1) {
      removeParam("page");
    }
    if (newPageSize === 10 && getParam("limit")) {
      removeParam("limit");
    }
  };
  // PageChange ends

  // Search starts
  const debouncedSetSearchQuery = useCallback(
    debounce((nextValue: string) => {
      setParams({
        search: nextValue || "",
        page: 1,
      });
    }, 500),
    [setParams]
  );

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    debouncedSetSearchQuery(value);
  };
  // Search ends

  // Filter starts
  const handleFilterChange = (key: "shopId" | "tsexId", value: string) => {
    setParams({
      [key]: value || "",
      page: 1,
    });
  };

  const shops = getAllShopsForProductsFilter().data;
  const shopsOptions = [
    {
      value: "",
      label: "Barcha do'konlar",
    },
    ...(shops?.data?.map((st) => ({
      value: st?.id,
      label: st?.name,
    })) || []),
  ];

  const tsexes = getAllTsexesForProductsFilter().data;
  const tsexesOptions = [
    {
      value: "",
      label: "Barcha tsexlar",
    },
    ...(tsexes?.data?.map((ts) => ({
      value: ts?.id,
      label: ts?.name,
    })) || []),
  ];
  // Filter ends

  if (pathname.startsWith(`/superadmin/products/`)) return <Outlet />;
  return (
    <div>
      <LargeTitle title="Mahsulotlar" />

      <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] mt-2 p-3.5 flex items-center gap-4 max-[900px]:flex-wrap">
        <SearchInput
          placeholder="Mahsulot nomi,brandi bo'yicha qidirish"
          className="h-12! min-[900px]:w-[50%]! bg-bg-ty! text-[16px]!"
          value={localSearch}
          onChange={handleSearchChange}
        />
        <div className="flex gap-4 min-[900px]:w-[50%] max-[900px]:w-full max-[400px]:flex-wrap">
          <Filter
            placeholder="Barcha do'konlar"
            className="h-12! min-[900px]:w-[50%]! max-[900px]:w-full! custom-select"
            options={shopsOptions}
            value={query.shopId}
            onChange={(val) => handleFilterChange("shopId", val)}
          />
          <Filter
            placeholder="Barcha tsexlar"
            className="h-12! min-[900px]:w-[50%]! max-[900px]:w-full! custom-select"
            options={tsexesOptions}
            value={query.tsexId}
            onChange={(val) => handleFilterChange("tsexId", val)}
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
            current: query.page,
            pageSize: query.limit,
            total,
            onChange: handlePageChange,
          }}
          columns={productColumns(handleProductDetailOpen)}
          search={false}
          dateFormatter="string"
          headerTitle="Mahsulotlar"
          scroll={{ x: "max-content" }}
          loading={productLoading}
        />
      </div>

      <div className="min-[500px]:hidden mt-4">
        {productLoading && <ProductCardSkeleton />}
        <div className="grid grid-cols-2 gap-5 max-[330px]:grid-cols-1">
          {products && products?.length > 0 ? (
            products?.map((pr: ProductTableListItem) => (
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

                <div className="mt-1 px-3.5 pt-2 pb-3">
                  <div className="flex justify-end">
                    <AntdButton
                      className="bg-[#1D4ED8]! text-white!"
                      onClick={() => handleProductDetailOpen(pr.id)}
                    >
                      Batafsil
                    </AntdButton>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-[20vh] text-red-500 text-[19px] col-span-2">
              Hozircha ma'lumot yo'q
            </div>
          )}
        </div>
        <div className="flex mt-4 justify-center">
          <Pagination
            current={query.page}
            pageSize={query.limit}
            onChange={handlePageChange}
            total={total}
            showSizeChanger
          />
        </div>
      </div>
    </div>
  );
};

export default memo(ProductsPage);

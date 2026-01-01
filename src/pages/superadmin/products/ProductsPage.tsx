import { memo, useCallback, useEffect, useMemo, useState } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import { ProTable } from "@ant-design/pro-components";
import { productColumns } from "./model/product-table-model";
import { useProduct } from "../../../shared/lib/apis/products/useProduct";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { debounce } from "../../../shared/lib/functions/debounce";
import type { QueryParams } from "../../../shared/lib/types";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import { useTsex } from "../../../shared/lib/apis/tsexes/useTsex";
import { useShop } from "../../../shared/lib/apis/shops/useShop";
import ProductFilters from "../../../widgets/products/ProductFIlters/ProductFilters";
import ProductMobileList from "../../../widgets/products/ProductMobileList/ProductMobileList";

const ProductsPage = () => {
  const [isTsexOpen, setIsTsexOpen] = useState<boolean>(false);
  const [isShopOpen, setIsShopOpen] = useState<boolean>(false);
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
  const query: QueryParams = useMemo(() => {
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
    [setParams],
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

  const { data: shops, isLoading: shopLoading } =
    getAllShopsForProductsFilter(isShopOpen);
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

  const { data: tsexes, isLoading: tsexLoading } =
    getAllTsexesForProductsFilter(isTsexOpen);
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

      <ProductFilters
        localSearch={localSearch}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        shopsOptions={shopsOptions}
        tsexesOptions={tsexesOptions}
        shopId={query.shopId}
        tsexId={query.tsexId}
        setIsTsexOpen={setIsTsexOpen}
        setIsShopOpen={setIsShopOpen}
        tsexLoading={tsexLoading}
        shopLoading={shopLoading}
      />

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
          scroll={{ x: "max-content" }}
          loading={productLoading}
        />
      </div>

      <ProductMobileList
        products={products}
        currentPage={Number(query.page)}
        pageSize={Number(query.limit)}
        total={total}
        onPageChange={handlePageChange}
        isLoading={productLoading}
        onDetail={handleProductDetailOpen}
      />
    </div>
  );
};

export default memo(ProductsPage);

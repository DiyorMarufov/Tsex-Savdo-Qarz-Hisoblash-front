import { memo, useCallback, useEffect, useMemo, useState } from "react";
import ProductsReportFilters from "../../../widgets/reports/ProductsReport/ProductsReportFilters/ProductsReportFilters";
import ProductReportChart from "../../../widgets/reports/ProductsReport/ProductReportChart/ProductReportChart";
import ProductReportBalances from "../../../widgets/reports/ProductsReport/ProductReportBalances/ProductReportBalances";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import type { QueryParams } from "../../../shared/lib/types";
import dayjs from "dayjs";
import { useShop } from "../../../shared/lib/apis/shops/useShop";
import { useTsex } from "../../../shared/lib/apis/tsexes/useTsex";
import { useProduct } from "../../../shared/lib/apis/products/useProduct";
import ProTable from "@ant-design/pro-table";
import ProductMobileList from "../../../widgets/products/ProductMobileList/ProductMobileList";
import { useNavigate } from "react-router-dom";
import { debounce } from "../../../shared/lib/functions/debounce";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import { productColumns } from "../../../shared/lib/model/products/product-table-model";

const AdminProductsReportPage = () => {
  const [isProductOpen, setIsProductOpen] = useState<boolean>(false);
  const [isTsexOpen, setIsTsexOpen] = useState<boolean>(false);
  const [isShopOpen, setIsShopOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { getAllShopsForProductsFilter } = useShop();
  const { getAllTsexesForProductsFilter } = useTsex();
  const {
    getAllProducts,
    getProductsSummaryForReport,
    getInfiniteProducts,
    getAllTop5ProductsForReport,
  } = useProduct();
  const { getParam, setParams, removeParam } = useParamsHook();
  const [localSearch, setLocalSearch] = useState(getParam("search") || "");
  const [, setProductFilterSearch] = useState(getParam("product_search") || "");

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  // Query starts
  const query: QueryParams = useMemo(() => {
    const page = Number(getParam("page")) || 1;
    const limit = Number(getParam("limit")) || 10;
    const search = getParam("search") || undefined;
    const s = getParam("startDate");
    const e = getParam("endDate");
    const shopId = getParam("shopId") || "";
    const tsexId = getParam("tsexId") || "";
    const productId = getParam("productId") || "";
    const productFilterSearch = getParam("product_search") || undefined;

    const isFirstLoad = s === null && e === null;

    return {
      page,
      limit,
      search,
      start: isFirstLoad ? dayjs().startOf("day") : s ? dayjs(s) : null,
      end: isFirstLoad ? dayjs().endOf("day") : e ? dayjs(e) : null,
      startStr: isFirstLoad
        ? dayjs().startOf("day").format("YYYY-MM-DD HH:mm:ss")
        : s || "",
      endStr: isFirstLoad
        ? dayjs().endOf("day").format("YYYY-MM-DD HH:mm:ss")
        : e || "",
      shopId,
      tsexId,
      productId,
      productFilterSearch,
    };
  }, [getParam]);
  // Query ends

  // ProductsSummaryReport starts
  const { data: allProductsSummary, isLoading: productsSummaryLoading } =
    getProductsSummaryForReport({
      startDate: query.startStr,
      endDate: query.endStr,
      productId: query.productId,
      tsexId: query.tsexId,
      shopId: query.shopId,
    });
  const productsSummary = allProductsSummary?.data?.data;
  const totalQuantity = productsSummary?.totalQuantity;
  const totalTypes = productsSummary?.totalTypes;
  const totalSold = productsSummary?.totalSold;
  const totalSoldTypes = productsSummary?.totalSoldTypes;
  const inventoryBalance = productsSummary?.inventoryBalance;
  // ProductsSummaryReport ends

  // ProductReportFilter onFilterSubmit starts
  const onFilterSubmit = (filters: {
    dates: string[] | null;
    shopId: string;
    tsexId: string;
    productId: string;
  }) => {
    setParams({
      startDate: filters.dates?.[0] || "",
      endDate: filters.dates?.[1] || "",
      shopId: filters.shopId || "",
      tsexId: filters.tsexId || "",
      productId: filters.productId || "",
    });
  };
  // ProductReportFilter onFilterSubmit ends

  // ProductReportChart starts
  const { data: allTopProducts, isLoading: topProductChartLoading } =
    getAllTop5ProductsForReport({
      startDate: query.startStr,
      endDate: query.endStr,
      productId: query.productId,
      shopId: query.shopId,
      tsexId: query.tsexId,
    });
  const topProducts = allTopProducts?.data;
  // ProductReportChart ends

  // ProductsReport start
  const { data: allProducts, isLoading: productLoading } = getAllProducts({
    page: query.page,
    limit: query.limit,
    startDate: query.startStr,
    endDate: query.endStr,
    search: query.search,
    productId: query.productId,
    shopId: query.shopId,
    tsexId: query.tsexId,
  });
  const products = allProducts?.data?.data;
  const total = allProducts?.data?.total || 0;
  // ProductsReport end

  // ProductReportFilter options start
  const {
    data: productLists,
    isLoading: productListLoading,
    fetchNextPage: productFetchNextPage,
    hasNextPage: productHasNextPage,
    isFetchingNextPage: productIsFetchingNextPage,
  } = getInfiniteProducts(isProductOpen, { search: query.productFilterSearch });

  const productOptions = [
    {
      value: "",
      label: "Barcha mahsulotlar",
    },
    ...(
      productLists?.pages?.flatMap((page: any) => {
        return Array.isArray(page)
          ? page
          : page?.data?.data || page?.data || [];
      }) || []
    ).map((pr: any) => ({
      value: pr?.id,
      label: (
        <div className="flex justify-between items-center w-full">
          <span className="text-[14px] font-medium text-slate-800">
            {pr?.name}
          </span>
          <span className="text-[12px] text-slate-400 font-normal ml-2">
            {pr?.brand}
          </span>
        </div>
      ),
    })),
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
  // ProductReportFilter options end

  // Product detail starts
  const handleProductDetailOpen = (id: string) => {
    navigate(`/admin/products/${id}`);
  };
  // Product detail ends

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

  const debouncedSetSearchProductFilterQuery = useCallback(
    debounce((nextValue: string) => {
      setParams({
        product_search: nextValue || "",
        page: 1,
      });
    }, 500),
    [setParams]
  );

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    debouncedSetSearchQuery(value);
  };

  const handleSearchProductFilterChange = (value: string) => {
    setProductFilterSearch(value);
    debouncedSetSearchProductFilterQuery(value);
  };
  // Search ends

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

  return (
    <div className="flex flex-col gap-5">
      <ProductsReportFilters
        onFilterSubmit={onFilterSubmit}
        start={query.start}
        end={query.end}
        shopId={query.shopId}
        tsexId={query.tsexId}
        productId={query.productId}
        shopsOptions={shopsOptions}
        tsexesOptions={tsexesOptions}
        productOptions={productOptions}
        setIsProductOpen={setIsProductOpen}
        setIsTsexOpen={setIsTsexOpen}
        setIsShopOpen={setIsShopOpen}
        productLoading={productListLoading}
        productHasNextPage={productHasNextPage}
        productIsFetchingNextPage={productIsFetchingNextPage}
        productFetchNextPage={productFetchNextPage}
        onSearchChange={handleSearchProductFilterChange}
        tsexLoading={tsexLoading}
        shopLoading={shopLoading}
      />

      <ProductReportBalances
        totalQuantity={totalQuantity}
        totalTypes={totalTypes}
        totalSold={totalSold}
        totalSoldTypes={totalSoldTypes}
        inventoryBalance={inventoryBalance}
        isLoading={productsSummaryLoading}
      />

      <ProductReportChart
        data={topProducts as { name: string; sales: number }[]}
        loading={topProductChartLoading}
      />

      <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] p-3.5">
        <SearchInput
          placeholder="Mahsulot nomi,brandi bo'yicha qidirish"
          className="h-10! bg-bg-ty! text-[16px]!"
          value={localSearch}
          onChange={handleSearchChange}
        />
      </div>

      <div className="max-[500px]:hidden">
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
        isReport
      />
    </div>
  );
};

export default memo(AdminProductsReportPage);

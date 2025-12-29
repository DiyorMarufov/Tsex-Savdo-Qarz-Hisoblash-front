import { memo, useMemo } from "react";
import ProductsReportFilters from "../../../widgets/reports/ProductsReport/ProductsReportFilters/ProductsReportFilters";
import ProductReportChart from "../../../widgets/reports/ProductsReport/ProductReportChart/ProductReportChart";
import ProductReportBalances from "../../../widgets/reports/ProductsReport/ProductReportBalances/ProductReportBalances";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import type { QueryParams } from "../../../shared/lib/types";
import dayjs from "dayjs";
import { useShop } from "../../../shared/lib/apis/shops/useShop";
import { useTsex } from "../../../shared/lib/apis/tsexes/useTsex";
import { useProduct } from "../../../shared/lib/apis/products/useProduct";

const ProductsReportPage = () => {
  const { getAllShopsForProductsFilter } = useShop();
  const { getAllTsexesForProductsFilter } = useTsex();
  const {
    getProductsSummaryForReport,
    getAllProductsForProductsFilter,
    getAllTop5ProductsForReport,
  } = useProduct();
  const { getParam, setParams } = useParamsHook();

  // Query starts
  const query: QueryParams = useMemo(() => {
    const s = getParam("startDate");
    const e = getParam("endDate");
    const shopId = getParam("shopId") || "";
    const tsexId = getParam("tsexId") || "";
    const productId = getParam("productId") || "";

    const isFirstLoad = s === null && e === null;

    return {
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

  // ProductReportFilter options start
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

  const products = getAllProductsForProductsFilter().data;
  const productOptions = [
    {
      value: "",
      label: "Barcha mahsulotlar",
    },
    ...(products?.data?.data?.map((pr: any) => ({
      value: pr?.id,
      label: (
        <div className="flex justify-between">
          <span className="text-[14px] font-medium text-slate-800">
            {pr?.name}
          </span>

          <span className="text-[12px] text-slate-400 font-normal">
            {pr?.brand}
          </span>
        </div>
      ),
    })) || []),
  ];
  // ProductReportFilter options end

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
  const { data: allTopProducts } = getAllTop5ProductsForReport({
    startDate: query.startStr,
    endDate: query.endStr,
  });
  const topProducts = allTopProducts?.data;
  // ProductReportChart ends

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
      />
    </div>
  );
};

export default memo(ProductsReportPage);

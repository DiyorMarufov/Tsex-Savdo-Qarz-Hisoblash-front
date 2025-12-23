import { memo } from "react";
import ProductsReportFilters from "../../../widgets/reports/ProductsRepor/ProductsReportFilters/ProductsReportFilters";
import ProductReportChart from "../../../widgets/reports/ProductsRepor/ProductReportChart/ProductReportChart";
import ProductReportBalances from "../../../widgets/reports/ProductsRepor/ProductReportBalances/ProductReportBalances";

const ProductsReportPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <ProductsReportFilters />

      <ProductReportBalances />

      <ProductReportChart />
    </div>
  );
};

export default memo(ProductsReportPage);

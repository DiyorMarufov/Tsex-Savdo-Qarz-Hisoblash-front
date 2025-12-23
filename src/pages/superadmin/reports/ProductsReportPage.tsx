import { memo } from "react";
import ProductsReportFilters from "../../../widgets/reports/ProductsReport/ProductsReportFilters/ProductsReportFilters";
import ProductReportChart from "../../../widgets/reports/ProductsReport/ProductReportChart/ProductReportChart";
import ProductReportBalances from "../../../widgets/reports/ProductsReport/ProductReportBalances/ProductReportBalances";

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

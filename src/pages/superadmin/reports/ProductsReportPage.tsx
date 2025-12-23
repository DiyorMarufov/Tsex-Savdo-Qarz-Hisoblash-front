import { memo } from "react";
import ProductsReportFilters from "../../../widgets/reports/ProductsRepor/ProductsReportFilters/ProductsReportFilters";

const ProductsReportPage = () => {
  return (
    <div>
      <ProductsReportFilters />
    </div>
  );
};

export default memo(ProductsReportPage);

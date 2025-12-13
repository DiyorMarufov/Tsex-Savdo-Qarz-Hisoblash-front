import { memo } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import ProductsCreate from "../../../features/products/components/ProductsCreate";

const AdminProductsAddPage = () => {
  return (
    <div className="w-full">
      <LargeTitle title="Yengi mahsulot qo'shish" />
      <div className="flex justify-center items-center min-[700px]:h-[77vh] max-[700px]:mt-2">
        <ProductsCreate />
      </div>
    </div>
  );
};

export default memo(AdminProductsAddPage);

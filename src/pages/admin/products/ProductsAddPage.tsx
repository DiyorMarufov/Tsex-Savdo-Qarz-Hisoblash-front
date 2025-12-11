import { memo } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import ProductsCreate from "../../../features/products/components/ProductsCreate";

const AdminProductsAddPage = () => {
  return (
    <div className="w-full">
      <LargeTitle title="Yengi mahsulot qo'shish" />
      <div className="flex justify-center items-center min-[500px]:h-[77vh] max-[500px]:mt-1.5">
        <ProductsCreate />
      </div>
    </div>
  );
};

export default memo(AdminProductsAddPage);

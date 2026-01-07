import { memo, useEffect } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import ProductsCreate from "../../../features/products/components/ProductsCreate";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminProductsAddPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);
  return (
    <div className="w-full">
      <ArrowLeft
        className="hover:opacity-75 cursor-pointer mb-2"
        onClick={() => navigate(-1)}
      />
      <LargeTitle title="Yangi mahsulot qo'shish" />
      <div className="flex justify-center items-center min-[700px]:h-[77vh] max-[700px]:mt-2">
        <ProductsCreate />
      </div>
    </div>
  );
};

export default memo(AdminProductsAddPage);

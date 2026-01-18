import { memo, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import ProductsCreate from "../../../../features/products/components/ProductsCreate";
import MediumTitle from "../../../../shared/ui/Title/MediumTitle/MediumTitle";

const AdminProductsAddPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  return (
    <div className="w-full">
      <ArrowLeft
        className="hover:opacity-75 cursor-pointer mb-1"
        onClick={() => navigate(`/admin/models/product/${id}`)}
      />
      <MediumTitle title="Yangi mahsulot qo'shish" />
      <div className="flex justify-center items-center min-[700px]:h-[77vh] max-[700px]:mt-5">
        <ProductsCreate />
      </div>
    </div>
  );
};

export default memo(AdminProductsAddPage);

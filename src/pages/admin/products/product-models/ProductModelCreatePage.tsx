import { ArrowLeft } from "lucide-react";
import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductModelCreate from "../../../../features/products/components/ProductModelCreate";
import MediumTitle from "../../../../shared/ui/Title/MediumTitle/MediumTitle";

const AdminProductModelCreatePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);
  return (
    <div className="w-full">
      <ArrowLeft
        className="hover:opacity-75 cursor-pointer mb-1"
        onClick={() => navigate(-1)}
      />
      <MediumTitle title="Yangi model qo'shish" />
      <div className="flex justify-center items-center min-[700px]:h-[75vh] max-[700px]:mt-5">
        <ProductModelCreate />
      </div>
    </div>
  );
};

export default memo(AdminProductModelCreatePage);

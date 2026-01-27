import { ArrowLeft } from "lucide-react";
import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductModelCreate from "../../../../features/products/components/ProductModelCreate";
import MediumTitle from "../../../../shared/ui/Title/MediumTitle/MediumTitle";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../app/store";

const AdminProductModelCreatePage = () => {
  const navigate = useNavigate();
  const editingProductModelId = useSelector(
    (state: RootState) => state.setEditingProductModelId.editingProductModelId,
  );
  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);
  return (
    <div className="w-full">
      <ArrowLeft
        className="hover:opacity-75 cursor-pointer mb-1"
        onClick={() => navigate(-1)}
      />
      <MediumTitle
        title={
          editingProductModelId
            ? "Modelni o'zgartirish"
            : "Yangi model qo'shish"
        }
      />
      <div className="flex justify-center items-center min-[700px]:h-[75vh] max-[700px]:mt-5">
        <ProductModelCreate />
      </div>
    </div>
  );
};

export default memo(AdminProductModelCreatePage);

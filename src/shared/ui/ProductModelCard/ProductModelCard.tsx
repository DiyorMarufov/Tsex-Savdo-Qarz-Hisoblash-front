import { memo } from "react";
import { Edit, Factory, Store, Trash } from "lucide-react";
import type { ProductModelTableItem } from "../../../shared/lib/model/product-models/product-models-model";
import { Image, Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useProductModel } from "../../lib/apis/product-models/useProductModel";
import { useApiNotification } from "../../hooks/api-notification/useApiNotification";
import { productCategories } from "../../lib/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEditingProductModelId } from "../../../features/products/model/productModelModel";

interface ProductModelCardProps {
  item: ProductModelTableItem;
  onDetail: (id: string) => void;
}

const ProductModelCard = ({ item, onDetail }: ProductModelCardProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { deleteProductModelById } = useProductModel();
  const { handleApiError, handleSuccess } = useApiNotification();

  const handleUpdate = (id: string) => {
    dispatch(setEditingProductModelId(id));
    navigate("add");
  };

  const handleDelete = (id: string) => {
    deleteProductModelById.mutate(id, {
      onSuccess: () => {
        handleSuccess("Muvaffaqiyatli o'chirildi");
      },
      onError: (err: any) => {
        const status = err?.response?.data?.statusCode;
        const msg = err?.response?.data?.message;

        if (status === 404 && msg.startsWith("Product model with ID")) {
          handleApiError("Model topilmadi", "topRight");
          return;
        } else if (
          status === 400 &&
          msg.startsWith("Product model has products")
        ) {
          handleApiError("Model mahsulotlarga ega", "topRight");
          return;
        } else {
          handleApiError("Serverda xato", "topRight");
          return;
        }
      },
    });
  };

  return (
    <div
      className="bg-white rounded-2xl p-3 flex flex-col min-[385px]:flex-row min-[385px]:items-center gap-4 border border-bg-fy hover:bg-gray-50 transition-all cursor-pointer"
      onClick={() => onDetail(item.id)}
    >
      <div
        className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-50"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={item.products.images.image_url}
          alt={item.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          wrapperClassName="w-full h-full"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-[15px] font-bold text-gray-900 truncate leading-tight">
          {item.name}
        </h3>
        <div className="flex w-full justify-between items-center gap-2">
          <span className="text-[11px] font-bold text-blue-500 tracking-wider">
            {
              productCategories[
                item.product_category?.name as keyof typeof productCategories
              ]
            }
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-gray-400 bg-gray-50 rounded">
            {item.size}
          </span>
          <div className="flex items-center gap-2 text-gray-400 text-[11px]">
            <div className="flex items-center gap-1">
              <Factory size={11} />
              <span className="truncate max-w-[70px]">{item.tsex?.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Store size={11} />
              <span className="truncate max-w-[70px]">{item.shop?.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row min-[385px]:flex-col items-center min-[385px]:items-end justify-between min-[385px]:justify-start gap-1">
        <div className="flex items-center gap-1.5 mt-auto">
          <div className={`relative flex h-2 w-2`}>
            {item.total_quantity < 10 && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            )}
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                item.total_quantity >= 10 ? "bg-blue-500" : "bg-red-500"
              }`}
            ></span>
          </div>

          <span
            className={`text-[11px] font-bold tracking-tight ${
              item.total_quantity >= 10 ? "text-blue-500" : "text-red-500"
            }`}
          >
            Qoldiq: {item.total_quantity} ta
          </span>
        </div>

        <div className="flex gap-1">
          <div
            className="p-2 hover:bg-emerald-50 rounded-lg cursor-pointer transition-colors group"
            onClick={(e) => e.stopPropagation()}
          >
            <Edit
              size={18}
              className="text-slate-400 group-hover:text-emerald-600"
              onClick={() => handleUpdate(item.id)}
            />
          </div>
          <div
            className="p-2 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors group"
            onClick={(e) => e.stopPropagation()}
          >
            <Popconfirm
              title="Tasdiqlash"
              description="Rostdan o'chirmohchimisz?"
              okText="Ha"
              cancelText="Yo'q"
              onConfirm={() => handleDelete(item?.id)}
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              okButtonProps={{
                danger: true,
                disabled: deleteProductModelById.isPending,
                loading: deleteProductModelById.isPending,
              }}
            >
              <Trash
                size={18}
                className="text-slate-400 group-hover:text-rose-600"
              />
            </Popconfirm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductModelCard);

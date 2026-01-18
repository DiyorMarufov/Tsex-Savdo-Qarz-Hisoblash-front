import { memo } from "react";
import { Edit, Factory, Store, Trash } from "lucide-react";
import type { ProductModelTableItem } from "../../../shared/lib/model/product-models/product-models-model";
import { Image, Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useProductModel } from "../../lib/apis/product-models/useProductModel";
import { useApiNotification } from "../../hooks/api-notification/useApiNotification";

interface ProductModelCardProps {
  item: ProductModelTableItem;
  onDetail: (id: string) => void;
}

const ProductModelCard = ({ item, onDetail }: ProductModelCardProps) => {
  const { deleteProductModelById } = useProductModel();
  const { handleApiError, handleSuccess } = useApiNotification();
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
      className="bg-white rounded-2xl p-3 flex items-center gap-3 border border-bg-fy active:bg-gray-50 transition-colors cursor-pointer"
      onClick={() => onDetail(item.id)}
    >
      <div
        className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={item.products?.[0]?.images?.[0]?.image_url}
          alt={item.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          wrapperClassName="w-full h-full"
        />
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="flex flex-col">
          <h3 className="text-[15px] font-semibold text-gray-900 truncate leading-tight">
            {item.name}
          </h3>
          <span className="text-[10px] font-bold text-blue-500 tracking-wider">
            {item.brand}
          </span>
        </div>

        <div className="flex flex-col mt-1 gap-0.5">
          <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
            <Factory size={12} className="text-gray-400" />
            <span className="truncate">
              {item.tsex?.name || "Tsex kiritilmagan"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
            <Store size={12} className="text-gray-400" />
            <span className="truncate">
              {item.shop?.name || "Do'kon kiritilmagan"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <div className="p-2 hover:bg-emerald-50 rounded-lg cursor-pointer transition-colors group">
          <Edit
            size={18}
            className="text-slate-400 group-hover:text-emerald-600"
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
  );
};

export default memo(ProductModelCard);

import { memo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Image, Popconfirm } from "antd";
import { ArrowLeft, Edit, Trash } from "lucide-react";
import ProductDetailCardSkeleton from "../../../../shared/ui/Skeletons/Products/ProductDetailCardSkeleton";
import { useProduct } from "../../../../shared/lib/apis/products/useProduct";
import {
  productCategories,
  productMaterialTypes,
} from "../../../../shared/lib/constants";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useApiNotification } from "../../../../shared/hooks/api-notification/useApiNotification";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getProductById, deleteProductById } = useProduct();

  const { data, isLoading, isError } = getProductById(id as string);
  const product = data?.data;

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  if (isLoading) {
    return <ProductDetailCardSkeleton />;
  }

  if (isError || !product) {
    return (
      <div className="text-center py-10 text-red-500">Mahsulot topilmadi</div>
    );
  }

  const price = product.price.toLocaleString("uz-UZ");

  const { handleApiError } = useApiNotification();
  const handleDelete = (id: string) => {
    deleteProductById.mutate(id, {
      onSuccess: () => {
        navigate(-1);
      },
      onError: (err: any) => {
        const status = err?.response?.data?.statusCode;
        const msg = err?.response?.data?.message;

        if (status === 404 && msg.startsWith("Product with ID")) {
          handleApiError("Mahsulot topilmadi", "topRight");
          return;
        } else if (
          status === 400 &&
          msg.startsWith("Product has sold already")
        ) {
          handleApiError("Mahsulot allaqachon sotilgan", "topRight");
          return;
        } else {
          handleApiError("Serverda xato", "topRight");
          return;
        }
      },
    });
  };

  return (
    <div className="mx-auto bg-white rounded-[5px]">
      <div className="flex items-center px-3 gap-12 h-12 border-b bg-white">
        <ArrowLeft
          className="hover:opacity-75 cursor-pointer"
          onClick={() => navigate(-1)}
        />

        <h2 className="text-[17px] font-bold text-slate-800">
          Mahsulot Tafsilotlari
        </h2>
      </div>

      <div className="p-4 lg:p-8">
        <div className="flex max-[1380px]:flex-col gap-3">
          <div className="min-[1380px]:w-1/2">
            <div className="bg-gray-50 rounded-2xl p-6 flex items-center justify-center h-full">
              <Image
                src={
                  product.images?.length
                    ? product.images[0].image_url
                    : "https://via.placeholder.com/400"
                }
                className="object-contain max-h-[350px] lg:max-h-[450px]"
              />
            </div>
          </div>

          <div className="min-[1380px]:w-1/2">
            <a className="text-[22px] font-bold">
              {product?.product_model.name}
            </a>
            <p className="text-bg-sy mb-3 text-[18px]">
              {product?.product_model.brand || "Noma'lum brend"}
            </p>

            <div className="divide-y rounded-xl overflow-hidden">
              <InfoRow label="Narxi" value={`${price} UZS`} highlight />
              <InfoRow
                label="Kategoriya"
                value={
                  productCategories[product?.product_category?.name || "-"]
                }
              />
              <InfoRow
                label="Material turi"
                value={
                  productMaterialTypes[
                    product?.product_material_type?.name || "-"
                  ]
                }
              />
              <InfoRow
                label="Rangi"
                value={
                  product?.color
                    ? product.color.charAt(0).toUpperCase() +
                      product.color.slice(1)
                    : ""
                }
              />
              <InfoRow label="Miqdori" value={product.quantity} />
              <InfoRow
                label="Pochkadagi soni"
                value={product.unit_in_package || "—"}
              />
              <InfoRow label="O‘lchami" value={product.size || "—"} />
              <InfoRow
                label="Do‘kon"
                value={`${product?.product_model.shop?.name}` || "—"}
              />
              <InfoRow
                label="Tsex"
                value={`${product?.product_model.tsex?.name}` || "—"}
              />
              <InfoRow
                label="Kim kiritgan"
                value={product?.product_model?.created_by?.full_name || "—"}
              />
              <InfoRow
                label="Sana"
                value={new Date(product?.created_at).toLocaleString("uz-UZ")}
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-1">
            <div className="p-2 hover:bg-emerald-50 rounded-lg cursor-pointer transition-colors group">
              <Edit
                size={18}
                className="text-slate-400 group-hover:text-emerald-600"
              />
            </div>
            <div className="p-2 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors group">
              <Popconfirm
                title="Tasdiqlash"
                description="Rostdan o'chirmohchimisz?"
                okText="Ha"
                cancelText="Yo'q"
                onConfirm={() => handleDelete(product?.id)}
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                okButtonProps={{
                  danger: true,
                  disabled: deleteProductById.isPending,
                  loading: deleteProductById.isPending,
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
    </div>
  );
};

const InfoRow = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div className="flex justify-between items-center py-3">
    <span className="text-bg-sy text-[14px]">{label}</span>
    <span
      className={`text-[15px] font-bold ${
        highlight ? "text-green-500 font-semibold" : "text-gray-700"
      }`}
    >
      {value}
    </span>
  </div>
);

export default memo(ProductDetailPage);

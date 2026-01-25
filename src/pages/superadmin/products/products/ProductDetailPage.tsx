import { memo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Image, Popconfirm } from "antd";
import { ArrowLeft, Edit, Trash } from "lucide-react";
import ProductDetailCardSkeleton from "../../../../shared/ui/Skeletons/Products/ProductDetailCardSkeleton";
import { useProduct } from "../../../../shared/lib/apis/products/useProduct";
import {
  productCategories,
  productMaterialTypes,
} from "../../../../shared/lib/constants";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useApiNotification } from "../../../../shared/hooks/api-notification/useApiNotification";
import { useProductHistory } from "../../../../shared/lib/apis/product-histories/useProductHistory";
import ProductHistorySkeleton from "../../../../shared/ui/Skeletons/Products/ProductHistorySkeleton";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getProductById, deleteProductById } = useProduct();
  const { getAllProductHistoriesByProductId } = useProductHistory();
  const { handleApiError } = useApiNotification();

  const {
    data,
    isLoading: productDetailLoading,
    isError,
  } = getProductById(id as string);
  const product = data?.data;

  const {
    data: allProductHistories,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: productHistoriesLoading,
  } = getAllProductHistoriesByProductId(id as string);
  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  if (productDetailLoading) {
    return <ProductDetailCardSkeleton />;
  }

  if (isError || !product) {
    return (
      <div className="text-center py-10 text-red-500">Mahsulot topilmadi</div>
    );
  }

  const price = product?.product_model?.price?.toLocaleString("uz-UZ");

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

  const productHistories =
    allProductHistories?.pages.flatMap((page: any) => {
      return Array.isArray(page) ? page : page?.data?.data || page?.data || [];
    }) || [];

  return (
    <div className="mx-auto bg-white rounded-[12px] overflow-hidden">
      <div className="relative flex items-center px-4 lg:px-8 h-12 border-b bg-white">
        <ArrowLeft
          className="hover:opacity-75 cursor-pointer"
          onClick={() => navigate(-1)}
        />

        <h2 className="absolute inset-0 flex items-center justify-center text-[17px] font-bold text-slate-800 pointer-events-none">
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
            <div className="flex justify-between items-start mb-4">
              <div>
                <a className="text-[22px] font-bold block leading-tight">
                  {product?.product_model.name}
                </a>
              </div>

              <div className="flex items-center gap-1">
                <div className="p-2 hover:bg-emerald-50 rounded-lg cursor-pointer transition-colors group">
                  <Edit
                    size={18}
                    className="text-slate-400 group-hover:text-emerald-600"
                  />
                </div>
                <div className="p-2 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors group">
                  <Popconfirm
                    title="Tasdiqlash"
                    description="Rostdan o'chirmoqchimisiz?"
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

            <div className="divide-y rounded-xl overflow-hidden border-t">
              <InfoRow label="Narxi" value={`${price} UZS`} highlight />
              <InfoRow
                label="Kategoriya"
                value={
                  productCategories[
                    product?.product_model?.product_category?.name || "-"
                  ]
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
              <div className="flex justify-between items-center py-3">
                <span className="text-bg-sy text-[14px]">Miqdori</span>
                <span
                  className={`text-[15px] ${product.quantity >= 10 ? "text-blue-500" : "text-red-500"} font-bold
                  `}
                >
                  {product.quantity}
                </span>
              </div>
              <InfoRow
                label="Pochkadagi soni"
                value={product.unit_in_package || "—"}
              />
              <InfoRow
                label="O‘lchami"
                value={product?.product_model?.size || "—"}
              />
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
        </div>

        <div className="mt-3 bg-gray-50/50">
          <h3 className="text-[18px] font-bold text-slate-800 mb-1">
            Kirimlar Tarixi
          </h3>

          <div className="bg-white rounded-xl border px-3.5 pt-px pb-4 h-[340px] overflow-y-auto main-outlet">
            {productHistoriesLoading ? (
              Array.from({ length: 5 }).map((_, index: number) => (
                <ProductHistorySkeleton key={index} />
              ))
            ) : productHistories?.length > 0 ? (
              <>
                <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {productHistories.map((history: any) => (
                    <ProductHistoryItem key={history.id} history={history} />
                  ))}

                  {hasNextPage && (
                    <div className="flex justify-center min-[500px]:justify-end mt-4">
                      <Button
                        type="primary"
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        loading={isFetchingNextPage}
                        className="w-full min-[500px]:w-[150px]!"
                      >
                        {isFetchingNextPage ? "Yuklanmoqda..." : "Yana yuklash"}
                      </Button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-6 text-gray-400">
                Hozircha kirimlar tarixi mavjud emas
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = memo(
  ({
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
          highlight ? "text-green-500 font-semibold" : "text-gray-600"
        }`}
      >
        {value}
      </span>
    </div>
  ),
);

const ProductHistoryItem = memo(({ history }: { history: any }) => (
  <div className="flex justify-between items-center py-3 border-b last:border-0 border-gray-100">
    <div className="flex flex-col">
      <span className="text-[14px] font-medium text-slate-700">
        +{history.quantity} ta
      </span>
      <span className="text-[12px] text-gray-400">
        {new Date(history.created_at).toLocaleString("uz-UZ")}
      </span>
    </div>
    <div className="text-right">
      <span className="text-[13px] text-gray-500 block">Kiritdi:</span>
      <span className="text-[13px] font-semibold text-slate-600">
        {history.created_by?.full_name || "Noma'lum"}
      </span>
    </div>
  </div>
));

export default memo(ProductDetailPage);

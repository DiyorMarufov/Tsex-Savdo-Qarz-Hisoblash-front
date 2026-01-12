import { memo, useEffect } from "react";
import { useProduct } from "../../../shared/lib/apis/products/useProduct";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Image } from "antd";
import ProductDetailCardSkeleton from "../../../shared/ui/Skeletons/Products/ProductDetailCardSkeleton";
import { ArrowLeft, Edit } from "lucide-react";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getProductById } = useProduct();

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

  return (
    <div className="mx-auto bg-white rounded-[5px]">
      <div className="flex items-center justify-center p-4 border-b relative">
        <ArrowLeft
          className="absolute left-3 cursor-pointer hover:opacity-80"
          onClick={() => navigate(-1)}
        />
        <h2 className="text-[18px] font-semibold">Mahsulot Tafsilotlari</h2>
      </div>

      <div className="p-4 lg:p-8">
        <div className="flex max-[1380px]:flex-col gap-8">
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
            <a className="text-[22px] font-bold">{product.name}</a>
            <p className="text-bg-sy mb-6 text-[18px]">
              {product.brand || "Noma'lum brend"}
            </p>

            <div className="divide-y rounded-xl overflow-hidden">
              <InfoRow label="Narxi" value={`${price} UZS`} highlight />
              <InfoRow label="Miqdori" value={product.quantity} />
              <InfoRow
                label="Pochkadagi soni"
                value={product.unit_in_package || "—"}
              />
              <InfoRow label="O‘lchami" value={product.size || "—"} />
              <InfoRow label="Do‘kon" value={`${product.shop?.name}` || "—"} />
              <InfoRow label="Tsex" value={`${product.tsex?.name}` || "—"} />
              <InfoRow
                label="Kim kiritgan"
                value={product.user?.full_name || "—"}
              />
              <InfoRow
                label="Sana"
                value={new Date(product?.created_at).toLocaleString("uz-UZ")}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex p-4 justify-end">
        <Button className="bg-green-500! text-white! h-10! max-[500px]:w-full">
          <Edit />
        </Button>
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
    <span className="text-bg-sy text-[15px]">{label}</span>
    <span
      className={`text-[16px] font-bold ${
        highlight ? "text-green-500 font-semibold" : "text-gray-800"
      }`}
    >
      {value}
    </span>
  </div>
);

export default memo(ProductDetailPage);

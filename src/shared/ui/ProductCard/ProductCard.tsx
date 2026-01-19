import { memo } from "react";
import { Image, Button as AntdButton } from "antd";
import type { ProductTableListItem } from "../../lib/model/products/products-model";
import {
  colorOptions,
  productCategories,
  productMaterialTypes,
} from "../../lib/constants";

interface ProductCardProps {
  product: ProductTableListItem;
  onDetail: (model_id: string, id: string) => void;
}

const ProductCard = ({ product, onDetail }: ProductCardProps) => {
  const findColor = colorOptions.find((color) =>
    color.value === product.color ? color.hex : "",
  );

  return (
    <div className="flex flex-col border border-bg-fy bg-white rounded-2xl p-3 gap-3">
      <div className="flex justify-center items-center bg-slate-50/50 rounded-xl overflow-hidden shrink-0 aspect-square max-h-[100px]">
        <Image
          src={product.images?.[0]?.image_url}
          alt={product.product_category.name}
          className="w-full! h-full! object-contain!"
          wrapperClassName="w-full! h-full! flex! justify-center! items-center!"
        />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start gap-2">
          <div className="flex flex-col min-w-0">
            <h3 className="text-[15px] font-bold text-slate-900 line-clamp-1 leading-tight tracking-tight">
              {productCategories[product.product_category.name]}
            </h3>
            <span className="text-[13px] font-bold text-blue-500 tracking-tighter mt-0.5">
              {productMaterialTypes[product.product_material_type.name]}
            </span>
          </div>

          <div
            className="h-4.5 w-4.5 rounded-full border border-slate-200 shrink-0 mt-1 shadow-sm"
            style={{ backgroundColor: findColor?.hex }}
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[17px] text-emerald-600 font-bold tabular-nums">
            {product.price.toLocaleString()}
            <span className="text-[11px] ml-1 uppercase opacity-70">uzs</span>
          </span>
        </div>
      </div>

      <div className="flex justify-end mt-1 pb-1">
        <AntdButton
          type="primary"
          className="h-8! rounded-xl! border-none!"
          onClick={() => onDetail(product.product_model.id, product.id)}
        >
          Batafsil
        </AntdButton>
      </div>
    </div>
  );
};

export default memo(ProductCard);

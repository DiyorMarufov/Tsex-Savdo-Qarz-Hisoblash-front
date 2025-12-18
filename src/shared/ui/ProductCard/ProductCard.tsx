import { memo } from "react";
import { Image, Button as AntdButton } from "antd";
import type { ProductTableListItem } from "../../../pages/superadmin/products/model/product-table-model";

interface ProductCardProps {
  product: ProductTableListItem;
  onDetail: (id: string) => void;
}

const ProductCard = ({ product, onDetail }: ProductCardProps) => {
  return (
    <div className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px]">
      <div className="p-2.5 flex justify-center items-center">
        {/* @ts-ignore */}
        <Image
          src={product.images?.[0]?.image_url}
          className="w-full rounded-[5px] object-contain h-[130px]!"
        />
      </div>
      <div className="flex flex-col gap-1 justify-between px-3.5 py-2.5">
        <div className="flex flex-col">
          <span className="text-[16px] font-bold line-clamp-1">
            {product.name}
          </span>
          <span className="text-[14px] font-bold text-[#6B7280]">
            {product.brand}
          </span>
        </div>
        <span className="text-[17px] text-green-500 font-bold">
          {product.price.toLocaleString()}
        </span>
      </div>

      <div className="w-full h-px bg-bg-fy"></div>

      <div className="mt-1 px-3.5 pt-2 pb-3">
        <div className="flex justify-end">
          <AntdButton
            className="bg-[#1D4ED8]! text-white!"
            onClick={() => onDetail(product.id)}
          >
            Batafsil
          </AntdButton>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);

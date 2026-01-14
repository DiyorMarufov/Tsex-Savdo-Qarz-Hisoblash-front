import { memo } from "react";
import { ChevronRight, Factory, Store } from "lucide-react";
import type { ProductModelTableItem } from "../../../shared/lib/model/product-models/product-models-model";
import { Image } from "antd";

interface ProductModelCardProps {
  item: ProductModelTableItem;
  onDetail: (id: string) => void;
}

const ProductModelCard = ({ item, onDetail }: ProductModelCardProps) => {
  return (
    <div className="bg-white rounded-2xl p-3 flex items-center gap-3 border border-bg-fy active:bg-gray-50 transition-colors cursor-pointer">
      <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0">
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

      <div
        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50"
        onClick={() => onDetail(item.id)}
      >
        <ChevronRight size={18} />
      </div>
    </div>
  );
};

export default memo(ProductModelCard);

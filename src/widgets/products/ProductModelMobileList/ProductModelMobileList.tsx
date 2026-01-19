import { memo } from "react";
import { Pagination } from "antd";
import type { ProductModelTableItem } from "../../../shared/lib/model/product-models/product-models-model";
import ProductModelCard from "../../../shared/ui/ProductModelCard/ProductModelCard";
import ProductModelCardSkeleton from "../../../shared/ui/Skeletons/Products/ProductModelCardSkeleton";

interface ProductModelMobileListProps {
  models: ProductModelTableItem[] | undefined;
  isLoading: boolean;
  total: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number, pageSize?: number) => void;
  onDetail: (id: string) => void;
}

const ProductModelMobileList = ({
  models,
  isLoading,
  total,
  currentPage,
  pageSize,
  onPageChange,
  onDetail,
}: ProductModelMobileListProps) => {
  if (isLoading) {
    return <ProductModelCardSkeleton />;
  }

  return (
    <div className="min-[500px]:hidden flex flex-col gap-4 mt-4">
      {models && models.length > 0 ? (
        models.map((item) => (
          <ProductModelCard key={item.id} item={item} onDetail={onDetail} />
        ))
      ) : (
        <div className="flex justify-center items-center h-[20vh] text-red-500 text-[18px]">
          Hozircha malumot yoq
        </div>
      )}

      {total > pageSize && (
        <div className="flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={total}
            onChange={onPageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default memo(ProductModelMobileList);

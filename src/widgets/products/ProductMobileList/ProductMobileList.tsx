import { memo } from "react";
import { Pagination } from "antd";
import ProductCardSkeleton from "../../../shared/ui/Skeletons/Products/ProductCardSkeleton";
import ProductCard from "../../../shared/ui/ProductCard/ProductCard";
import type { ProductTableListItem } from "../../../shared/lib/model/products/product-table-model";

interface ProductMobileListProps {
  products: ProductTableListItem[] | undefined;
  isLoading: boolean;
  total: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number, pageSize?: number) => void;
  onDetail: (id: string) => void;
}

const ProductMobileList = ({
  products,
  isLoading,
  total,
  currentPage,
  pageSize,
  onPageChange,
  onDetail,
}: ProductMobileListProps) => {
  if (isLoading) {
    return <ProductCardSkeleton />;
  }

  return (
    <div className="min-[500px]:hidden mt-4">
      <div className="grid grid-cols-2 gap-5 max-[330px]:grid-cols-1">
        {products && products.length > 0 ? (
          products.map((pr) => (
            <ProductCard key={pr.id} product={pr} onDetail={onDetail} />
          ))
        ) : (
          <div className="flex justify-center items-center h-[20vh] text-red-500 text-[19px] col-span-2">
            Hozircha ma'lumot yo'q
          </div>
        )}
      </div>

      {total > 0 && (
        <div className="flex mt-4 justify-center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            onChange={onPageChange}
            total={total}
            showSizeChanger
          />
        </div>
      )}
    </div>
  );
};

export default memo(ProductMobileList);

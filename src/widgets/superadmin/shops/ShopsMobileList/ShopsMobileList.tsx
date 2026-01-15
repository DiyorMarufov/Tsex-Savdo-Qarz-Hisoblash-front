import { memo } from "react";
import { Pagination } from "antd";
import ShopCardSkeleton from "../../../../shared/ui/Skeletons/Shops/ShopCardSkeleton";
import ShopCard from "../../../../shared/ui/ShopCard/ShopCard";
import type { StoresTableListItem } from "../../../../shared/lib/model/shops/shops-table-model";

interface ShopsMobileListProps {
  data: StoresTableListItem[] | undefined;
  isLoading: boolean;
}

const ShopsMobileList = ({ data, isLoading }: ShopsMobileListProps) => {
  if (isLoading) return <ShopCardSkeleton />;

  return (
    <div className="min-[500px]:hidden flex flex-col gap-3 mt-4">
      {data?.map((st) => (
        <ShopCard key={st.id} store={st} />
      ))}
      <div className="flex justify-center">
        <Pagination />
      </div>
    </div>
  );
};

export default memo(ShopsMobileList);

import { memo } from "react";
import { Pagination } from "antd";
import ShopCardSkeleton from "../../../../shared/ui/Skeletons/Shops/ShopCardSkeleton";
import type { StoresTableListItem } from "../../../../pages/superadmin/shops/model/shops-table-model";
import ShopCard from "../../../../shared/ui/ShopCard/ShopCard";

interface ShopsMobileListProps {
  data: StoresTableListItem[] | undefined;
  isLoading: boolean;
}

const ShopsMobileList = ({ data, isLoading }: ShopsMobileListProps) => {
  if (isLoading) return <ShopCardSkeleton />;

  return (
    <div className="min-[500px]:hidden flex flex-col gap-5 mt-4">
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

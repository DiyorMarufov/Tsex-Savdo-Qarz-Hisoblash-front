import { memo } from "react";
import UserCard from "../../../../shared/ui/UserCard/UserCard";
import { Pagination } from "antd";
import UserCardSkeleton from "../../../../shared/ui/Skeletons/Users/UserCardSkeleton";
import type { UsersTableListItem } from "../../../../shared/lib/model/users/users-model";

interface UserMobileListProps {
  data: UsersTableListItem[];
  isLoading: boolean;
  total: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number, pageSize?: number) => void;
}

const UserMobileList = ({
  data,
  isLoading,
  total,
  currentPage,
  pageSize,
  onPageChange,
}: UserMobileListProps) => {
  if (isLoading) return <UserCardSkeleton />;
  return (
    <div className="min-[500px]:hidden flex flex-col gap-5 mt-4">
      {data && data.length > 0 ? (
        data?.map((user) => <UserCard key={user.id} user={user} />)
      ) : (
        <div className="flex justify-center items-center h-[20vh] text-red-500 text-[19px] col-span-2">
          Hozircha ma'lumot yo'q
        </div>
      )}

      {total > pageSize && (
        <div className="flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={total}
            onChange={onPageChange}
            showSizeChanger
          />
        </div>
      )}
    </div>
  );
};

export default memo(UserMobileList);

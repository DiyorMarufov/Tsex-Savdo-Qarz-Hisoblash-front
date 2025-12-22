import { memo } from "react";
import type { UsersTableListItem } from "../../../../pages/superadmin/users/model/users-model";
import UserCard from "../../../../shared/ui/UserCard/UserCard";
import { Pagination } from "antd";
import UserCardSkeleton from "../../../../shared/ui/Skeletons/Users/UserCardSkeleton";

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

export default memo(UserMobileList);

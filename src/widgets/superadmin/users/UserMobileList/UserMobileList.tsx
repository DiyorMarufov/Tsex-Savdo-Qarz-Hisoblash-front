import { memo } from "react";
import type { UsersTableListItem } from "../../../../pages/superadmin/users/model/users-model";
import UserCard from "../../../../shared/ui/UserCard/UserCard";

interface UserMobileListProps {
  data: UsersTableListItem[];
}

const UserMobileList = ({ data }: UserMobileListProps) => {
  return (
    <div className="min-[500px]:hidden flex flex-col gap-5 mt-4">
      {data.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default memo(UserMobileList);

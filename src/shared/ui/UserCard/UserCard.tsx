import { Edit, Trash } from "lucide-react";
import { memo } from "react";
import type { UsersTableListItem } from "../../../pages/superadmin/users/model/users-model";
import { formatPhoneNumber } from "../../lib/functions/formatPhoneNumber";

interface UserMobileCardProps {
  user: UsersTableListItem;
}

const UserCard = ({ user }: UserMobileCardProps) => {
  return (
    <div className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px]">
      <div className="flex justify-between px-3.5 py-2.5">
        <div className="flex flex-col">
          <a className="text-[16px] font-bold">{user.full_name}</a>
          <span className="text-[15px] font-bold text-[#4B5563]">
            {formatPhoneNumber(user.phone_number)}
          </span>
        </div>
        <div className="flex items-center gap-5">
          <Edit className="text-green-600 cursor-pointer hover:opacity-80 w-6 h-6" />
          <Trash className="text-red-600 cursor-pointer hover:opacity-80 w-6 h-6" />
        </div>
      </div>

      <div className="w-full h-px bg-bg-fy"></div>

      <div className="flex flex-col px-3.5 py-2.5 gap-2">
        <div className="flex justify-between items-center">
          <span className="font-medium text-[#6B7280] text-[15px]">Roli</span>
          <span className="text-[16px] font-bold text-[#4B5563]">
            {user.roles[0].role.name}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium text-[#6B7280] text-[15px]">
            Faolligi
          </span>
          <div
            className={`px-2 py-0.5 rounded-full flex justify-center items-center ${
              user.is_active ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <span
              className={`font-bold text-[12px] ${
                user.is_active ? "text-green-500" : "text-red-500"
              }`}
            >
              {user.is_active ? "Faol" : "Nofaol"}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium text-[#6B7280] text-[15px]">
            Kiritilgan sana
          </span>
          <span className="text-[16px] font-bold text-[#4B5563]">
            {new Date(user.created_at).toLocaleDateString("uz-UZ")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(UserCard);

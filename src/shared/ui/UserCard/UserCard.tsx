import { memo } from "react";
import { Edit, Trash } from "lucide-react";
import { formatPhoneNumber } from "../../lib/functions/formatPhoneNumber";
import { roleTranslationToUzbek } from "../../lib/constants";
import type { UsersTableListItem } from "../../lib/model/users/users-model";

interface UserMobileCardProps {
  user: UsersTableListItem;
}

const UserCard = ({ user }: UserMobileCardProps) => {
  return (
    <div className="flex flex-col border border-bg-fy bg-white rounded-2xl p-4 gap-3">
      <div className="flex justify-between items-start gap-2">
        <div className="flex flex-col min-w-0">
          <h3 className="text-[17px] font-bold text-slate-900 truncate tracking-tight">
            {user.full_name}
          </h3>
          <span className="text-[14px] font-bold text-slate-500 mt-1">
            {formatPhoneNumber(user.phone_number)}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <div className="p-2 hover:bg-emerald-50 rounded-lg cursor-pointer transition-colors group">
            <Edit
              size={18}
              className="text-slate-400 group-hover:text-emerald-600"
            />
          </div>
          <div className="p-2 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors group">
            <Trash
              size={18}
              className="text-slate-400 group-hover:text-rose-600"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-3 rounded-xl border border-slate-100/50">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Roli
          </span>
          <span className="text-[14px] font-bold text-slate-700">
            {roleTranslationToUzbek[
              user.roles[0].role.name as keyof typeof roleTranslationToUzbek
            ] ?? "-"}
          </span>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Faolligi
          </span>
          <div
            className={`mt-1 px-2 py-0.5 rounded-full ${user.is_active ? "bg-emerald-50" : "bg-rose-50"}`}
          >
            <span
              className={`font-bold text-[11px] uppercase ${user.is_active ? "text-emerald-600" : "text-rose-600"}`}
            >
              {user.is_active ? "Faol" : "Nofaol"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <span className="text-[12px] font-medium text-slate-400">
          Kiritilgan sana:{" "}
          <span className="font-bold text-slate-500">
            {new Date(user.created_at).toLocaleDateString("uz-UZ")}
          </span>
        </span>
      </div>
    </div>
  );
};

export default memo(UserCard);

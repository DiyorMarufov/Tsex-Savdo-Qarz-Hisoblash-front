import { Input } from "antd";
import { memo } from "react";

const ProfileSettings = () => {
  return (
    <div className="bg-white rounded-xl border border-bg-fy overflow-hidden">
      <div className="px-3.5 pt-3 border-b border-gray-50">
        <h3 className="font-bold text-gray-800">Profil sozlamalari</h3>
      </div>
      <div className="p-3.5 pb-3.5 space-y-6">
        <div className="grid grid-cols-2 gap-4 max-[400px]:grid-cols-1">
          <div>
            <span className="text-sm font-semibold text-gray-700 flex mb-1">
              To'liq ism
            </span>
            <Input
              defaultValue="Azizbek Alisherov"
              className="h-10!"
              disabled
            />
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-700 flex mb-1">
              Telefon raqami
            </span>
            <Input
              defaultValue="+998 90 123 45 67"
              className="h-10!"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProfileSettings);

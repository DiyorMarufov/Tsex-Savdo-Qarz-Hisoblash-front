import { memo, useEffect } from "react";
import { Button } from "antd";
import { LogoutOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import ProfileSettings from "../../../widgets/settings/ProfileSettings";
import SystemParameters from "../../../widgets/settings/SystemParameters";
import SystemVersion from "../../../widgets/settings/SystemVersion";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import { useDispatch } from "react-redux";
import { removeToken } from "../../../features/auth/model/authModel";

const SettingsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  const handleSignOut = () => {
    dispatch(removeToken());
    window.location.replace("/");
  };

  return (
    <div className="flex-1 w-full">
      <div className="mb-2">
        <LargeTitle title="Sozlamalar" />
      </div>

      <div className="flex flex-col gap-5">
        <ProfileSettings />
        <SystemParameters />
        <SystemVersion />

        <Button
          danger
          type="text"
          icon={<LogoutOutlined />}
          className="w-45 h-9! bg-red-500! text-white!"
          onClick={handleSignOut}
        >
          Sign Out (Chiqish)
        </Button>
        <div className="flex items-center justify-end gap-4 pt-2 max-[800px]:flex-col">
          <div className="flex gap-3 max-[375px]:flex-col-reverse max-[800px]:w-full">
            <Button
              icon={<CloseOutlined />}
              className="h-9! max-[800px]:w-full"
            >
              Bekor qilish
            </Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              className="h-9! max-[800px]:w-full rounded-lg"
            >
              O'zgarishlarni saqlash
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SettingsPage);

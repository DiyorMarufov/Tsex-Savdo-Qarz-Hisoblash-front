import { memo, useEffect } from "react";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import ProfileSettings from "../../../widgets/settings/ProfileSettings";
import SystemParameters from "../../../widgets/settings/SystemParameters";
import SystemVersion from "../../../widgets/settings/SystemVersion";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import { useDispatch } from "react-redux";
import { removeToken } from "../../../features/auth/model/authModel";

const AdminSettingsPage = () => {
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
      <LargeTitle title="Sozlamalar" />

      <div className="flex flex-col gap-5">
        <ProfileSettings />
        <SystemParameters />
        <SystemVersion />

        <Button
          danger
          type="text"
          icon={<LogoutOutlined />}
          className="w-25 h-9! bg-red-500! text-white!"
          onClick={handleSignOut}
        >
          Chiqish{" "}
        </Button>
      </div>
    </div>
  );
};

export default memo(AdminSettingsPage);

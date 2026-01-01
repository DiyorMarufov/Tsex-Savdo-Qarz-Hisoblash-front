import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { memo, type FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import type { RootState } from "../../app/store";
import {
  AdminSidebarNavigation,
  SuperadminSidebarNavigation,
  type SidebarNavItem,
} from "../../shared/config/routes";

interface Props {
  collapsed: boolean;
}

const Sidebar: FC<Props> = ({ collapsed }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const token = useSelector((state: RootState) => state.setToken.token);
  const decoded = jwtDecode<{ id: number; role: string }>(token as string);
  const { role } = decoded;

  let menuItems: SidebarNavItem[] = [];

  switch (role) {
    case "superadmin":
      menuItems = SuperadminSidebarNavigation;
      break;
    case "admin":
      menuItems = AdminSidebarNavigation;
      break;
    default:
      break;
  }

  const items = menuItems.map((sidebar) => ({
    key: sidebar.to,
    icon: sidebar.icon,
    label: sidebar.label,
    onClick: () => navigate(sidebar.to),
  }));
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={256}
      className="pt-22 max-[701px]:hidden"
      style={{
        background: "#fff",
        position: "sticky",
        top: 0,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={[pathname]}
        items={items}
      />
    </Sider>
  );
};

export default memo(Sidebar);

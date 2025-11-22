import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../widgets/superadmin/sidebar/Sidebar";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { jwtDecode } from "jwt-decode";
import {
  SuperadminSidebarNavigation,
  type SidebarNavItem,
} from "../../shared/config/routes";

const { Header, Content } = Layout;

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const token = useSelector((state: RootState) => state.setToken.token);
  const decoded = jwtDecode<{ id: number; role: string }>(token as string);
  const { role } = decoded;

  let menuItems: SidebarNavItem[] = [];

  switch (role) {
    case "superadmin":
      menuItems = SuperadminSidebarNavigation;
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
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Header className="bg-bg-ty! p-0! sticky top-0 z-50 shadow-sm">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
            className="max-[701px]:hidden! max-[701px]:transition-all!"
          />
        </Header>
        <Content
          className="bg-bg-ty px-6.5 py-5"
          style={{ minHeight: "calc(100vh - 64px)" }}
        >
          <Outlet />
        </Content>
      </Layout>

      <div className="min-[701px]:hidden flex justify-between fixed bottom-[0.7px] left-0 w-full bg-white shadow-md z-50 px-[0.7px]">
        {items.map((link: any) => (
          <NavLink
            end
            to={link.key}
            key={link?.key}
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-blue-500! text-white!"
                  : "bg-white! text-blue-500! hover:bg-blue-100!"
              } flex items-center justify-center w-full h-[55px] rounded-[3px]`
            }
          >
            {link.icon}
          </NavLink>
        ))}
      </div>
    </Layout>
  );
};

export default DashboardLayout;

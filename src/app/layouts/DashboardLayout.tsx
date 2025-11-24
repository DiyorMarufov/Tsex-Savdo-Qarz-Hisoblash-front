import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../widgets/superadmin/sidebar/Sidebar";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { jwtDecode } from "jwt-decode";
import {
  SuperadminSidebarNavigation,
  type SidebarNavItem,
} from "../../shared/config/routes";
import BottomNav from "../../widgets/bottomNav/BottomNav";
import logo from "../../shared/assets/logo/Background.svg";

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
        <Header className="bg-bg-ty! p-0! sticky top-0 z-50 shadow-sm flex">
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
          <div className="w-full flex justify-center max-[701px]:justify-start max-[701px]:pl-6.5">
            <div className="flex items-center gap-3">
              <img src={logo} className="w-10 h-10" alt="" />
              <span className="text-[25px] font-bold max-[250px]:text-[20px]">Savdo tizimi</span>
            </div>
          </div>
        </Header>
        <Content
          className="bg-bg-ty px-6.5 pt-5 pb-22.5 main-content"
          style={{ minHeight: "calc(100vh - 64px)" }}
        >
          <Outlet />
        </Content>
      </Layout>

      <BottomNav items={items} />
    </Layout>
  );
};

export default DashboardLayout;

import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: "#F8F9FA" }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            padding: 32,
            background: "#F8F9FA",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;

import { memo, useEffect } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Tabs } from "antd";

const reportTabs = [
  { key: "/admin/reports/sale", label: "Sotuvlar" },
  { key: "/admin/reports/products", label: "Mahsulotlar" },
  { key: "/admin/reports/tsexes", label: "Tsexlar" },
];

const AdminReportsPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  const getActiveKey = () => {
    const activeTab = reportTabs.find((tab) => pathname.startsWith(tab.key));
    return activeTab ? activeTab.key : reportTabs[0].key;
  };

  return (
    <div>
      <div>
        <LargeTitle title="Hisobotlar" />
      </div>

      <Tabs
        activeKey={getActiveKey()}
        items={reportTabs}
        onChange={(key) => navigate(key)}
      />

      <div className="mt-2">
        <Outlet />
      </div>
    </div>
  );
};

export default memo(AdminReportsPage);

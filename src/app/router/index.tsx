import { memo } from "react";
import { useRoutes } from "react-router-dom";
import LoginPage from "../../pages/login/LoginPage";
import DashboardLayout from "../layouts/DashboardLayout";
import NavigateToRole from "../providers/router/guards/NavigateToRole";
import AdminGuard from "../providers/router/guards/AdminGuard";
import DashboardPage from "../../pages/superadmin/dashboard/DashboardPage";

const Router = () => {
  const routes = useRoutes([
    { path: "/login", element: <LoginPage /> },
    { index: true, element: <NavigateToRole /> },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: "superadmin",
          element: <AdminGuard allowedRoles={["superadmin"]} />,
          children: [
            {
              index: true,
              element: <DashboardPage />,
            },
          ],
        },
      ],
    },
  ]);
  return routes;
};

export default memo(Router);

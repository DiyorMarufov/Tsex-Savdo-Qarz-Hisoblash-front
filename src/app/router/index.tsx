import { lazy, memo } from "react";
import { useRoutes } from "react-router-dom";

const LoginPage = lazy(() => import("../../pages/login/LoginPage"));
const DashboardLayout = lazy(() => import("../layouts/DashboardLayout"));
const NavigateToRole = lazy(
  () => import("../providers/router/guards/NavigateToRole")
);
const AdminGuard = lazy(() => import("../providers/router/guards/AdminGuard"));
const DashboardPage = lazy(
  () => import("../../pages/superadmin/dashboard/DashboardPage")
);
const AuthGuard = lazy(() => import("../providers/router/guards/AuthGuard"));
const ProductsPage = lazy(
  () => import("../../pages/superadmin/products/ProductsPage")
);
const StoresPage = lazy(
  () => import("../../pages/superadmin/stores/StoresPage")
);
const TsexesPage = lazy(
  () => import("../../pages/superadmin/tsexes/TsexesPage")
);
const CustomersPage = lazy(
  () => import("../../pages/superadmin/customers/CustomersPage")
);
const UsersPage = lazy(() => import("../../pages/superadmin/users/UsersPage"));
const ReportsPage = lazy(
  () => import("../../pages/superadmin/reports/ReportsPage")
);
const SettingsPage = lazy(
  () => import("../../pages/superadmin/settings/SettingsPage")
);

const Router = () => {
  const routes = useRoutes([
    { path: "/login", element: <LoginPage /> },
    {
      element: <AuthGuard />,
      children: [
        { path: "/", element: <NavigateToRole /> },
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
                {
                  path: "products",
                  element: <ProductsPage />,
                },
                {
                  path: "stores",
                  element: <StoresPage />,
                },
                {
                  path: "tsexes",
                  element: <TsexesPage />,
                },
                {
                  path: "customers",
                  element: <CustomersPage />,
                },
                {
                  path: "users",
                  element: <UsersPage />,
                },
                {
                  path: "reports",
                  element: <ReportsPage />,
                },
                {
                  path: "settings",
                  element: <SettingsPage />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);
  return routes;
};

export default memo(Router);

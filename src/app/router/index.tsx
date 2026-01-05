import { lazy, memo } from "react";
import { useRoutes } from "react-router-dom";

const SaleItemReportPage = lazy(
  () => import("../../pages/superadmin/reports/SaleItemReportPage")
);
const SalesReportPage = lazy(
  () => import("../../pages/superadmin/reports/SalesReportPage")
);
const ProductsReportPage = lazy(
  () => import("../../pages/superadmin/reports/ProductsReportPage")
);
const TsexesReportPage = lazy(
  () => import("../../pages/superadmin/reports/TsexesReportPage")
);
const CustomersReportPage = lazy(
  () => import("../../pages/superadmin/reports/CustomersReportPage")
);
const NotFoundPage = lazy(
  () => import("../../shared/ui/NotFound/NotFoundPage")
);
const AdminSettingsPage = lazy(
  () => import("../../pages/admin/settings/SettingsPage")
);
const AdminReportsPage = lazy(
  () => import("../../pages/admin/reports/ReportsPage")
);
const AdminTsexesPage = lazy(
  () => import("../../pages/admin/tsexes/TsexesPage")
);
const AdminCustomersPage = lazy(
  () => import("../../pages/admin/customers/CustomersPage")
);
const AdminAddSalePage = lazy(
  () => import("../../pages/admin/sales/AddSalePage")
);
const AdminSalesPage = lazy(() => import("../../pages/admin/sales/SalesPage"));
const AdminProductsAddPage = lazy(
  () => import("../../pages/admin/products/ProductsAddPage")
);
const AdminProductsPage = lazy(
  () => import("../../pages/admin/products/ProductsPage")
);
const AdminDashboardPage = lazy(
  () => import("../../pages/admin/dashboard/DashboardPage")
);
const TsexesTransactions = lazy(
  () => import("../../pages/superadmin/tsexes/TsexesTransactions")
);
const CustomerTransactionDetails = lazy(
  () => import("../../pages/superadmin/customers/CustomerTransactionDetails")
);
const CustomersTransactionPage = lazy(
  () => import("../../pages/superadmin/customers/CustomerTransactionsPage")
);
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
const ProductDetailPage = lazy(
  () => import("../../pages/superadmin/products/ProductDetailPage")
);
const ProductsPage = lazy(
  () => import("../../pages/superadmin/products/ProductsPage")
);
const ShopsPage = lazy(() => import("../../pages/superadmin/shops/ShopsPage"));
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
                  children: [{ path: ":id", element: <ProductDetailPage /> }],
                },
                {
                  path: "shops",
                  element: <ShopsPage />,
                },
                {
                  path: "tsexes",
                  element: <TsexesPage />,
                  children: [
                    {
                      path: "transactions/:id",
                      element: <TsexesTransactions />,
                    },
                  ],
                },
                {
                  path: "customers",
                  children: [
                    {
                      index: true,
                      element: <CustomersPage />,
                    },
                    {
                      path: "transaction/:id",
                      element: <CustomersTransactionPage />,
                      children: [
                        {
                          path: "detail/:id",
                          element: <CustomerTransactionDetails />,
                        },
                      ],
                    },
                  ],
                },
                {
                  path: "users",
                  element: <UsersPage />,
                },
                {
                  path: "reports",
                  element: <ReportsPage />,
                  children: [
                    {
                      path: "sale",
                      element: <SalesReportPage />,
                      children: [
                        {
                          path: ":id",
                          element: <SaleItemReportPage />,
                        },
                      ],
                    },
                    {
                      path: "products",
                      element: <ProductsReportPage />,
                    },
                    {
                      path: "tsexes",
                      element: <TsexesReportPage />,
                    },
                    {
                      path: "customers",
                      element: <CustomersReportPage />,
                    },
                  ],
                },
                {
                  path: "settings",
                  element: <SettingsPage />,
                },
              ],
            },
            {
              path: "admin",
              element: <AdminGuard allowedRoles={["superadmin", "admin"]} />,
              children: [
                {
                  index: true,
                  element: <AdminDashboardPage />,
                },
                {
                  path: "products",
                  element: <AdminProductsPage />,
                  children: [
                    { path: "add", element: <AdminProductsAddPage /> },
                    { path: ":id", element: <ProductDetailPage /> },
                  ],
                },
                {
                  path: "sales",
                  element: <AdminSalesPage />,
                  children: [
                    { path: "add", element: <AdminAddSalePage /> },
                    {
                      path: ":id",
                      element: <SaleItemReportPage />,
                    },
                  ],
                },
                {
                  path: "customers",
                  element: <AdminCustomersPage />,
                },
                {
                  path: "tsexes",
                  element: <AdminTsexesPage />,
                },
                {
                  path: "reports",
                  element: <AdminReportsPage />,
                },
                {
                  path: "settings",
                  element: <AdminSettingsPage />,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
  return routes;
};

export default memo(Router);

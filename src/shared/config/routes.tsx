import {
  ChartBar,
  LayoutDashboard,
  Package,
  Repeat,
  Settings,
  ShoppingBag,
  Store,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";

export interface SidebarNavItem {
  id: number;
  to: string;
  label?: string;
  icon?: ReactNode;
}

export const SuperadminSidebarNavigation: SidebarNavItem[] = [
  {
    id: 1,
    to: "/superadmin",
    label: "Boshqaruv paneli",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    id: 2,
    to: "/superadmin/products",
    label: "Mahsulotlar",
    icon: <Package className="w-5 h-5" />,
  },
  {
    id: 3,
    to: "/superadmin/shops",
    label: "Do'konlar",
    icon: <Store className="w-5 h-5" />,
  },
  {
    id: 4,
    to: "/superadmin/tsexes",
    label: "Tsexlar",
    icon: <Repeat className="w-5 h-5" />,
  },
  {
    id: 5,
    to: "/superadmin/customers",
    label: "Mijozlar",
    icon: <Users className="w-5 h-5" />,
  },
  {
    id: 6,
    to: "/superadmin/users",
    label: "Foydalanuvchilar",
    icon: <Users className="w-5 h-5" />,
  },
  {
    id: 7,
    to: "/superadmin/reports/sale",
    label: "Hisobotlar",
    icon: <ChartBar className="w-5 h-5" />,
  },
  {
    id: 8,
    to: "/superadmin/settings",
    label: "Sozlamalar",
    icon: <Settings className="w-5 h-5" />,
  },
];

export const AdminSidebarNavigation: SidebarNavItem[] = [
  {
    id: 1,
    to: "/admin",
    label: "Boshqaruv Paneli",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    id: 2,
    to: "/admin/products",
    label: "Mahsulotlar",
    icon: <Package className="w-5 h-5" />,
  },
  {
    id: 3,
    to: "/admin/sales",
    label: "Sotuvlar",
    icon: <ShoppingBag className="w-5 h-5" />,
  },
  {
    id: 4,
    to: "/admin/customers",
    label: "Mijozlar",
    icon: <Users className="w-5 h-5" />,
  },
  {
    id: 5,
    to: "/admin/tsexes",
    label: "Tsexlar",
    icon: <Repeat className="w-5 h-5" />,
  },
  {
    id: 6,
    to: "/admin/reports",
    label: "Hisobotlar",
    icon: <ChartBar className="w-5 h-5" />,
  },
  {
    id: 7,
    to: "/admin/settings",
    label: "Sozlamalar",
    icon: <Settings className="w-5 h-5" />,
  },
];

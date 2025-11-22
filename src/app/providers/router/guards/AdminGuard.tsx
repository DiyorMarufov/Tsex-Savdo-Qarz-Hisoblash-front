import { memo, type FC } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  allowedRoles: string[];
}

const AdminGuard: FC<Props> = ({ allowedRoles }) => {
  const token = useSelector((state: RootState) => state.setToken.token);
  if (!token) return <Navigate to="/login" replace />;
  
  const decoded = jwtDecode<{ id: number; role: string }>(token as any);
  const { role } = decoded;
  const hasAccess = allowedRoles.includes(role);

  if (!hasAccess) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default memo(AdminGuard);
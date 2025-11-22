import { memo } from "react";
import type { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const NavigateToRole = () => {
  const token = useSelector((state: RootState) => state.setToken.token);
  const decoded = jwtDecode<{ id: number; role: string }>(token as string);
  const { role } = decoded;

  if (role === "superadmin") return <Navigate to="/superadmin" replace />;
  if (role === "admin") return <Navigate to="/admin" replace />;

  return <Navigate to="/login" replace />;
};

export default memo(NavigateToRole);

import { memo } from "react";
import type { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const NavigateToRole = () => {
  const token = useSelector((state: RootState) => state.setToken.token);

  if (!token) return <Navigate replace to="/login" />;

  let decoded: { role: string } | null = null;
  try {
    decoded = jwtDecode<{ role: string }>(token);
  } catch (e) {
    return <Navigate to="/login" replace />;
  }

  if (decoded.role === "superadmin")
    return <Navigate to="/superadmin" replace />;
  if (decoded.role === "admin") return <Navigate to="/admin" replace />;

  return <Navigate to="/login" replace />;
};

export default memo(NavigateToRole);

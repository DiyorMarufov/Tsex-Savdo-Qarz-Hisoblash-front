import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../../../store";
import Loader from "../../../../shared/ui/Loader/Loader";
import { setToken } from "../../../../features/auth/model/authModel";
import { useUser } from "../../../../features/auth/api/useAuth/useUser";

const AuthGuard = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.setToken.token);
  const { getUser } = useUser();
  const { data: user, isLoading, isError } = getUser();

  if (!token) return <Navigate replace to="/login" />;

  useEffect(() => {
    if (isError) {
      dispatch(setToken(null));
    }
  }, [isError, dispatch]);

  if (isLoading) return <Loader />;

  if (isError || !user) return <Navigate replace to="/login" />;

  return <Outlet />;
};

export default memo(AuthGuard);
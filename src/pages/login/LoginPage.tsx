import { memo } from "react";
import LoginForm from "../../features/auth/ui/LoginForm";

const LoginPage = () => {
  return <div>{<LoginForm />}</div>;
};

export default memo(LoginPage);

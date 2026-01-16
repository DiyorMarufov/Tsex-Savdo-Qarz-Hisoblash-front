import { memo } from "react";
import logo from "../../shared/assets/logo/Background.svg";
import { useNavigate } from "react-router-dom";
import { HeaderBell } from "../admin/notification/NotificationComponent";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { jwtDecode } from "jwt-decode";
import { useWarning } from "../../shared/lib/apis/warnings/useWarning";

const Header = () => {
  const navigate = useNavigate();

  const token = useSelector((state: RootState) => state.setToken.token);
  const { role } = jwtDecode<{ role: string }>(token as string);

  const { getActiveWarnings } = useWarning();
  const { data: allActiveWarnings } = getActiveWarnings();
  const activeWarnings = allActiveWarnings?.data;

  return (
    <div className="flex w-full">
      <div className="w-full flex justify-between items-center max-[701px]:pl-3.5 pr-3">
        <div
          className="flex items-center gap-3 select-none cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} className="w-10 h-10" alt="" />
          <span className="text-[25px] font-bold max-[250px]:text-[20px]">
            Savdo tizimi
          </span>
        </div>
        {role === "admin" && <HeaderBell data={activeWarnings} />}
      </div>
    </div>
  );
};

export default memo(Header);

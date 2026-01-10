import { memo } from "react";
import logo from "../../shared/assets/logo/Background.svg";
import { useNavigate } from "react-router-dom";
import { HeaderBell } from "../admin/notification/NotificationComponent";

const Header = () => {
  const navigate = useNavigate();

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

        <HeaderBell />
      </div>
    </div>
  );
};

export default memo(Header);

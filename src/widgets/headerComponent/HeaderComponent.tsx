import { memo } from "react";
import logo from "../../shared/assets/logo/Background.svg";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { removeToken } from "../../features/auth/model/authModel";

const Header = () => {
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(removeToken());
    window.location.replace("?");
  };

  return (
    <div className="flex justify-between w-full">
      <div className="w-full flex items-center justify-center max-[701px]:justify-start max-[701px]:pl-3.5">
        <div className="flex items-center gap-3">
          <img src={logo} className="w-10 h-10" alt="" />
          <span className="text-[25px] font-bold max-[250px]:text-[20px]">
            Savdo tizimi
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center px-3">
        <button
          onClick={handleSignOut}
          className="group flex items-center justify-center p-3 rounded-full bg-red-500 text-white hover:bg-red-600 active:scale-95 transition-all duration-200 ease-in-out border-none outline-none cursor-pointer"
        >
          <LogOut size={22} />
        </button>
      </div>
    </div>
  );
};

export default memo(Header);

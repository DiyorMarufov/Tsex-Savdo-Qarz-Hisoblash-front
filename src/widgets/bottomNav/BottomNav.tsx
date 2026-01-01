import { memo, type FC } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  items: any;
}

const BottomNav: FC<Props> = ({ items }) => {
  return (
    <div className="min-[701px]:hidden fixed bottom-2.5 left-0 w-full z-50 px-2.5">
      <div className="flex justify-between border border-bg-fy rounded-full bg-white overflow-hidden shadow-[0_25px_50px_-12px_rgba(255,255,255,0.7),0_-8px_15px_-3px_rgba(255,255,255,0.2)]">
        {items.map((link: any) => (
          <NavLink
            end
            to={link.key}
            key={link?.key}
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-blue-200!"
                  : "bg-white! text-blue-500! hover:bg-blue-50!"
              } flex items-center justify-center w-full h-[55px] rounded-[3px]`
            }
          >
            {link.icon}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default memo(BottomNav);

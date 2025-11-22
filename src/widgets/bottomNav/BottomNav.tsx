import { memo, type FC } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  items: any;
}

const BottomNav: FC<Props> = ({ items }) => {
  return (
    <div className="min-[701px]:hidden flex justify-between fixed bottom-[0.7px] left-0 w-full bg-white shadow-md z-50 px-[0.7px]">
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
  );
};

export default memo(BottomNav);

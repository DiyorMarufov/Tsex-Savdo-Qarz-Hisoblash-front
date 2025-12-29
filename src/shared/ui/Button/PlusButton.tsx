import { Plus } from "lucide-react";
import { memo, type FC } from "react";

interface PlusButtonProps {
  setOpen: () => void;
}

const PlusButton: FC<PlusButtonProps> = ({ setOpen }) => {
  return (
    <div
      className="min-[500px]:hidden fixed bottom-18 right-2.5 z-50 p-2.5 rounded-full bg-green-500 text-white shadow-2xl cursor-pointer active:scale-90 transition-transform duration-200"
      onClick={setOpen}
    >
      <Plus size={28} strokeWidth={2} />
    </div>
  );
};

export default memo(PlusButton);

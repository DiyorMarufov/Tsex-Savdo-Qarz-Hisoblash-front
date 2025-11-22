import { memo, type FC } from "react";

interface Props {
  title: string;
  className?: string;
}

const SmallTitle: FC<Props> = ({ title, className }) => {
  return (
    <p className={`font-medium text-[19px] text-[#6B7280] ${className}`}>
      {title}
    </p>
  );
};

export default memo(SmallTitle);

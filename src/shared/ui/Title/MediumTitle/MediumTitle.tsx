import { memo, type FC } from "react";

interface Props {
  title: string;
  className?: string;
}

const MediumTitle: FC<Props> = ({ title, className }) => {
  return (
    <h1 className={`text-bg-py text-[22px] font-bold ${className}`}>{title}</h1>
  );
};

export default memo(MediumTitle);

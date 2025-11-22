import { memo, type FC } from "react";

interface Props {
  title: string;
  className?: string;
}

const LargeTitle: FC<Props> = ({ title, className = "" }) => {
  return (
    <h1 className={`text-bg-py text-[28px] font-bold ${className}`}>{title}</h1>
  );
};

export default memo(LargeTitle);

import { Button } from "antd";
import { memo, type FC, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

const ButtonComp: FC<Props> = ({
  children,
  className = "",
  variant,
  ...rest
}) => {
  return (
    <Button
      className={`px-7! py-5! bg-green-500! text-white! rounded-2xl! ${className}`}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default memo(ButtonComp);

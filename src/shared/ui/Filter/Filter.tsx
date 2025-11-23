import { Select } from "antd";
import { memo, type FC } from "react";

interface Props {
  placeholder: string;
  className?: string;
}

const Filter: FC<Props> = ({ placeholder, className = "" }) => {
  return <Select placeholder={placeholder} className={className} />;
};

export default memo(Filter);

import { Select } from "antd";
import { memo, type FC } from "react";

interface Props {
  placeholder: string;
  options?: any;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const Filter: FC<Props> = ({
  placeholder,
  options,
  value,
  onChange,
  className = "",
}) => {
  return (
    <Select
      placeholder={placeholder}
      className={className}
      options={options}
      value={value}
      onChange={(e) => onChange && onChange(e)}
    />
  );
};

export default memo(Filter);

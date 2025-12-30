import { Select } from "antd";
import { memo, type FC } from "react";

interface Props {
  placeholder: string;
  options?: any;
  value?: string;
  onChange?: (value: string) => void;
  [key: string]: any;
}

const Filter: FC<Props> = ({
  placeholder,
  options,
  value,
  onChange,
  ...rest
}) => {
  return (
    <Select
      placeholder={placeholder}
      options={options}
      value={value}
      onChange={(e) => onChange && onChange(e)}
      {...rest}
    />
  );
};

export default memo(Filter);

import { Input } from "antd";
import { Search } from "lucide-react";
import { memo, type FC } from "react";

interface Props {
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const SearchInput: FC<Props> = ({
  placeholder,
  value,
  onChange,
  className = "",
}) => {
  return (
    <Input
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      prefix={<Search className="mr-1.5" />}
    />
  );
};

export default memo(SearchInput);

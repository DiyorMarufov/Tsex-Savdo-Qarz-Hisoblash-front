import { Input } from "antd";
import { Search } from "lucide-react";
import { memo, type FC } from "react";

interface Props {
  placeholder: string;
  className?: string;
}

const SearchInput: FC<Props> = ({ placeholder, className = "" }) => {
  return (
    <Input
      placeholder={placeholder}
      className={`${className}`}
      prefix={<Search className="mr-1.5"/>}
    />
  );
};

export default memo(SearchInput);

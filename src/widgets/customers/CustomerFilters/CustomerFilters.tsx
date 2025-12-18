import { memo } from "react";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import { Select } from "antd";
import type { Option } from "../../../shared/lib/types";

interface CustomerFiltersProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  regionValue?: string;
  onRegionChange?: (value: string) => void;
  regionOptions: Option[];
}

const CustomerFilters = ({
  searchValue,
  onSearchChange,
  regionValue,
  onRegionChange,
  regionOptions,
}: CustomerFiltersProps) => {
  return (
    <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] mt-6 p-3.5 flex items-center gap-3 max-[960px]:flex-wrap">
      <SearchInput
        placeholder="Mijoz nomi yoki telefon raqami bo'yicha qidirish"
        className="h-12! bg-bg-ty! text-[17px]!"
        value={searchValue}
        onChange={onSearchChange}
      />
      <div className="max-[960px]:w-full">
        <Select
          className="h-12! bg-bg-ty! text-[17px]! w-[300px] max-[960px]:w-full!"
          placeholder="Viloyat/Shahar"
          allowClear
          value={regionValue}
          onChange={onRegionChange}
          options={[
            { value: "", label: "Barcha shaharlar/viloyatlar" },
            ...regionOptions,
          ]}
        />
      </div>
    </div>
  );
};

export default memo(CustomerFilters);

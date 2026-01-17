import { memo } from "react";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import type { Option } from "../../../shared/lib/types";
import Filter from "../../../shared/ui/Filter/Filter";

interface CustomerFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  regionValue?: string;
  onFilterChange: (key: string, value: string) => void;
  regionOptions: Option[];
}

const CustomerFilters = ({
  searchValue,
  onSearchChange,
  regionValue,
  onFilterChange,
  regionOptions,
}: CustomerFiltersProps) => {
  return (
    <div
      className={`min-[500px]:mt-1 rounded-[12px] border border-e-bg-fy bg-[#ffffff] p-3.5 flex items-center gap-3 max-[1100px]:flex-wrap`}
    >
      <SearchInput
        placeholder="Mijoz nomi yoki telefon raqami bo'yicha qidirish"
        className="h-10! min-[1100px]:w-[50%]! bg-bg-ty! text-[16px]!"
        value={searchValue}
        onChange={onSearchChange}
      />
      <div className="flex gap-3 min-[1100px]:w-[50%] w-full items-center">
        <Filter
          showSearch
          className="h-10! bg-bg-ty! text-[14px]! w-full min-[1100px]:w-[50%]! custom-select"
          placeholder="Barcha hududlar"
          value={regionValue}
          onChange={(val) => onFilterChange("region", val)}
          options={regionOptions}
          filterOption={(input: any, option: any) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
      </div>
    </div>
  );
};

export default memo(CustomerFilters);

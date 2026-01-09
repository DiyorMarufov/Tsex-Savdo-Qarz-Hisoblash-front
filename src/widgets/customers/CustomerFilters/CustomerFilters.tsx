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
  statusOptions: Option[];
  statusValue?: string;
  isSuperadmin?: boolean;
}

const CustomerFilters = ({
  searchValue,
  onSearchChange,
  regionValue,
  onFilterChange,
  regionOptions,
  statusOptions,
  statusValue,
  isSuperadmin = true,
}: CustomerFiltersProps) => {
  return (
    <div
      className={`rounded-[12px] border border-e-bg-fy bg-[#ffffff] ${isSuperadmin ? "mt-4" : "mt-2"}  p-3.5 flex items-center gap-3 max-[1100px]:flex-wrap`}
    >
      <SearchInput
        placeholder="Mijoz nomi yoki telefon raqami bo'yicha qidirish"
        className="h-11! min-[1100px]:w-[50%]! bg-bg-ty! text-[16px]!"
        value={searchValue}
        onChange={onSearchChange}
      />
      <div className="flex gap-3 min-[1100px]:w-[50%] w-full flex-nowrap items-center max-[370px]:flex-wrap">
        <Filter
          className="h-10! bg-bg-ty! text-[14px]! w-full min-[1100px]:w-[50%]! custom-select flex-1"
          placeholder="Barcha hududlar"
          value={regionValue}
          onChange={(val) => onFilterChange("region", val)}
          options={regionOptions}
        />
        <Filter
          placeholder="Barchasi"
          className="h-10! bg-bg-ty! text-[14px]! w-full min-[1100px]:w-[50%]! custom-select flex-1"
          value={statusValue}
          onChange={(val) => onFilterChange("is_archived", val)}
          options={statusOptions}
        />
      </div>
    </div>
  );
};

export default memo(CustomerFilters);

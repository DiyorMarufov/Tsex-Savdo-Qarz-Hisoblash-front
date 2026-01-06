import { memo } from "react";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import type { Option } from "../../../shared/lib/types";
import Filter from "../../../shared/ui/Filter/Filter";

interface CustomerFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  regionValue: string;
  onRegionChange: (key: string, value: string) => void;
  regionOptions: Option[];
  isSuperadmin?: boolean;
}

const CustomerFilters = ({
  searchValue,
  onSearchChange,
  regionValue,
  onRegionChange,
  regionOptions,
  isSuperadmin = true,
}: CustomerFiltersProps) => {
  return (
    <div
      className={`rounded-[12px] border border-e-bg-fy bg-[#ffffff] ${isSuperadmin ? "mt-4" : "mt-2"}  p-3.5 flex items-center gap-3 max-[960px]:flex-wrap`}
    >
      <SearchInput
        placeholder="Mijoz nomi yoki telefon raqami bo'yicha qidirish"
        className="h-11! bg-bg-ty! text-[17px]!"
        value={searchValue}
        onChange={onSearchChange}
      />
      <div className="max-[960px]:w-full">
        <Filter
          className="h-11! bg-bg-ty! text-[17px]! w-[300px] max-[960px]:w-full! custom-select"
          placeholder="Barcha shaharlar/viloyatlar"
          value={regionValue}
          onChange={(val) => onRegionChange("region", val)}
          options={regionOptions}
        />
      </div>
    </div>
  );
};

export default memo(CustomerFilters);

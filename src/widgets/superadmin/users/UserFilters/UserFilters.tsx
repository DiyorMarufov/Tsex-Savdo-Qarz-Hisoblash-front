import { memo } from "react";
import type { Option } from "../../../../shared/lib/types";
import SearchInput from "../../../../shared/ui/SearchInput/SearchInput";
import Filter from "../../../../shared/ui/Filter/Filter";

interface UserFiltersProps {
  localSearch: string;
  onSearchChange: (value: string) => void;
  role?: string;
  status?: string;
  roleOptions: Option[];
  statusOptions: Option[];
  onFilterChange: (key: "role" | "status", value: string) => void;
}

const UserFilters = ({
  localSearch,
  onSearchChange,
  role,
  status,
  roleOptions,
  statusOptions,
  onFilterChange,
}: UserFiltersProps) => {
  return (
    <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] p-3.5 flex items-center gap-3 max-[900px]:flex-wrap">
      <SearchInput
        placeholder="Ismi yoki telefon raqami bo'yicha qidirish"
        className="h-10! min-[900px]:w-[50%]! bg-bg-ty! text-[17px]!"
        value={localSearch}
        onChange={onSearchChange}
      />
      <div className="flex gap-3 min-[900px]:w-[50%] max-[900px]:w-full max-[370px]:flex-wrap">
        <Filter
          placeholder="Barcha rollar"
          className="h-10! min-[900px]:w-[50%]! max-[900px]:w-full! custom-select"
          options={roleOptions}
          value={role}
          onChange={(val) => onFilterChange("role", val)}
        />
        <Filter
          placeholder="Barcha statuslar"
          className="h-10! min-[900px]:w-[50%]! max-[900px]:w-full! custom-select"
          options={statusOptions}
          value={status}
          onChange={(val) => onFilterChange("status", val)}
        />
      </div>
    </div>
  );
};

export default memo(UserFilters);

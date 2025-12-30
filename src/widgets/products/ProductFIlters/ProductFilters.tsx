import { memo } from "react";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import Filter from "../../../shared/ui/Filter/Filter";
import type { Option } from "../../../shared/lib/types";

interface ProductFiltersProps {
  localSearch: string;
  onSearchChange: (value: string) => void;
  shopId?: string;
  tsexId?: string;
  shopsOptions: Option[];
  tsexesOptions: Option[];
  onFilterChange: (key: "shopId" | "tsexId", value: string) => void;
  setIsTsexOpen: (open: boolean) => void;
  setIsShopOpen: (open: boolean) => void;
  tsexLoading: boolean;
  shopLoading: boolean;
}

const ProductFilters = ({
  localSearch,
  onSearchChange,
  shopId,
  tsexId,
  shopsOptions,
  tsexesOptions,
  onFilterChange,
  setIsTsexOpen,
  setIsShopOpen,
  tsexLoading,
  shopLoading,
}: ProductFiltersProps) => {
  return (
    <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] mt-2 p-3.5 flex items-center gap-4 max-[900px]:flex-wrap">
      <SearchInput
        placeholder="Mahsulot nomi, brandi bo'yicha qidirish"
        className="h-12! min-[900px]:w-[50%]! bg-bg-ty! text-[16px]!"
        value={localSearch}
        onChange={onSearchChange}
      />
      <div className="flex gap-4 min-[900px]:w-[50%] max-[900px]:w-full max-[400px]:flex-wrap">
        <Filter
          placeholder="Barcha tsexlar"
          className="h-12! min-[900px]:w-[50%]! max-[900px]:w-full! custom-select"
          options={tsexesOptions}
          value={tsexId}
          onChange={(val) => onFilterChange("tsexId", val)}
          onDropdownVisibleChange={(visible: any) => {
            if (visible) setIsTsexOpen(true);
          }}
          loading={tsexLoading}
        />
        <Filter
          placeholder="Barcha do'konlar"
          className="h-12! min-[900px]:w-[50%]! max-[900px]:w-full! custom-select"
          options={shopsOptions}
          value={shopId}
          onChange={(val) => onFilterChange("shopId", val)}
          onDropdownVisibleChange={(visible: any) => {
            if (visible) setIsShopOpen(true);
          }}
          loading={shopLoading}
        />
      </div>
    </div>
  );
};

export default memo(ProductFilters);

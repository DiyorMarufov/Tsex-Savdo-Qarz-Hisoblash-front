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
    <div className="min-[500px]:mt-1 rounded-[12px] border border-e-bg-fy bg-[#ffffff] p-3.5 flex items-center gap-3 max-[900px]:flex-wrap">
      <SearchInput
        placeholder="Model nomi,brandi bo'yicha qidirish"
        className="h-10! min-[900px]:w-[50%]! bg-bg-ty! text-[16px]!"
        value={localSearch}
        onChange={onSearchChange}
      />
      <div className="flex gap-3 min-[900px]:w-[50%] max-[900px]:w-full max-[370px]:flex-wrap">
        <Filter
          placeholder={tsexLoading ? "Yuklanmoqda..." : "Barcha tsexlar"}
          className="h-10! min-[900px]:w-[50%]! max-[900px]:w-full! custom-select"
          options={tsexesOptions}
          value={tsexLoading || tsexesOptions.length <= 1 ? undefined : tsexId}
          onChange={(val) => onFilterChange("tsexId", val)}
          onDropdownVisibleChange={(visible: any) => {
            if (visible) setIsTsexOpen(true);
          }}
          loading={tsexLoading}
        />
        <Filter
          placeholder={shopLoading ? "Yuklanmoqda..." : "Barcha do'konlar"}
          className="h-10! min-[900px]:w-[50%]! max-[900px]:w-full! custom-select"
          options={shopsOptions}
          alue={shopLoading || shopsOptions.length <= 1 ? undefined : shopId}
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

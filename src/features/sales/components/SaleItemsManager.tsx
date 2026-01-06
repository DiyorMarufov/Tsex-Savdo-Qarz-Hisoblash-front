import { Select } from "antd";
import { memo } from "react";
import type { Option } from "../../../shared/lib/types";

interface SaleItemsManagerProps {
  productId?: string;
  shopId?: string;
  productOptions: Option[];
  shopOptions: Option[];
  productListLoading: boolean;
  shopListLoading: boolean;
  setIsProductOpen: (visible: boolean) => void;
  setIsShopOpen: (visible: boolean) => void;
  handleChange: (key: "shopId" | "productId", value: string[] | string) => void;
}

const SaleItemsManager = ({
  productId,
  shopId,
  productOptions,
  shopOptions,
  productListLoading,
  shopListLoading,
  setIsProductOpen,
  setIsShopOpen,
  handleChange,
}: SaleItemsManagerProps) => {
  const handleProductChange = (val: string[]) => {
    handleChange("productId", val);
  };

  return (
    <div className="flex flex-col gap-2 bg-[#ffffff] p-4 border border-bg-fy rounded-[5px] overflow-hidden">
      <div className="flex flex-col gap-1.5">
        <span className="text-[18px] text-[#232E2F] ">
          Mahsulot va do'kon malumotlari
        </span>
        <div className="flex max-[820px]:flex-col-reverse gap-3">
          <div className="flex flex-col gap-1 w-full">
            <span className="text-[16px] text-[#232E2F]">Mahsulot</span>
            <Select
              size="large"
              mode="multiple"
              value={productId ? productId.split(",").filter(Boolean) : []}
              options={productOptions}
              onChange={handleProductChange}
              placeholder={
                productListLoading
                  ? "Yuklanmoqda"
                  : `Mahsulotni qidiring yoki tanlang`
              }
              className="min-[800px]:w-full custom-select-placeholder"
              onDropdownVisibleChange={(visible) => {
                if (visible) setIsProductOpen(visible);
              }}
              loading={productListLoading}
              allowClear
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <span className="text-[16px] text-[#232E2F]">Do'kon</span>
            <Select
              value={shopListLoading ? undefined : shopId}
              options={shopOptions}
              onChange={(val) => handleChange("shopId", val)}
              placeholder={
                shopListLoading
                  ? "Yuklanmoqda"
                  : `Do'konni qidiring yoki tanlang`
              }
              className="h-10! min-[800px]:w-full"
              onDropdownVisibleChange={(visible) => {
                if (visible) setIsShopOpen(visible);
              }}
              loading={shopListLoading}
              allowClear
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SaleItemsManager);

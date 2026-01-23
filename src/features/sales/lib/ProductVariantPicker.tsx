import { Select } from "antd";
import { memo, useMemo, type FC } from "react";
import { useProduct } from "../../../shared/lib/apis/products/useProduct";
import {
  colorOptions,
  productMaterialTypes,
} from "../../../shared/lib/constants";
import CustomTagRender from "./CustomTagRender";

interface ProductVariantPickerProps {
  modelId: any;
  onVariantSelect: (variant: any) => void;
  selectedVariants: any[];
}

const ProductVariantPicker: FC<ProductVariantPickerProps> = ({
  modelId,
  onVariantSelect,
  selectedVariants = [],
}) => {
  const { getAllProductsForSaleCreate } = useProduct();
  const { data, isLoading } = getAllProductsForSaleCreate(modelId);

  const selectedProductIds = useMemo(() => {
    return selectedVariants.map((v) => v.product_id);
  }, [selectedVariants]);

  const options = useMemo(() => {
    const productsList = data?.data?.data || data?.data || [];

    return productsList.map((p: any) => {
      const findColor = colorOptions.find((color) => color.value === p.color);

      return {
        value: p.id,
        label: (
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col justify-center overflow-hidden">
              <span className="text-[13px]">
                {productMaterialTypes[p?.product_material_type?.name]}
              </span>
              <div className="flex items-center gap-1 text-[11px] text-slate-400 font-normal">
                <div className="flex items-center gap-1">
                  <span>
                    {p.color.charAt(0).toUpperCase() + p.color.slice(1)}
                  </span>
                  <div
                    className="h-3 w-3 rounded-full border border-slate-200 shrink-0 shadow-sm"
                    style={{
                      backgroundColor: findColor?.hex || "transparent",
                    }}
                  ></div>
                </div>
                {p.unit_in_package && (
                  <>
                    <span className="text-slate-300">|</span>
                    <span className="truncate">{p.unit_in_package} talik</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-0.5 shrink-0">
              <span
                className={`text-[11px] font-bold tabular-nums ${
                  p.quantity >= 10 ? "text-emerald-600" : "text-red-500"
                }`}
              >
                Qoldiq: {p.quantity} ta
              </span>
            </div>
          </div>
        ),
        displayLabel: (
          <span className="text-blue-700">
            {productMaterialTypes[p?.product_material_type?.name]} -{" "}
            {p.color.charAt(0).toUpperCase() + p.color.slice(1)}
          </span>
        ),
        original: p,
      };
    });
  }, [data, colorOptions, productMaterialTypes]);

  return (
    <div className="flex flex-col gap-1 w-full">
      <span className="text-[11px] text-slate-400 font-medium ml-1">
        Variantlarni tanlang:
      </span>
      <Select
        mode="multiple"
        placeholder="Variantni tanlang"
        loading={isLoading}
        value={selectedProductIds}
        options={options}
        optionLabelProp="displayLabel"
        className="w-full h-10! custom-select-placeholder"
        onChange={(_, opts: any) => {
          const selectedVariants = Array.isArray(opts)
            ? opts.map((o) => o.original)
            : [];
          onVariantSelect(selectedVariants);
        }}
        tagRender={(props) => <CustomTagRender props={props} />}
        filterOption={false}
        showSearch
        maxTagCount="responsive"
        allowClear
        placement="bottomLeft"
      />
    </div>
  );
};

export default memo(ProductVariantPicker);

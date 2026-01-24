import { Select } from "antd";
import { memo, useCallback, useMemo, useState, type FC } from "react";
import { useProduct } from "../../../shared/lib/apis/products/useProduct";
import {
  colorOptions,
  productColors,
  productMaterialTypes,
} from "../../../shared/lib/constants";
import CustomTagRender from "./CustomTagRender";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import type { QueryParams } from "../../../shared/lib/types";
import { debounce } from "../../../shared/lib/functions/debounce";

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
  const { getInfiniteProductsForSaleCreate } = useProduct();

  const { getParam, setParams, removeParam } = useParamsHook();
  const [, setSearchProduct] = useState(getParam("product_search") || "");

  // Query starts
  const query: QueryParams = useMemo(() => {
    const productSearch = getParam("product_search") || undefined;

    return {
      productSearch,
    };
  }, [getParam]);
  // Query ends
  const {
    data: productsData,
    isLoading: productLoading,
    hasNextPage: productHasNextPage,
    isFetchingNextPage: productIsFetchingNextPage,
    fetchNextPage: productFetchNextPage,
  } = getInfiniteProductsForSaleCreate(modelId, {
    search: query.productSearch,
  });

  // FilterSearch starts
  const debouncedSetSearchProductQuery = useCallback(
    debounce((nextValue: string) => {
      if (nextValue) {
        setParams({ product_search: nextValue, page: 1 });
      } else {
        removeParam("product_search");
      }
    }, 500),
    [setParams, removeParam],
  );

  const handleSearchProductFilterChange = (value: string) => {
    setSearchProduct(value);

    let lowerValue: string = value.toLowerCase();

    if (!lowerValue.trim()) {
      debouncedSetSearchProductQuery("");
      return;
    }

    const materialKey = Object.keys(productMaterialTypes).find((key) =>
      productMaterialTypes[key].toLowerCase().includes(lowerValue),
    );

    const colorKey = productColors[lowerValue];

    debouncedSetSearchProductQuery(materialKey || colorKey || lowerValue);
  };
  // FilterSearch ends

  const handleScroll = (e: any) => {
    const { target } = e;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
      if (productHasNextPage && !productIsFetchingNextPage) {
        productFetchNextPage();
      }
    }
  };

  const selectedProductIds = useMemo(() => {
    return selectedVariants.map((v) => v.product_id);
  }, [selectedVariants]);

  const options = useMemo(() => {
    const productsList =
      productsData?.pages.flatMap((page: any) => {
        return Array.isArray(page)
          ? page
          : page?.data?.data || page?.data || [];
      }) || [];

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
  }, [productsData, colorOptions, productMaterialTypes]);

  return (
    <div className="flex flex-col gap-1 w-full">
      <span className="text-[11px] text-slate-400 font-medium ml-1">
        Variantlarni tanlang:
      </span>
      <Select
        mode="multiple"
        onPopupScroll={handleScroll}
        placeholder="Variantni tanlang"
        loading={productLoading}
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
        onSearch={handleSearchProductFilterChange}
        onBlur={() => {
          removeParam("product_search");
        }}
        placement="bottomLeft"
        allowClear
        maxTagCount="responsive"
      />
    </div>
  );
};

export default memo(ProductVariantPicker);

import { InputNumber, Select, Spin, Tag } from "antd";
import { memo, useMemo, useState, useEffect } from "react";
import type { Option } from "../../../shared/lib/types";
import { useProduct } from "../../../shared/lib/apis/products/useProduct";
import {
  colorOptions,
  productCategories,
  productMaterialTypes,
} from "../../../shared/lib/constants";
import { Eye, EyeOff } from "lucide-react";
import { useParamsHook } from "../../../shared/hooks/params/useParams";

interface SaleItemsManagerProps {
  productId?: string;
  shopId?: string;
  productModelOptions?: any[];
  shopOptions: Option[];
  productModelListLoading?: boolean;
  productModelHasNextPage?: boolean;
  productModelIsFetchingNextPage?: boolean;
  productModelFetchNextPage?: any;
  onSearchChange?: (value: string) => void;
  shopListLoading: boolean;
  setIsShopOpen: (visible: boolean) => void;
  handleChange: (key: "shopId" | "productId", value: string[] | string) => void;
  isPriceVisible: boolean;
  setIsPriceVisible: any;
}

const SaleItemsManager = ({
  productId,
  shopId,
  productModelOptions,
  shopOptions,
  productModelListLoading,
  productModelHasNextPage,
  productModelIsFetchingNextPage,
  productModelFetchNextPage,
  onSearchChange,
  shopListLoading,
  setIsShopOpen,
  handleChange,
  isPriceVisible,
  setIsPriceVisible,
}: SaleItemsManagerProps) => {
  const [items, setItems] = useState<any[]>(() => {
    const saved = localStorage.getItem("sale_items");
    return saved ? JSON.parse(saved) : [];
  });
  const { setParams, removeParam } = useParamsHook();

  const selectedModelIds = useMemo(() => {
    return productId ? productId.split(",").filter(Boolean) : [];
  }, [productId]);

  useEffect(() => {
    setItems((prev) => {
      const filtered = prev.filter((item: any) =>
        selectedModelIds.includes(item.model_id),
      );
      selectedModelIds.forEach((id) => {
        const exists = filtered.find((item: any) => item.model_id === id);
        if (!exists) {
          const modelInfo = productModelOptions?.find(
            (opt) => opt.value === id,
          )?.originalProduct;
          filtered.push({
            model_id: id,
            model_name: modelInfo?.name || "Yuklanmoqda...",
            category_name: modelInfo?.product_category?.name || "",
            base_price: modelInfo?.price || 0,
            product_id: null,
            quantity: 1,
            price: 0,
            unit_in_package: 0,
          });
        }
      });

      localStorage.setItem("sale_items", JSON.stringify(filtered));
      if (filtered.length === 0) removeParam("product_search");
      return filtered;
    });
  }, [productId, productModelOptions, removeParam]);

  const updateItemDetails = (modelId: string, field: string, value: any) => {
    setItems((prev) => {
      const newItems = prev.map((item) =>
        item.model_id === modelId ? { ...item, [field]: value } : item,
      );
      localStorage.setItem("sale_items", JSON.stringify(newItems));
      setParams({ p_ref: Date.now().toString() });
      return newItems;
    });
  };

  const handleVariantSelect = (modelId: string, variant: any) => {
    setItems((prev) => {
      const newItems = prev.map((item) => {
        if (item.model_id === modelId) {
          if (variant) {
            return {
              ...item,
              product_id: variant.id,
              price: variant.product_model?.price || 0,
              unit_in_package: variant.unit_in_package,
              stock: variant.quantity,
              variant_data: variant,
            };
          }
          return {
            ...item,
            product_id: null,
            price: 0,
            unit_in_package: 0,
            stock: 0,
            variant_data: null,
          };
        }
        return item;
      });
      localStorage.setItem("sale_items", JSON.stringify(newItems));
      setParams({ p_ref: Date.now().toString() });
      return newItems;
    });
  };

  const handleScroll = (e: any) => {
    const { target } = e;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
      if (productModelHasNextPage && !productModelIsFetchingNextPage) {
        productModelFetchNextPage();
      }
    }
  };

  const customTagRender = (props: any) => {
    const { value, closable, onClose } = props;

    const selectedOption: any = productModelOptions?.find(
      (opt: any) => opt.value === value,
    );

    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Tag
        color="blue"
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        className="ml-px! mt-1! py-[3px]!"
      >
        {selectedOption?.displayLabel || "N+"}
      </Tag>
    );
  };

  const ProductVariantPicker = ({
    modelId,
    currentVariantId,
    onVariantSelect,
  }: any) => {
    const { getAllProductsForSaleCreate } = useProduct();
    const { data, isLoading } = getAllProductsForSaleCreate(modelId);

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
                      <span className="truncate">
                        {p.unit_in_package} talik
                      </span>
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
    }, [data]);

    return (
      <div className="flex flex-col gap-1 w-full">
        <span className="text-[11px] text-slate-400 font-medium ml-1">
          Variantni (Rang/Material) tanlang:
        </span>
        <Select
          placeholder="Variantni tanlang"
          loading={isLoading}
          value={currentVariantId}
          options={options}
          tagRender={customTagRender}
          optionLabelProp="displayLabel"
          className="w-full h-9!"
          onChange={(val, opt: any) => {
            onVariantSelect(val ? opt.original : null);
          }}
          allowClear
        />
      </div>
    );
  };
  return (
    <div className="flex flex-col gap-2 bg-[#ffffff] p-4 border border-bg-fy rounded-[5px] overflow-hidden">
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center gap-3">
          <span className="text-[18px] text-[#232E2F] font-medium">
            Mahsulot va do'kon malumotlari
          </span>
          <div
            className="cursor-pointer"
            onClick={() => setIsPriceVisible((p: boolean) => !p)}
          >
            {isPriceVisible ? (
              <Eye className="w-4.5 h-4.5" />
            ) : (
              <EyeOff className="w-4.5 h-4.5" />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex max-[1170px]:flex-col gap-3">
            <div className="flex flex-col gap-1 w-full">
              <span className="text-[16px] text-[#232E2F]">
                Mahsulot (Model)
              </span>
              <Select
                mode="multiple"
                onPopupScroll={handleScroll}
                value={selectedModelIds}
                options={productModelOptions}
                onChange={(val) => {
                  handleChange("productId", val);
                }}
                placeholder={
                  productModelListLoading ? "Yuklanmoqda..." : "Modelni tanlang"
                }
                className="min-[800px]:w-full h-10! custom-select-placeholder"
                tagRender={customTagRender}
                optionLabelProp="displayLabel"
                loading={productModelListLoading}
                showSearch
                filterOption={false}
                onSearch={onSearchChange}
                allowClear
                maxTagCount="responsive"
              />

              <Spin spinning={productModelListLoading}>
                <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto mt-3 pr-1">
                  {items.length > 0 ? (
                    items.map((model: any) => {
                      const currentItem = items.find(
                        (i) => i.model_id === model.model_id,
                      );
                      const variant = currentItem?.variant_data;
                      const findColor = colorOptions.find(
                        (c) => c.value === variant?.color,
                      );

                      return (
                        <div
                          key={model.id}
                          className="flex flex-col gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl"
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-sm font-bold text-slate-800 leading-tight">
                              {model.model_name}
                            </span>
                            <span className="text-emerald-600 font-bold text-[12px]">
                              {isPriceVisible
                                ? `${Number(model.base_price).toLocaleString()} uzs`
                                : "******"}
                            </span>
                          </div>

                          <ProductVariantPicker
                            modelId={model.model_id}
                            currentVariantId={currentItem?.product_id}
                            onVariantSelect={(v: any) =>
                              handleVariantSelect(model.model_id, v)
                            }
                          />

                          {currentItem?.product_id && (
                            <>
                              <div className="flex items-center gap-2 flex-wrap">
                                <div className="flex items-center gap-[5px] px-2 py-0.5 rounded text-[11px] font-bold bg-sky-50 text-sky-700 border border-sky-100">
                                  <span>
                                    {productCategories[model.category_name]}
                                  </span>
                                  <span className="opacity-40">|</span>
                                  <span className="capitalize">
                                    {variant?.color}
                                  </span>
                                  <div
                                    className="h-2.5 w-2.5 rounded-full border"
                                    style={{ backgroundColor: findColor?.hex }}
                                  ></div>
                                </div>
                                <div
                                  className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${currentItem.stock > 0 ? "bg-blue-50 text-blue-600" : "bg-red-50 text-red-600"}`}
                                >
                                  Qoldiq: {currentItem.stock} ta
                                </div>
                              </div>

                              <div className="flex gap-3 max-[370px]:flex-col">
                                <div className="flex-1 flex flex-col gap-1">
                                  <span className="text-[11px] text-slate-400 font-medium ml-1">
                                    Miqdori
                                  </span>
                                  <InputNumber
                                    min={1}
                                    controls={false}
                                    max={currentItem.stock}
                                    value={currentItem?.quantity}
                                    stringMode={false}
                                    onKeyPress={(e) => {
                                      if (!/[0-9]/.test(e.key)) {
                                        e.preventDefault();
                                      }
                                    }}
                                    onChange={(val) =>
                                      updateItemDetails(
                                        model.id,
                                        "quantity",
                                        val,
                                      )
                                    }
                                    className="w-full rounded-md"
                                  />
                                </div>
                                <div className="flex-1 flex flex-col gap-1">
                                  <span className="text-[11px] text-slate-400 font-medium ml-1">
                                    Sotuv narxi
                                  </span>
                                  <InputNumber
                                    min={1}
                                    controls={false}
                                    onChange={(val) =>
                                      updateItemDetails(model.id, "price", val)
                                    }
                                    className="w-full rounded-md"
                                    stringMode={false}
                                    onKeyPress={(e) => {
                                      if (!/[0-9]/.test(e.key)) {
                                        e.preventDefault();
                                      }
                                    }}
                                    formatter={(v) =>
                                      `${v}`.replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ",",
                                      )
                                    }
                                    parser={(v: any) =>
                                      v!.replace(/[^\d]/g, "")
                                    }
                                    addonAfter={
                                      <span className="text-[10px]">uzs</span>
                                    }
                                  />
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 border-2 border-dashed border-slate-100 rounded-xl text-slate-400 text-sm">
                      Hali model tanlanmagan
                    </div>
                  )}
                </div>
              </Spin>
            </div>

            <div className="flex flex-col gap-1 w-full">
              <span className="text-[16px] text-[#232E2F]">Do'kon</span>
              <Select
                value={shopId}
                options={shopOptions}
                onChange={(val) => handleChange("shopId", val)}
                placeholder={
                  shopListLoading ? "Yuklanmoqda..." : "Do'konni tanlang"
                }
                onDropdownVisibleChange={(visible) => {
                  if (visible) setIsShopOpen(visible);
                }}
                className="h-10! w-full"
                loading={shopListLoading}
                allowClear
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SaleItemsManager);

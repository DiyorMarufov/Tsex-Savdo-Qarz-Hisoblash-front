import { InputNumber, Select, Spin } from "antd";
import { memo, useMemo, useState, useEffect } from "react";
import type { Option } from "../../../shared/lib/types";
import {
  colorOptions,
  productCategories,
  productMaterialTypes,
} from "../../../shared/lib/constants";
import { Eye, EyeOff } from "lucide-react";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import CustomTagRender from "../lib/CustomTagRender";
import ProductVariantPicker from "../lib/ProductVariantPicker";

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
          });
        }
      });

      localStorage.setItem("sale_items", JSON.stringify(filtered));
      if (filtered.length === 0) removeParam("product_search");
      return filtered;
    });
  }, [productId, productModelOptions, removeParam]);

  const updateVariantDetail = (
    modelId: string,
    productId: string,
    field: string,
    value: any,
  ) => {
    setItems((prev) => {
      const newItems = prev.map((item) => {
        if (item.model_id === modelId) {
          const updatedVariants = item.selected_variants.map((v: any) =>
            v.product_id === productId ? { ...v, [field]: value } : v,
          );
          return { ...item, selected_variants: updatedVariants };
        }
        return item;
      });
      localStorage.setItem("sale_items", JSON.stringify(newItems));
      setParams({ p_ref: Date.now().toString() });
      return newItems;
    });
  };

  const handleVariantSelect = (modelId: string, variants: any[]) => {
    setItems((prev) => {
      const newItems = prev.map((item) => {
        if (item.model_id === modelId) {
          const currentVariants = item.selected_variants || [];

          const updatedVariants = variants.map((v) => {
            const existing = currentVariants.find(
              (ev: any) => ev.product_id === v.id,
            );
            if (existing) return existing;
            return {
              product_id: v.id,
              price: v.product_model?.price || 0,
              quantity: 1,
              stock: v.quantity,
              color: v.color,
              unit_in_package: v.unit_in_package,
              variant_details: v,
            };
          });
          return {
            ...item,
            selected_variants: updatedVariants,
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
                tagRender={(props) => <CustomTagRender props={props} />}
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

                      return (
                        <div
                          key={model?.model_id}
                          className="flex flex-col gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-slate-800 leading-tight">
                                {model?.model_name}
                              </span>
                              <span className="text-[12px] text-slate-600">
                                {productCategories[model?.category_name]}
                              </span>
                            </div>
                            <span className="text-emerald-600 font-bold text-[13px]">
                              {isPriceVisible
                                ? `${Number(model?.base_price).toLocaleString()} uzs`
                                : "******"}
                            </span>
                          </div>

                          <ProductVariantPicker
                            modelId={model?.model_id}
                            selectedVariants={
                              currentItem?.selected_variants || []
                            }
                            onVariantSelect={(v: any) =>
                              handleVariantSelect(model?.model_id, v)
                            }
                          />

                          <div className="flex flex-col gap-3">
                            {model.selected_variants?.map((v: any) => (
                              <div
                                key={v.product_id}
                                className="p-3 bg-white border border-bg-fy rounded-lg"
                              >
                                <div className="flex justify-between items-center mb-1.5">
                                  <div className="flex flex-col">
                                    <span className="text-[13px] font-medium text-slate-700 leading-tight">
                                      {
                                        productMaterialTypes[
                                          v?.variant_details
                                            ?.product_material_type?.name
                                        ]
                                      }
                                    </span>

                                    <div className="flex items-center gap-1 text-slate-400">
                                      <div className="flex items-center gap-1">
                                        <span className="text-[11px] capitalize">
                                          {v.color}
                                        </span>
                                        <div
                                          className="w-3 h-3 rounded-full border border-slate-200 shrink-0"
                                          style={{
                                            backgroundColor:
                                              colorOptions.find(
                                                (c) => c.value === v.color,
                                              )?.hex || "#eee",
                                          }}
                                        ></div>
                                      </div>

                                      <span className="text-[10px] opacity-70">
                                        |
                                      </span>

                                      <span className="text-[11px] font-normal">
                                        {v.unit_in_package} talik
                                      </span>
                                    </div>
                                  </div>
                                  <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                                    Qoldiq: {v.stock} ta
                                  </span>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                  <div className="flex flex-col gap-1">
                                    <span className="text-[11px] text-slate-400">
                                      Miqdori
                                    </span>
                                    <InputNumber
                                      min={1}
                                      max={v.stock}
                                      value={v.quantity}
                                      onChange={(val) =>
                                        updateVariantDetail(
                                          model.model_id,
                                          v.product_id,
                                          "quantity",
                                          val,
                                        )
                                      }
                                      controls={false}
                                      stringMode={false}
                                      onKeyPress={(e) => {
                                        if (!/[0-9]/.test(e.key)) {
                                          e.preventDefault();
                                        }
                                      }}
                                      className="w-full"
                                    />
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    <span className="text-[11px] text-slate-400">
                                      Sotuv narxi
                                    </span>
                                    <InputNumber
                                      min={0}
                                      value={v.price}
                                      formatter={(v) =>
                                        `${v}`.replace(
                                          /\B(?=(\d{3})+(?!\d))/g,
                                          ",",
                                        )
                                      }
                                      parser={(v: any) =>
                                        v!.replace(/[^\d]/g, "")
                                      }
                                      onChange={(val) =>
                                        updateVariantDetail(
                                          model.model_id,
                                          v.product_id,
                                          "price",
                                          val,
                                        )
                                      }
                                      controls={false}
                                      stringMode={false}
                                      onKeyPress={(e) => {
                                        if (!/[0-9]/.test(e.key)) {
                                          e.preventDefault();
                                        }
                                      }}
                                      className="w-full"
                                      addonAfter={
                                        <span className="text-[10px]">uzs</span>
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
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

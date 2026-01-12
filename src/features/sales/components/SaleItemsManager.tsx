import { InputNumber, Select, Spin } from "antd";
import { memo, useMemo, useState, useEffect } from "react";
import type { Option } from "../../../shared/lib/types";
import type { SelectProps } from "antd/es/select";
import { useProduct } from "../../../shared/lib/apis/products/useProduct";

type TagRenderType = SelectProps["tagRender"];

interface SaleItemsManagerProps {
  productId?: string;
  shopId?: string;
  productOptions: Option[];
  shopOptions: Option[];
  productListLoading: boolean;
  productHasNextPage?: boolean;
  productIsFetchingNextPage?: boolean;
  productFetchNextPage?: any;
  onSearchChange?: (value: string) => void;
  shopListLoading: boolean;
  setIsProductOpen: (visible: boolean) => void;
  setIsShopOpen: (visible: boolean) => void;
  handleChange: (key: "shopId" | "productId", value: string[] | string) => void;
  tagRender: TagRenderType;
}

const SaleItemsManager = ({
  productId,
  shopId,
  productOptions,
  shopOptions,
  productListLoading,
  productHasNextPage,
  productIsFetchingNextPage,
  productFetchNextPage,
  onSearchChange,
  shopListLoading,
  setIsProductOpen,
  setIsShopOpen,
  handleChange,
  tagRender,
}: SaleItemsManagerProps) => {
  const { getInfiniteProducts } = useProduct();
  const { data: productsData } = getInfiniteProducts(true);

  const [items, setItems] = useState<any[]>(() => {
    const saved = localStorage.getItem("sale_items");
    return saved ? JSON.parse(saved) : [];
  });

  const selectedIds = useMemo(() => {
    return productId ? productId.split(",").filter(Boolean) : [];
  }, [productId]);

  const selectedProducts = useMemo(() => {
    if (!productOptions) return [];

    return selectedIds
      .map((id) => {
        const option: any = productOptions.find((opt) => opt.value === id);
        return option?.originalProduct || null;
      })
      .filter(Boolean);
  }, [selectedIds, productOptions]);

  useEffect(() => {
    const saved = localStorage.getItem("sale_items");
    let currentSaved = saved ? JSON.parse(saved) : [];

    let filtered = currentSaved.filter((item: any) =>
      selectedIds.includes(item.product_id)
    );

    selectedIds.forEach((id) => {
      const exists = filtered.find((item: any) => item.product_id === id);
      if (!exists) {
        const option: any = productOptions.find((opt) => opt.value === id);
        const product = option?.originalProduct;
        filtered.push({
          product_id: id,
          quantity: 1,
          price: product?.price || 0,
          unit_in_package: product?.unit_in_package,
        });
      }
    });
    localStorage.setItem("sale_items", JSON.stringify(filtered));
    setItems(filtered);
  }, [productId, productsData]);

  const updateItemDetails = (
    id: string,
    field: "quantity" | "price",
    value: number | null
  ) => {
    setItems((prev) => {
      const newItems = prev.map((item) =>
        item.product_id === id ? { ...item, [field]: value } : item
      );
      localStorage.setItem("sale_items", JSON.stringify(newItems));
      return newItems;
    });

    handleChange("productId", productId || "");
  };

  const handleScroll = (e: any) => {
    const { target } = e;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
      if (productHasNextPage && !productIsFetchingNextPage) {
        productFetchNextPage();
      }
    }
  };
  return (
    <div className="flex flex-col gap-2 bg-[#ffffff] p-4 border border-bg-fy rounded-[5px] overflow-hidden">
      <div className="flex flex-col gap-1.5">
        <span className="text-[18px] text-[#232E2F] font-medium">
          Mahsulot va do'kon malumotlari
        </span>
        <div className="flex flex-col gap-3">
          <div className="flex max-[820px]:flex-col gap-3">
            <div className="flex flex-col gap-1 w-full">
              <span className="text-[16px] text-[#232E2F]">Mahsulot</span>
              <Select
                mode="multiple"
                onPopupScroll={handleScroll}
                value={selectedIds}
                options={productOptions}
                onChange={(val) => handleChange("productId", val)}
                placeholder={
                  productListLoading ? "Yuklanmoqda..." : "Mahsulotni tanlang"
                }
                className="min-[800px]:w-full h-10! custom-select-placeholder"
                onDropdownVisibleChange={(v) => setIsProductOpen(v)}
                dropdownRender={(menu: any) => (
                  <>
                    {menu}
                    {productIsFetchingNextPage && (
                      <span className="text-[12px] text-gray-500">
                        Yuklanmoqda...
                      </span>
                    )}
                  </>
                )}
                loading={productListLoading}
                tagRender={tagRender}
                showSearch
                filterOption={false}
                onSearch={onSearchChange}
                allowClear
              />

              <Spin spinning={productListLoading}>
                <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto mt-3 pr-1">
                  {selectedProducts.length > 0 ? (
                    selectedProducts.map((product: any) => {
                      const currentItem = items.find(
                        (i) => i.product_id === product.id
                      );
                      return (
                        <div
                          key={product.id}
                          className="flex flex-col gap-3 p-4 bg-slate-50 border border-slate-100 rounded-xl"
                        >
                          <div className="flex justify-between items-start gap-3 max-[540px]:flex-col ">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-slate-800 leading-tight">
                                {product.name}
                              </span>
                              <span className="text-[11px] text-slate-500 font-semibold">
                                {product.brand}
                              </span>
                            </div>
                            <div className="flex min-[480px]:items-center gap-3 mt-1 max-[480px]:flex-col">
                              <div className="flex gap-3 min-[385px]:items-center max-[385px]:flex-col">
                                <div
                                  className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide border max-[385px]:w-fit
                                        ${
                                          product.quantity > 10
                                            ? "bg-blue-50 text-blue-600 border-blue-100"
                                            : product.quantity > 0
                                              ? "bg-orange-50 text-orange-600 border-orange-100"
                                              : "bg-red-50 text-red-600 border-red-100"
                                        }`}
                                >
                                  <span className="relative flex h-2 w-2">
                                    {product.quantity > 0 &&
                                      product.quantity <= 10 && (
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                      )}
                                    <span
                                      className={`relative inline-flex rounded-full h-2 w-2 ${
                                        product.quantity > 10
                                          ? "bg-blue-500"
                                          : product.quantity > 0
                                            ? "bg-orange-500"
                                            : "bg-red-500"
                                      }`}
                                    ></span>
                                  </span>
                                  Qoldiq: {product.quantity} ta
                                </div>

                                <div className="flex items-center gap-1 px-2 py-0.5 rounded text-[12px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                                  <span className="text-[11px] opacity-60">
                                    Asl narxi:
                                  </span>
                                  {Number(product.price).toLocaleString()}{" "}
                                  <span className="text-[11px]">uzs</span>
                                </div>
                              </div>

                              <div className="flex gap-1 px-2 py-0.5 rounded text-[12px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 max-[480px]:w-fit">
                                <span className="text-[11px] opacity-60 font-semibold tracking-tight">
                                  Pochkada:
                                </span>
                                {product.unit_in_package}{" "}
                                <span className="text-[11px]">ta</span>
                              </div>
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
                                value={currentItem?.quantity ?? 1}
                                stringMode={false}
                                onKeyPress={(e) => {
                                  if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                                onChange={(val) =>
                                  updateItemDetails(product.id, "quantity", val)
                                }
                                className="w-[75px]! rounded-md max-[370px]:w-full!"
                              />
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                              <span className="text-[11px] text-slate-400 font-medium ml-1">
                                Sotuv narxi
                              </span>
                              <InputNumber
                                min={1}
                                controls={false}
                                value={currentItem?.price ?? product.price}
                                stringMode={false}
                                onKeyPress={(e) => {
                                  if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                                onChange={(val) =>
                                  updateItemDetails(product.id, "price", val)
                                }
                                className="w-full rounded-md"
                                formatter={(v) =>
                                  `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }
                                parser={(v) => v!.replace(/[^\d]/g, "")}
                                addonAfter={
                                  <span className="text-[10px]">uzs</span>
                                }
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 border-2 border-dashed border-slate-100 rounded-xl text-slate-400 text-sm">
                      Hali mahsulot tanlanmagan
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
                className="h-10! w-full"
                onDropdownVisibleChange={(v) => setIsShopOpen(v)}
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

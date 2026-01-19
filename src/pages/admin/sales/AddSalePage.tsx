import { memo, useCallback, useEffect, useMemo, useState } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import { Button } from "antd";
import { ArrowLeft, Save } from "lucide-react";
import ClientInfoForm from "../../../features/sales/components/ClientInfoForm";
import SaleItemsManager from "../../../features/sales/components/SaleItemsManager";
import PaymentAndSummary from "../../../features/sales/components/PaymentAndSummary";
import { useNavigate } from "react-router-dom";
import { useCustomer } from "../../../shared/lib/apis/customers/useCustomer";
import type { Option, QueryParams } from "../../../shared/lib/types";
import { formatPhoneNumber } from "../../../shared/lib/functions/formatPhoneNumber";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import { useProduct } from "../../../shared/lib/apis/products/useProduct";
import { useShop } from "../../../shared/lib/apis/shops/useShop";
import { base64ToFile } from "../../../shared/lib/functions/base64ToFile";
import { useSale } from "../../../shared/lib/apis/sales/useSale";
import { useApiNotification } from "../../../shared/hooks/api-notification/useApiNotification";
import { debounce } from "../../../shared/lib/functions/debounce";
import {
  colorOptions,
  productCategories,
  productMaterialTypes,
} from "../../../shared/lib/constants";

const AdminAddSalePage = () => {
  const navigate = useNavigate();
  const [isCustomerOpen, setIsCustomerOpen] = useState<boolean>(false);
  const [isProductOpen, setIsProductOpen] = useState<boolean>(false);
  const [isShopOpen, setIsShopOpen] = useState<boolean>(false);
  const [isPriceVisible, setIsPriceVisible] = useState<boolean>(false);
  const { getInfiniteCustomers } = useCustomer();
  const { getInfiniteProducts } = useProduct();
  const { getAllShopsForProductsFilter } = useShop();
  const { createSale } = useSale();

  const { getParam, setParams, removeParams } = useParamsHook();
  const [, setCustomerModalSearch] = useState(
    getParam("customer_search") || "",
  );
  const [, setProductFilterSearch] = useState(getParam("product_search") || "");
  const { handleApiError } = useApiNotification();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  // Query starts
  const query: QueryParams = useMemo(() => {
    const customerId = getParam("customerId") || undefined;
    const shopId = getParam("shopId") || undefined;

    const savedData = localStorage.getItem("selected_product_ids");
    const productIdArray: string[] = savedData ? JSON.parse(savedData) : [];
    const productId =
      productIdArray.length > 0 ? productIdArray.join(",") : undefined;
    const customerFilterSearch = getParam("customer_search") || undefined;
    const productFilterSearch = getParam("product_search") || undefined;

    return {
      customerId,
      shopId,
      productId,
      customerFilterSearch,
      productFilterSearch,
    };
  }, [getParam]);
  // Query ends

  // FilterSearch starts
  const debouncedSetSearchCustomerModalQuery = useCallback(
    debounce((nextValue: string) => {
      setParams({
        customer_search: nextValue || "",
        page: 1,
      });
    }, 500),
    [setParams],
  );

  const debouncedSetSearchProductFilterQuery = useCallback(
    debounce((nextValue: string) => {
      setParams({
        product_search: nextValue || "",
        page: 1,
      });
    }, 500),
    [setParams],
  );

  const handleSearchCustomerModalChange = (value: string) => {
    setCustomerModalSearch(value);
    debouncedSetSearchCustomerModalQuery(value);
  };

  const handleSearchProductFilterChange = (value: string) => {
    setProductFilterSearch(value);
    debouncedSetSearchProductFilterQuery(value);
  };
  // FilterSearch ends

  // HanldeChangeSelect starts
  const handleChange = (
    key: "customerId" | "productId" | "shopId",
    value: string | string[],
  ) => {
    if (key === "productId") {
      const savedData = localStorage.getItem("selected_product_ids");

      let existingIds: string[] = [];
      try {
        existingIds = savedData ? JSON.parse(savedData) : [];
      } catch (e) {
        existingIds = [];
      }

      const newValues = Array.isArray(value) ? value : [value];

      let finalValues =
        existingIds.length !== newValues.length ? newValues : existingIds;

      localStorage.setItem("selected_product_ids", JSON.stringify(finalValues));

      setParams({ p_ref: Date.now().toString() });
      return;
    }

    setParams({ [key]: value as string });
  };
  // HanldeChangeSelect ends

  // Options start
  const shouldFetchCustomers = isCustomerOpen || !!query.customerId;
  const {
    data: allCustomersList,
    isLoading: customerListLoading,
    fetchNextPage: customerFetchNextPage,
    hasNextPage: customerHasNextPage,
    isFetchingNextPage: customerIsFetchingNextPage,
  } = getInfiniteCustomers(shouldFetchCustomers, {
    search: query.customerFilterSearch,
  });
  const customerOptions: Option[] = (
    allCustomersList?.pages?.flatMap((page: any) => {
      return Array.isArray(page) ? page : page?.data?.data || page?.data || [];
    }) || []
  ).map((cs: any) => ({
    value: cs.id,
    label: (
      <div className="flex items-center justify-between w-full gap-4">
        <span className="font-medium text-slate-800 truncate">
          {cs.full_name}
        </span>
        <span className="text-[12px] text-slate-400 font-normal tabular-nums shrink-0">
          {formatPhoneNumber(cs.phone_number)}
        </span>
      </div>
    ),
  }));

  const shouldFetchProducts = isProductOpen || !!query.productId;
  const {
    data: productLists,
    isLoading: productListLoading,
    fetchNextPage: productFetchNextPage,
    hasNextPage: productHasNextPage,
    isFetchingNextPage: productIsFetchingNextPage,
  } = getInfiniteProducts(shouldFetchProducts, {
    search: query.productFilterSearch,
  });
  const productOptions = useMemo(() => {
    const allProducts =
      productLists?.pages.flatMap((page: any) => {
        return Array.isArray(page)
          ? page
          : page?.data?.data || page?.data || [];
      }) || [];

    return allProducts.map((pr: any) => {
      const findColor = colorOptions.find((color) =>
        color.value === pr?.color ? color.hex : "",
      );

      return {
        value: pr?.id,
        label: (
          <div className="flex items-center justify-between w-full py-1">
            <div className="flex flex-col gap-0.5 overflow-hidden">
              <div className="flex gap-1.5">
                <span className="text-[14px] font-medium text-slate-800 leading-tight truncate">
                  {pr?.product_model?.name}
                </span>
                <span className="text-[11px] text-slate-600 font-normal shrink-0">
                  {pr?.product_model?.brand}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-normal">
                <span className="truncate">
                  {productCategories[pr?.product_category?.name]}
                </span>
                -
                <span className="truncate">
                  {productMaterialTypes[pr?.product_material_type?.name]}
                </span>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="capitalize">{pr?.color}</span>
                  <div
                    className="h-3 w-3 rounded-full border border-slate-200 shadow-sm"
                    style={{ backgroundColor: findColor?.hex }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-0.5 shrink-0 ml-2">
              <span className="text-[13px] font-bold text-emerald-600 tabular-nums">
                {isPriceVisible ? Number(pr?.price).toLocaleString() : "******"}{" "}
                uzs
              </span>
              <span
                className={`text-[11px] font-medium ${
                  pr?.quantity > 0 ? "text-blue-500" : "text-red-500"
                }`}
              >
                Qoldiq: {pr?.quantity} ta
              </span>
            </div>
          </div>
        ),
        displayLabel: `${pr?.product_model?.name} - ${pr?.product_model?.brand} - ${pr?.color ? pr?.color?.charAt(0)?.toUpperCase() + pr?.color?.slice(1) : ""}`,
        originalProduct: pr,
      };
    });
  }, [productLists, isPriceVisible]);

  const tagRender = (props: any) => {
    const { value, closable, onClose } = props;
    const selectedOption = productOptions.find(
      (opt: any) => opt.value === value,
    );

    return (
      <div className="flex items-center gap-1 bg-blue-50 border border-blue-200 text-blue-700 px-2 py-[5px] m-0.5 rounded-lg text-[13px]">
        <span>{selectedOption?.displayLabel || "N+"}</span>
        {closable && (
          <span onClick={onClose} className="cursor-pointer ml-1">
            ✕
          </span>
        )}
      </div>
    );
  };

  const shouldFetchShop = isShopOpen || !!query.shopId;
  const { data: shops, isLoading: shopLoading } =
    getAllShopsForProductsFilter(shouldFetchShop);
  const shopsOptions =
    shops?.data?.map((st) => ({
      value: st?.id,
      label: st?.name,
    })) || [];
  // Options end

  // HandleFinishSale starts
  const handleFinishSale = () => {
    const formData = new FormData();

    const shop_id = getParam("shopId") || "";
    const customer_id = getParam("customerId") || "";
    const paid_amount = localStorage.getItem("paid_amount") || "";
    const sale_items = localStorage.getItem("sale_items") || "[]";
    const savedImgs = JSON.parse(localStorage.getItem("images") || "[]");

    formData.append("shop_id", shop_id);
    formData.append("customer_id", customer_id);
    formData.append("paid_amount", paid_amount);
    formData.append("sale_items", sale_items);
    savedImgs.forEach((base64: any, inx: number) => {
      const file = base64ToFile(base64, `product_${inx}.png`);
      formData.append("images", file);
    });

    createSale.mutate(formData, {
      onSuccess: () => {
        removeParams(["shopId", "customerId"]);
        localStorage.removeItem("paid_amount");
        localStorage.removeItem("sale_items");
        localStorage.removeItem("selected_product_ids");
        localStorage.removeItem("images");
        navigate("/admin/sales");
      },
      onError: (err: any) => {
        const status = err?.response?.data?.statusCode;
        const msg = err?.response?.data?.message;

        if (status === 404 && msg.startsWith("Shop with ID")) {
          handleApiError("Do'kon topilmadi", "topRight");
          return;
        } else if (status === 404 && msg.startsWith("Seller with ID")) {
          handleApiError("Sotuvchi topilmadi", "topRight");
          return;
        } else if (status === 404 && msg.startsWith("Customer with ID")) {
          handleApiError("Mijoz topilmadi", "topRight");
          return;
        } else if (status === 404 && msg.startsWith("Product with ID")) {
          handleApiError("Mahsulot topilmadi", "topRight");
          return;
        } else if (status === 400 && msg.startsWith("Product")) {
          handleApiError("Mahsulot yetarli emas", "topRight");
          return;
        } else {
          handleApiError("Serverda xato", "topRight");
          return;
        }
      },
    });
  };
  // HandleFinishSale ends

  // HandleCancel starts
  const handleCancelSale = () => {
    removeParams(["shopId", "customerId"]);
    localStorage.removeItem("paid_amount");
    localStorage.removeItem("sale_items");
    localStorage.removeItem("selected_product_ids");
    localStorage.removeItem("images");
    navigate("/admin/sales");
  };
  // HandleCancel ends

  return (
    <div>
      <ArrowLeft
        className="hover:opacity-75 cursor-pointer mb-1"
        onClick={handleCancelSale}
      />
      <div className="flex justify-between gap-4">
        <LargeTitle title="Yangi sotuv" />

        <div className="flex items-center gap-4 max-[500px]:hidden">
          <Button
            className="h-9! bg-red-500! text-white!"
            onClick={handleCancelSale}
          >
            Bekor qilish
          </Button>
          <Button
            className="h-9!"
            type="primary"
            htmlType="submit"
            onClick={handleFinishSale}
            loading={createSale.isPending}
            disabled={createSale.isPending}
          >
            <Save />
            Saqlash
          </Button>
        </div>
      </div>

      <div className="flex items-start gap-4 min-[500px]:mt-1 max-[1750px]:flex-col">
        <div className="flex flex-col gap-4 w-3/1 max-[1750px]:w-full">
          <ClientInfoForm
            customerId={query.customerId}
            handleChange={handleChange}
            customerOptions={customerOptions}
            customerListLoading={customerListLoading}
            customerHasNextPage={customerHasNextPage}
            customerIsFetchingNextPage={customerIsFetchingNextPage}
            customerFetchNextPage={customerFetchNextPage}
            onSearchChange={handleSearchCustomerModalChange}
            setIsCustomerOpen={setIsCustomerOpen}
          />
          <SaleItemsManager
            productId={query.productId}
            shopId={query.shopId}
            productOptions={productOptions}
            shopOptions={shopsOptions}
            productListLoading={productListLoading}
            productHasNextPage={productHasNextPage}
            productIsFetchingNextPage={productIsFetchingNextPage}
            productFetchNextPage={productFetchNextPage}
            onSearchChange={handleSearchProductFilterChange}
            shopListLoading={shopLoading}
            setIsProductOpen={setIsProductOpen}
            setIsShopOpen={setIsShopOpen}
            handleChange={handleChange}
            tagRender={tagRender}
            isPriceVisible={isPriceVisible}
            setIsPriceVisible={setIsPriceVisible}
          />
        </div>
        <PaymentAndSummary />
      </div>

      <div className="flex items-center gap-4 min-[500px]:hidden max-[500px]:mt-3 max-[380px]:flex-col-reverse">
        <Button
          className="max-[500px]:w-full h-10! bg-red-500! text-white!"
          onClick={handleCancelSale}
        >
          Bekor qilish
        </Button>
        <Button
          className="max-[500px]:w-full h-10!"
          type="primary"
          htmlType="submit"
          onClick={handleFinishSale}
          loading={createSale.isPending}
          disabled={createSale.isPending}
        >
          <Save />
          Saqlash
        </Button>
      </div>
    </div>
  );
};

export default memo(AdminAddSalePage);

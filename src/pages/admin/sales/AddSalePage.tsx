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
import { useShop } from "../../../shared/lib/apis/shops/useShop";
import { base64ToFile } from "../../../shared/lib/functions/base64ToFile";
import { useSale } from "../../../shared/lib/apis/sales/useSale";
import { useApiNotification } from "../../../shared/hooks/api-notification/useApiNotification";
import { debounce } from "../../../shared/lib/functions/debounce";
import { productCategories } from "../../../shared/lib/constants";
import { useProductModel } from "../../../shared/lib/apis/product-models/useProductModel";

const AdminAddSalePage = () => {
  const navigate = useNavigate();
  const [isCustomerOpen, setIsCustomerOpen] = useState<boolean>(false);
  const [isPriceVisible, setIsPriceVisible] = useState<boolean>(false);
  const { getInfiniteCustomers } = useCustomer();
  const { getInfiniteProductModelsForAddSale } = useProductModel();
  const { getAllShopsForProductsFilter } = useShop();
  const { createSale } = useSale();

  const { getParam, setParams, removeParam, removeParams } = useParamsHook();
  const [, setCustomerModalSearch] = useState(
    getParam("customer_search") || "",
  );
  const [, setProductFilterSearch] = useState(
    getParam("product_model_search") || "",
  );
  const { handleApiError } = useApiNotification();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  // Query starts
  const query: QueryParams = useMemo(() => {
    const customerId = localStorage.getItem("customer_id") || undefined;
    const shopId = localStorage.getItem("shop_id") || undefined;

    const savedData = localStorage.getItem("selected_product_ids");
    const productIdArray: string[] = savedData ? JSON.parse(savedData) : [];
    const productId =
      productIdArray.length > 0 ? productIdArray.join(",") : undefined;
    const customerFilterSearch = getParam("customer_search") || undefined;
    const productFilterSearch = getParam("product_model_search") || undefined;

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
      if (nextValue) {
        setParams({
          product_model_search: nextValue || "",
          page: 1,
        });
      } else {
        removeParam("product_model_search");
      }
    }, 500),
    [setParams],
  );

  const handleSearchCustomerModalChange = (value: string) => {
    setCustomerModalSearch(value);
    debouncedSetSearchCustomerModalQuery(value);
  };

  const handleSearchProductFilterChange = (value: string) => {
    setProductFilterSearch(value);

    if (!value.trim()) {
      debouncedSetSearchProductFilterQuery("");
      return;
    }

    debouncedSetSearchProductFilterQuery(value);
  };
  // FilterSearch ends

  // HanldeChangeSelect starts
  const handleChange = (
    key: "customerId" | "productId" | "shopId",
    value: string | string[],
  ) => {
    switch (key) {
      case "customerId":
        if (value) {
          localStorage.setItem("customer_id", value as string);
        } else {
          localStorage.setItem("customer_id", "");
        }
        setParams({ p_ref: Date.now().toString() });
        break;

      case "productId":
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
        localStorage.setItem(
          "selected_product_ids",
          JSON.stringify(finalValues),
        );
        removeParam("product_model_search");
        setParams({ p_ref: Date.now().toString() });
        break;
      case "shopId":
        if (value) {
          localStorage.setItem("shop_id", value as string);
        } else {
          localStorage.setItem("shop_id", "");
        }

        setParams({ p_ref: Date.now().toString() });
        break;
    }
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

  const {
    data: allProductModelsForAddSale,
    isLoading: productModelLoading,
    fetchNextPage: productModelFetchNextPage,
    hasNextPage: productModelHasNextPage,
    isFetchingNextPage: productModelIsFetchingNextPage,
  } = getInfiniteProductModelsForAddSale({
    search: query.productFilterSearch,
  });

  const productModelOptions = useMemo(() => {
    const allProducts =
      allProductModelsForAddSale?.pages.flatMap((page: any) => {
        return Array.isArray(page)
          ? page
          : page?.data?.data || page?.data || [];
      }) || [];

    return allProducts.map((pr: any) => {
      return {
        value: pr?.id,
        label: (
          <div className="flex items-center justify-between w-full py-1">
            <div className="flex flex-col gap-0.5 overflow-hidden">
              <span className="text-[14px] font-medium text-slate-800 leading-tight truncate">
                {pr?.name}
              </span>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-normal">
                <span className="truncate">
                  {productCategories[pr?.product_category?.name]}
                </span>
                <span className="text-slate-300">|</span>
                <span className="truncate">{pr?.size}</span>
              </div>
            </div>

            <span className="text-[13px] font-bold text-emerald-600 tabular-nums">
              {isPriceVisible
                ? `${Number(pr?.price).toLocaleString()} uzs`
                : "******"}{" "}
            </span>
          </div>
        ),
        displayLabel: `${pr?.name} - ${productCategories[pr?.product_category?.name]}`,
        originalProduct: pr,
      };
    });
  }, [allProductModelsForAddSale, isPriceVisible]);

  const { data: shops, isLoading: shopLoading } =
    getAllShopsForProductsFilter(true);
  const shopsOptions =
    shops?.data?.map((st) => ({
      value: st?.id,
      label: st?.name,
    })) || [];
  // Options end

  // HandleFinishSale starts
  const handleFinishSale = () => {
    const formData = new FormData();

    const shopId = localStorage.getItem("shop_id") || "";
    const customerId = localStorage.getItem("customer_id") || "";
    const paidAmount = localStorage.getItem("paid_amount") || "";
    const saleItems = JSON.parse(localStorage.getItem("sale_items") || "[]");
    const savedImgs = JSON.parse(localStorage.getItem("images") || "[]");

    const saleItemsData =
      saleItems?.length > 0
        ? saleItems?.flatMap((sv: any) =>
            sv?.selected_variants?.map((si: any) => ({
              product_id: si?.product_id,
              quantity: si?.quantity,
              price: si?.price,
            })),
          )
        : "[]";
    const finalSaleItemsData = saleItemsData?.filter(Boolean);

    formData.append("shop_id", shopId);
    formData.append("customer_id", customerId);
    formData.append("paid_amount", paidAmount);
    if (finalSaleItemsData && finalSaleItemsData?.length > 0) {
      formData.append("sale_items", JSON.stringify(finalSaleItemsData));
    } else {
      formData.append("sale_items", "[]");
    }
    savedImgs.forEach((base64: any, inx: number) => {
      const file = base64ToFile(base64, `product_${inx}.png`);
      formData.append("images", file);
    });

    createSale.mutate(formData, {
      onSuccess: () => {
        localStorage.removeItem("customer_id");
        localStorage.removeItem("selected_product_ids");
        localStorage.removeItem("sale_items");
        localStorage.removeItem("shop_id");
        localStorage.removeItem("paid_amount");
        localStorage.removeItem("images");
        navigate("/admin/sales");
      },
      onError: (err: any) => {
        const status = err?.response?.data?.statusCode;
        const msg = err?.response?.data?.message;

        console.log(msg);
        if (status === 422 && Array.isArray(msg) && msg.length === 2) {
          handleApiError("Mijoz va model tanlanmagan", "topRight");
          return;
        } else if (
          status === 422 &&
          Array.isArray(msg) &&
          msg.length === 1 &&
          msg[0] === "customer_id should not be empty"
        ) {
          handleApiError("Mijoz tanlanmagan", "topRight");
          return;
        } else if (
          (status === 422 &&
            Array.isArray(msg) &&
            msg.length === 1 &&
            msg[0] === "sale_items must be an array") ||
          "sale_items should not be empty"
        ) {
          handleApiError("Model tanlanmagan", "topRight");
          return;
        } else if (status === 404 && msg.startsWith("Shop with ID")) {
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
    removeParams(["productId", "product_model_search", "customer_search"]);
    localStorage.removeItem("customer_id");
    localStorage.removeItem("selected_product_ids");
    localStorage.removeItem("sale_items");
    localStorage.removeItem("shop_id");
    localStorage.removeItem("paid_amount");
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
            shopId={query.shopId}
            productId={query.productId}
            shopOptions={shopsOptions}
            productModelOptions={productModelOptions}
            shopListLoading={shopLoading}
            productModelListLoading={productModelLoading}
            productModelHasNextPage={productModelHasNextPage}
            productModelIsFetchingNextPage={productModelIsFetchingNextPage}
            productModelFetchNextPage={productModelFetchNextPage}
            onSearchChange={handleSearchProductFilterChange}
            handleChange={handleChange}
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

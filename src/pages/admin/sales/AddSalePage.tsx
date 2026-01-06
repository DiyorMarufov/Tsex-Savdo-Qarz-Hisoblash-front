import { memo, useMemo, useState } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import { Button } from "antd";
import { Save } from "lucide-react";
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

const AdminAddSalePage = () => {
  const navigate = useNavigate();
  const [isCustomerOpen, setIsCustomerOpen] = useState<boolean>(false);
  const [isProductOpen, setIsProductOpen] = useState<boolean>(false);
  const [isShopOpen, setIsShopOpen] = useState<boolean>(false);
  const { getAllCustomersForTransaction } = useCustomer();
  const { getAllProductsForProductsFilter } = useProduct();
  const { getAllShopsForProductsFilter } = useShop();

  const { getParam, setParams } = useParamsHook();

  // Query starts
  const query: QueryParams = useMemo(() => {
    const customerId = getParam("customerId") || undefined;
    const productId = getParam("productId") || undefined;
    const shopId = getParam("shopId") || undefined;

    return { customerId, productId, shopId };
  }, [getParam]);
  // Query ends

  // HanldeChangeSelect starts
  const handleChange = (
    key: "customerId" | "productId" | "shopId",
    value: string
  ) => {
    setParams({
      [key]: value || "",
    });
  };
  // HanldeChangeSelect ends

  // Options start
  const shouldFetchCustomers = isCustomerOpen || !!query.customerId;
  const { data: allCustomersList, isLoading: customerListLoading } =
    getAllCustomersForTransaction(shouldFetchCustomers);

  const customerOptions: Option[] = useMemo(() => {
    return (
      allCustomersList?.data.map((cs: any) => ({
        value: String(cs.id),
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
      })) || []
    );
  }, [allCustomersList]);

  const shouldFetchProducts = isProductOpen || !!query.productId;
  const { data: products, isLoading: productLoading } =
    getAllProductsForProductsFilter(shouldFetchProducts);
  const productOptions = [
    {
      value: "",
      label: "Barcha mahsulotlar",
    },
    ...(products?.data?.data?.map((pr: any) => ({
      value: pr?.id,
      label: (
        <div className="flex justify-between">
          <span className="text-[14px] font-medium text-slate-800">
            {pr?.name}
          </span>

          <span className="text-[12px] text-slate-400 font-normal">
            {pr?.brand}
          </span>
        </div>
      ),
    })) || []),
  ];

  const shouldFetchShop = isShopOpen || !!query.shopId;
  const { data: shops, isLoading: shopLoading } =
    getAllShopsForProductsFilter(shouldFetchShop);
  const shopsOptions = [
    {
      value: "",
      label: "Barcha do'konlar",
    },
    ...(shops?.data?.map((st) => ({
      value: st?.id,
      label: st?.name,
    })) || []),
  ];
  // Options end

  return (
    <div>
      <div className="flex justify-between gap-3">
        <LargeTitle title="Yangi sotuv" />

        <div className="flex items-center gap-3 max-[500px]:hidden">
          <Button
            className="h-10! bg-red-500! text-white!"
            onClick={() => navigate(-1)}
          >
            Bekor qilish
          </Button>
          <Button className="h-10!" type="primary" htmlType="submit">
            <Save />
            Saqlash
          </Button>
        </div>
      </div>

      <div className="flex items-start gap-5 mt-2 max-[1750px]:flex-col">
        <div className="flex flex-col gap-5 w-3/1 max-[1750px]:w-full">
          <ClientInfoForm
            customerId={query.customerId}
            handleChange={handleChange}
            customerOptions={customerOptions}
            customerListLoading={customerListLoading}
            setIsCustomerOpen={setIsCustomerOpen}
          />
          <SaleItemsManager
            productId={query.productId}
            shopId={query.shopId}
            productOptions={productOptions}
            shopOptions={shopsOptions}
            productListLoading={productLoading}
            shopListLoading={shopLoading}
            setIsProductOpen={setIsProductOpen}
            setIsShopOpen={setIsShopOpen}
            handleChange={handleChange}
          />
        </div>
        <PaymentAndSummary />
      </div>

      <div className="flex items-center gap-3 min-[500px]:hidden max-[500px]:mt-3 max-[380px]:flex-col-reverse">
        <Button
          className="max-[500px]:w-full h-10! bg-red-500! text-white!"
          onClick={() => navigate(-1)}
        >
          Bekor qilish
        </Button>
        <Button
          className="max-[500px]:w-full h-10!"
          type="primary"
          htmlType="submit"
        >
          <Save />
          Saqlash
        </Button>
      </div>
    </div>
  );
};

export default memo(AdminAddSalePage);

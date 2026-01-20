import { memo, useCallback, useEffect, useMemo, useState } from "react";
import LargeTitle from "../../../../shared/ui/Title/LargeTItle/LargeTitle";
import ProductFilters from "../../../../widgets/products/ProductFIlters/ProductFilters";
import ProTable from "@ant-design/pro-table";
import { productModelColumns } from "../../../../shared/lib/model/product-models/product-models-model";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useShop } from "../../../../shared/lib/apis/shops/useShop";
import { useTsex } from "../../../../shared/lib/apis/tsexes/useTsex";
import { useParamsHook } from "../../../../shared/hooks/params/useParams";
import type { QueryParams } from "../../../../shared/lib/types";
import { debounce } from "../../../../shared/lib/functions/debounce";
import { useProductModel } from "../../../../shared/lib/apis/product-models/useProductModel";
import ProductModelMobileList from "../../../../widgets/products/ProductModelMobileList/ProductModelMobileList";
import Button from "../../../../shared/ui/Button/Button";
import { Plus } from "lucide-react";
import PlusButton from "../../../../shared/ui/Button/PlusButton";
import { useApiNotification } from "../../../../shared/hooks/api-notification/useApiNotification";

const ProductModelsPage = () => {
  const [isTsexOpen, setIsTsexOpen] = useState<boolean>(false);
  const [isShopOpen, setIsShopOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { getAllProductModels, deleteProductModelById } = useProductModel();
  const { getAllShopsForProductsFilter } = useShop();
  const { getAllTsexesForProductsFilter } = useTsex();

  const { getParam, setParams, removeParam } = useParamsHook();

  const [localSearch, setLocalSearch] = useState(getParam("search") || "");
  const { handleApiError, handleSuccess } = useApiNotification();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  // Query starts
  const query: QueryParams = useMemo(() => {
    const page = Number(getParam("page")) || 1;
    const limit = Number(getParam("limit")) || 5;
    const search = getParam("search") || undefined;
    const shopId = getParam("shopId") || undefined;
    const tsexId = getParam("tsexId") || undefined;

    return { page, limit, search, shopId, tsexId };
  }, [getParam]);
  // Query ends

  // Products start
  const { data: allProductModels, isLoading: productLoading } =
    getAllProductModels(query);
  const productModels = allProductModels?.data?.data;
  const total = allProductModels?.data?.total || 0;
  // Products end

  // Product detail starts
  const handleProductDetailOpen = (id: string) => {
    navigate(`product/${id}`);
  };
  // Product detail ends

  // PageChange starts
  const handlePageChange = (newPage: number, newPageSize?: number) => {
    const updateParams: { page?: number; limit?: number } = {};

    if (newPage > 1) {
      updateParams.page = newPage;
    }

    if (newPageSize && newPageSize !== 5) {
      updateParams.limit = newPageSize;
    }

    setParams(updateParams);

    if (newPage === 1) {
      removeParam("page");
    }
    if (newPageSize === 5 && getParam("limit")) {
      removeParam("limit");
    }
  };
  // PageChange ends

  // Search starts
  const debouncedSetSearchQuery = useCallback(
    debounce((nextValue: string) => {
      setParams({
        search: nextValue || "",
        page: 1,
      });
    }, 500),
    [setParams],
  );

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    debouncedSetSearchQuery(value);
  };
  // Search ends

  // Filter starts
  const handleFilterChange = (key: "shopId" | "tsexId", value: string) => {
    setParams({
      [key]: value || "",
      page: 1,
    });
  };

  const { data: shops, isLoading: shopLoading } =
    getAllShopsForProductsFilter(isShopOpen);
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

  const { data: tsexes, isLoading: tsexLoading } =
    getAllTsexesForProductsFilter(isTsexOpen);
  const tsexesOptions = [
    {
      value: "",
      label: "Barcha tsexlar",
    },
    ...(tsexes?.data?.map((ts) => ({
      value: ts?.id,
      label: ts?.name,
    })) || []),
  ];
  // Filter ends

  // DeleteProductModel starts
  const handleDelete = (id: string) => {
    deleteProductModelById.mutate(id, {
      onSuccess: () => {
        handleSuccess("Muvaffaqiyatli o'chirildi");
      },
      onError: (err: any) => {
        const status = err?.response?.data?.statusCode;
        const msg = err?.response?.data?.message;

        if (status === 404 && msg.startsWith("Product model with ID")) {
          handleApiError("Model topilmadi", "topRight");
          return;
        } else if (
          status === 400 &&
          msg.startsWith("Product model has products")
        ) {
          handleApiError("Model mahsulotlarga ega", "topRight");
          return;
        } else {
          handleApiError("Serverda xato", "topRight");
          return;
        }
      },
    });
  };
  // DeleteProductModel ends

  if (pathname.startsWith(`/admin/models/`)) return <Outlet />;

  return (
    <div>
      <div className="flex justify-between gap-4">
        <LargeTitle title="Modellar" />
        <div className="max-[500px]:hidden">
          <Button onClick={() => navigate("add")}>
            <Plus />
            Yangi model qo'shish
          </Button>
        </div>

        <PlusButton setOpen={() => navigate("add")} />
      </div>

      <ProductFilters
        localSearch={localSearch}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        shopsOptions={shopsOptions}
        tsexesOptions={tsexesOptions}
        shopId={query.shopId}
        tsexId={query.tsexId}
        setIsTsexOpen={setIsTsexOpen}
        setIsShopOpen={setIsShopOpen}
        tsexLoading={tsexLoading}
        shopLoading={shopLoading}
        isAdmin
      />

      <div className="max-[500px]:hidden mt-4">
        <ProTable
          dataSource={productModels}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            responsive: false,
            current: query.page,
            pageSize: query.limit,
            total,
            onChange: handlePageChange,
          }}
          columns={productModelColumns(handleProductDetailOpen, {
            handleDelete,
            deleteProductModelById,
          })}
          search={false}
          dateFormatter="string"
          scroll={{ x: "max-content" }}
          loading={productLoading}
        />
      </div>

      <ProductModelMobileList
        models={productModels}
        currentPage={Number(query.page)}
        pageSize={Number(query.limit)}
        total={total}
        onPageChange={handlePageChange}
        isLoading={productLoading}
        onDetail={handleProductDetailOpen}
      />
    </div>
  );
};

export default memo(ProductModelsPage);

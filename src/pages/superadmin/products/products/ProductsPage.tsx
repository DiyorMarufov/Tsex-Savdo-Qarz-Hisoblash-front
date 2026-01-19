import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../../../../shared/lib/apis/products/useProduct";
import { useParamsHook } from "../../../../shared/hooks/params/useParams";
import type { QueryParams } from "../../../../shared/lib/types";
import { debounce } from "../../../../shared/lib/functions/debounce";
import LargeTitle from "../../../../shared/ui/Title/LargeTItle/LargeTitle";
import ProTable from "@ant-design/pro-table";
import { productColumns } from "../../../../shared/lib/model/products/products-model";
import ProductMobileList from "../../../../widgets/products/ProductMobileList/ProductMobileList";
import { ArrowLeft } from "lucide-react";
import SearchInput from "../../../../shared/ui/SearchInput/SearchInput";

const ProductsPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { getAllProducts } = useProduct();

  const { getParam, setParams, removeParam } = useParamsHook();

  const [localSearch, setLocalSearch] = useState(getParam("search") || "");
  const { id } = useParams();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  // Query starts
  const query: QueryParams = useMemo(() => {
    const page = Number(getParam("page")) || 1;
    const limit = Number(getParam("limit")) || 6;
    const search = getParam("search") || undefined;

    return { page, limit, search };
  }, [getParam]);
  // Query ends

  // Products start
  const { data: allProducts, isLoading: productLoading } = getAllProducts(
    query,
    id
  );
  const products = allProducts?.data?.data;
  const total = allProducts?.data?.total || 0;
  // Products end

  // Product detail starts
  const handleProductDetailOpen = (_: any, id: string) => {
    navigate(`detail/${id}`);
  };
  // Product detail ends

  // PageChange starts
  const handlePageChange = (newPage: number, newPageSize?: number) => {
    const updateParams: { page?: number; limit?: number } = {};

    if (newPage > 1) {
      updateParams.page = newPage;
    }

    if (newPageSize && newPageSize !== 6) {
      updateParams.limit = newPageSize;
    }

    setParams(updateParams);

    if (newPage === 1) {
      removeParam("page");
    }
    if (newPageSize === 6 && getParam("limit")) {
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
    }, 600),
    [setParams]
  );

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    debouncedSetSearchQuery(value);
  };
  // Search ends

  const isProductDetail =
    /^\/superadmin\/models\/product\/[^/]+\/detail\//.test(pathname);

  if (isProductDetail) {
    return <Outlet />;
  }
  return (
    <div>
      <ArrowLeft
        className="hover:opacity-76 cursor-pointer mb-1"
        onClick={() => navigate("/superadmin/models")}
      />
      <LargeTitle title="Mahsulotlar" />

      <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] p-3.5">
        <SearchInput
          placeholder="Mahsulot rangi bo'yicha qidirish"
          className="h-10! bg-bg-ty! text-[16px]!"
          value={localSearch}
          onChange={handleSearchChange}
        />
      </div>

      <div className="max-[600px]:hidden mt-4">
        <ProTable
          dataSource={products}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            responsive: false,
            current: query.page,
            pageSize: query.limit,
            total,
            onChange: handlePageChange,
          }}
          columns={productColumns(handleProductDetailOpen)}
          search={false}
          dateFormatter="string"
          scroll={{ x: "max-content" }}
          loading={productLoading}
        />
      </div>

      <ProductMobileList
        products={products}
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

export default memo(ProductsPage);

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "../../../../features/auth/api";

export const product = "product";

export const useProduct = () => {
  const client = useQueryClient();
  const createProduct = useMutation({
    mutationFn: (data: any) =>
      api.post("products", data).then((res) => res.data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [product, "all-products-by-id"] });
      client.invalidateQueries({ queryKey: [product] });

      client.invalidateQueries({
        queryKey: [product, "all-products-for-report"],
      });
      client.invalidateQueries({
        queryKey: [product, "all-products-summary"],
      });
      client.invalidateQueries({
        queryKey: [product, "products-filter"],
      });
      client.invalidateQueries({
        queryKey: [product, "all-infinite-products"],
      });
      client.invalidateQueries({
        queryKey: [product, "all-inifinite-products-for-sale-create"],
      });
      client.invalidateQueries({
        queryKey: [product, "latest-product"],
      });
      client.invalidateQueries({
        queryKey: ["product_model", "all-product-models"],
      });
      client.invalidateQueries({
        queryKey: ["product_model", "product-model-by-id"],
      });
      client.invalidateQueries({
        queryKey: [
          "product_history",
          "all-infinite-product-histories-by-product-id",
        ],
      });
      client.invalidateQueries({ queryKey: ["tsex", "total-balance"] });
      client.invalidateQueries({ queryKey: ["tsex", "most-debtor-tsexes"] });
      client.invalidateQueries({ queryKey: ["tsex", "tsex-balance-summary"] });
      client.invalidateQueries({ queryKey: ["tsex", "all-tsex"] });
      client.invalidateQueries({ queryKey: ["tsex", "all-tsex-summary"] });
      client.invalidateQueries({ queryKey: ["tsex", "all-tsex-statistics"] });
      client.invalidateQueries({ queryKey: ["tsex_transaction"] });
    },
  });

  const getAllProducts = (params?: any, id?: string) =>
    useQuery({
      queryKey: [product, "all-products-by-id", params, id],
      queryFn: () =>
        api.get(`products/model/${id}`, { params }).then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const getAllProductsForReport = (params?: any) =>
    useQuery({
      queryKey: [product, "all-products-for-report", params],
      queryFn: () =>
        api.get(`products/reports`, { params }).then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const getProductsSummaryForReport = (params?: any) =>
    useQuery({
      queryKey: [product, "all-products-summary", params],
      queryFn: () => api.get("products/reports/products-summary", { params }),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const getAllProductsForProductsFilter = (params?: any) =>
    useQuery({
      queryKey: [product, "products-filter", params],
      queryFn: () =>
        api
          .get("products/reports/filters-list", { params })
          .then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const getInfiniteProducts = (params?: any) =>
    useInfiniteQuery({
      queryKey: [product, "all-infinite-products", params],
      queryFn: ({ pageParam = 1 }) =>
        api
          .get("products/reports/filters-list", {
            params: { ...params, page: pageParam, limit: 10 },
          })
          .then((res) => res.data),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.data?.data.length === 10
          ? allPages.length + 1
          : undefined;
      },
      initialPageParam: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    });

  const getAllTop5ProductsForReport = (params?: any) =>
    useQuery({
      queryKey: [product, "products-top", params],
      queryFn: () =>
        api
          .get("products/reports/top-products", { params })
          .then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const getInfiniteProductsForSaleCreate = (id: string, params?: any) =>
    useInfiniteQuery({
      queryKey: [product, "all-inifinite-products-for-sale-create", id, params],
      queryFn: ({ pageParam = 1 }) =>
        api
          .get(`products/product-model/${id}`, {
            params: { ...params, page: pageParam, limit: 10 },
          })
          .then((res) => res.data),
      enabled: !!id,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.data?.data.length === 10
          ? allPages.length + 1
          : undefined;
      },
      initialPageParam: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    });

  const getLatestProductForProductCreate = (id: string) =>
    useQuery({
      queryKey: [product, "latest-product", id],
      queryFn: () => api.get(`products/latest/${id}`).then((res) => res.data),
      enabled: !!id,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const getProductById = (id: string) =>
    useQuery({
      queryKey: [product, id],
      queryFn: () => api.get(`products/${id}`).then((res) => res.data),
      enabled: !!id,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      gcTime: 1000 * 60 * 10,
    });

  const deleteProductById = useMutation({
    mutationFn: (id: string) =>
      api.delete(`products/${id}`).then((res) => res.data),
    onSuccess: () => (
      client.invalidateQueries({ queryKey: [product, "all-products-by-id"] }),
      client.invalidateQueries({
        queryKey: ["product_model", "all-product-models"],
      }),
      client.invalidateQueries({
        queryKey: ["product_model", "product-model-by-id"],
      }),
      client.invalidateQueries({
        queryKey: [product, "all-products-for-report"],
      }),
      client.invalidateQueries({ queryKey: [product, "all-products-summary"] }),
      client.invalidateQueries({ queryKey: [product, "products-filter"] }),
      client.invalidateQueries({
        queryKey: [product, "all-infinite-products"],
      }),
      client.invalidateQueries({
        queryKey: [product, "latest-product"],
      }),
      client.invalidateQueries({ queryKey: ["tsex", "total-balance"] }),
      client.invalidateQueries({ queryKey: ["tsex", "most-debtor-tsexes"] }),
      client.invalidateQueries({ queryKey: ["tsex", "tsex-balance-summary"] }),
      client.invalidateQueries({ queryKey: ["tsex", "all-tsex"] }),
      client.invalidateQueries({ queryKey: ["tsex", "all-tsex-summary"] }),
      client.invalidateQueries({ queryKey: ["tsex", "all-tsex-statistics"] }),
      client.invalidateQueries({ queryKey: ["tsex_transaction"] })
    ),
  });
  return {
    createProduct,
    getAllProducts,
    getAllProductsForReport,
    getInfiniteProducts,
    getProductsSummaryForReport,
    getAllProductsForProductsFilter,
    getAllTop5ProductsForReport,
    getInfiniteProductsForSaleCreate,
    getLatestProductForProductCreate,
    getProductById,
    deleteProductById,
  };
};

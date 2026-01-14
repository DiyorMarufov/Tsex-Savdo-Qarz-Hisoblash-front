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
    onSuccess: () => (
      client.invalidateQueries({ queryKey: [product, "all-products-by-id"] }),
      client.invalidateQueries({ queryKey: ["tsex", "total-balance"] }),
      client.invalidateQueries({ queryKey: ["tsex", "most-debtor-tsexes"] }),
      client.invalidateQueries({
        queryKey: ["product_model", "all-product-models"],
      })
    ),
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

  const getProductsSummaryForReport = (params?: any) =>
    useQuery({
      queryKey: [product, "all-products-summary", params],
      queryFn: () => api.get("products/reports/products-summary", { params }),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const getAllProductsForProductsFilter = (
    enabled: boolean = false,
    params?: any
  ) =>
    useQuery({
      queryKey: [product, "products-filter", params],
      queryFn: () =>
        api
          .get("products/reports/filters-list", { params })
          .then((res) => res.data),
      enabled,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const getInfiniteProducts = (enabled: boolean = false, params?: any) =>
    useInfiniteQuery({
      queryKey: [product, "all-infinite-products", params],
      queryFn: ({ pageParam = 1 }) =>
        api
          .get("products/reports/filters-list", {
            params: { ...params, page: pageParam, limit: 10 },
          })
          .then((res) => res.data),
      enabled,
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

  const getProductById = (id: string) =>
    useQuery({
      queryKey: [product, id],
      queryFn: () => api.get(`products/${id}`).then((res) => res.data),
      enabled: !!id,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      gcTime: 1000 * 60 * 10,
    });
  return {
    createProduct,
    getAllProducts,
    getInfiniteProducts,
    getProductsSummaryForReport,
    getAllProductsForProductsFilter,
    getAllTop5ProductsForReport,
    getProductById,
  };
};

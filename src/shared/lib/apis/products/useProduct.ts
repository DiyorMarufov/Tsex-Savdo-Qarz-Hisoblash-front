import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../features/auth/api";

export const product = "product";

export const useProduct = () => {
  const getAllProducts = (params?: any) =>
    useQuery({
      queryKey: [product, "all-products", params],
      queryFn: () => api.get("products", { params }).then((res) => res.data),
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
    params?: any,
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
    getAllProducts,
    getProductsSummaryForReport,
    getAllProductsForProductsFilter,
    getAllTop5ProductsForReport,
    getProductById,
  };
};

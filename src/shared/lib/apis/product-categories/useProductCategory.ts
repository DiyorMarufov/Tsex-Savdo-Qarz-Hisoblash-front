import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../features/auth/api";

export const product_category = "product_category";

export const useProductCategory = () => {
  const getAllProductCategoriesForFilter = (
    enabled: boolean = false,
    params?: any,
  ) =>
    useQuery({
      queryKey: [product_category, "all-product-categories-for-filter", params],
      queryFn: () =>
        api
          .get("product-categories/filters-list", { params })
          .then((res) => res.data),
      enabled,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      gcTime: 1000 * 60 * 60,
    });
  return { getAllProductCategoriesForFilter };
};

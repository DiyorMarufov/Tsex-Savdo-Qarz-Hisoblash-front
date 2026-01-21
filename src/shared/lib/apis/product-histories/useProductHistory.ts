import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../../../features/auth/api";

export const product_history = "product_history";

export const useProductHistory = () => {
  const getAllProductHistoriesByProductId = (id: string, params?: any) =>
    useInfiniteQuery({
      queryKey: [
        product_history,
        "all-infinite-product-histories-by-product-id",
        id,
        params,
      ],
      queryFn: ({ pageParam = 1 }) =>
        api
          .get(`product-histories/product/${id}`, {
            params: { ...params, page: pageParam, limit: 5 },
          })
          .then((res) => res.data),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.data?.data.length === 5
          ? allPages.length + 1
          : undefined;
      },
      enabled: !!id,
      initialPageParam: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    });
  return { getAllProductHistoriesByProductId };
};

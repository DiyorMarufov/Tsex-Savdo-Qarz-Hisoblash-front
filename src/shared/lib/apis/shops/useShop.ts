import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../features/auth/api";
import type { IResponseData } from "../../types";

export const shop = "shop";

export const useShop = () => {
  const getAllShops = () =>
    useQuery<IResponseData>({
      queryKey: [shop, "all-shops"],
      queryFn: () => api.get("shops").then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      gcTime: Infinity,
    });

  const getAllShopsForProductsFilter = () =>
    useQuery<IResponseData>({
      queryKey: [shop, "shops-filter"],
      queryFn: () => api.get("shops/filters/list").then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      gcTime: Infinity,
    });
  return { getAllShops, getAllShopsForProductsFilter };
};

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
      gcTime: 1000 * 60 * 60,
    });

  const getAllShopsForProductsFilter = (enabled: boolean = false) =>
    useQuery<IResponseData>({
      queryKey: [shop, "shops-filter"],
      queryFn: () => api.get("shops/filters/list").then((res) => res.data),
      enabled,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      gcTime: 1000 * 60 * 60,
    });
  return { getAllShops, getAllShopsForProductsFilter };
};

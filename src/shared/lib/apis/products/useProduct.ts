import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../features/auth/api";

export const product = "product";

export const useProduct = () => {
  const getAllProducts = () =>
    useQuery({
      queryKey: [product, "all-products"],
      queryFn: () => api.get("products").then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const getProductById = (id: string) =>
    useQuery({
      queryKey: [product, id],
      queryFn: () => api.get(`products/${id}`).then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      gcTime: 1000 * 60 * 10,
    });
  return { getAllProducts, getProductById };
};

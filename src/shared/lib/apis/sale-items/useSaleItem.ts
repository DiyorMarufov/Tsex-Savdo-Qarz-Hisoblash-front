import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../features/auth/api";

export const sale_item = "sale_item";

export const useSaleItem = () => {
  const getSaleItemsBySaleId = (id: string) =>
    useQuery({
      queryKey: [sale_item, id],
      queryFn: () => api.get(`sale-items/sale/${id}`).then((res) => res.data),
      enabled: !!id,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });
  return { getSaleItemsBySaleId };
};

import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../features/auth/api";
import type { IResponseData } from "../../types";

export const customer = "customer";

export const useCustomer = () => {
  const getTotalCustomerBalance = () =>
    useQuery<IResponseData>({
      queryKey: [customer, "totalBalance"],
      queryFn: () => api.get("customers/total-balance").then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });
  return { getTotalCustomerBalance };
};

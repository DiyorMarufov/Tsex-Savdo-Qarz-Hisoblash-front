import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../features/auth/api";
import type { IResponseData } from "../../types";

export const tsex = "tsex";

export const useTsex = () => {
  const getTotalTsexBalance = () =>
    useQuery<IResponseData>({
      queryKey: [tsex, "totalBalance"],
      queryFn: () => api.get("tsexes/total-balance").then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });
  return { getTotalTsexBalance };
};

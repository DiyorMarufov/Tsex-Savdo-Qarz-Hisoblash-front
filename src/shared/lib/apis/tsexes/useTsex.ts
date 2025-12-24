import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../features/auth/api";
import type { IResponseData } from "../../types";

export const tsex = "tsex";

export const useTsex = () => {
  const getTotalTsexBalance = () =>
    useQuery<IResponseData>({
      queryKey: [tsex, "total-balance"],
      queryFn: () => api.get("tsexes/balances/total").then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const getMostDebtorTsexes = () =>
    useQuery<IResponseData>({
      queryKey: [tsex, "most-debtor-tsexes"],
      queryFn: () => api.get("tsexes/debtors/top").then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const getAllTsexesForProductsFilter = () =>
    useQuery<IResponseData>({
      queryKey: [tsex, "tsexes-filter"],
      queryFn: () => api.get("tsexes/filters/list").then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      gcTime: Infinity,
    });

  const getTsexBalanceSummary = () =>
    useQuery({
      queryKey: [tsex, "tsex-balance-summary"],
      queryFn: () => api.get("tsexes/balances/summary").then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const getAllTsexes = (params: any) =>
    useQuery({
      queryKey: [tsex, "all-tsex", params],
      queryFn: () => api.get("tsexes", { params }).then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });
  return {
    getTotalTsexBalance,
    getMostDebtorTsexes,
    getAllTsexesForProductsFilter,
    getTsexBalanceSummary,
    getAllTsexes,
  };
};

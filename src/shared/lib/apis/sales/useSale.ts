import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../features/auth/api";
import type { IResponseData } from "../../types";

export const sale = "sale";

export const useSale = () => {
  const getTotalSales = () =>
    useQuery<IResponseData>({
      queryKey: [sale, "total-sales"],
      queryFn: () => api.get("sales/total-sale").then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const getWeeklySale = () =>
    useQuery<IResponseData>({
      queryKey: [sale, "weekly-sale"],
      queryFn: () => api.get("sales/weekly-sale").then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const getSalesSummaryForReport = () =>
    useQuery({
      queryKey: [sale, "sales-summary-for-report"],
      queryFn: () =>
        api.get("sales/reports/sales-summary").then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });
  return { getTotalSales, getWeeklySale, getSalesSummaryForReport };
};

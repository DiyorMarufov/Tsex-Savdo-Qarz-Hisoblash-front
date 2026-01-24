import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../../features/auth/api";
import type { IResponseData } from "../../types";

export const sale = "sale";

export const useSale = () => {
  const client = useQueryClient();
  const createSale = useMutation({
    mutationFn: (data: any) => api.post("sales", data).then((res) => res.data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [sale, "all-sales"] });
      client.invalidateQueries({ queryKey: [sale, "total-sales"] });
      client.invalidateQueries({ queryKey: [sale, "weekly-sale"] });
      client.invalidateQueries({
        queryKey: [sale, "sales-summary-for-report"],
      });
      client.invalidateQueries({
        queryKey: [sale, "sales-statistics-for-report"],
      });
      client.invalidateQueries({
        queryKey: ["customer", "customer-total-balance"],
      });
      client.invalidateQueries({
        queryKey: ["customer", "most-debtor-customers"],
      });
      client.invalidateQueries({
        queryKey: ["customer", "customer-balance-summary"],
      });
      client.invalidateQueries({
        queryKey: ["customer", "all-customers"],
      });
      client.invalidateQueries({
        queryKey: ["customer", "all-customers-statistics-for-report"],
      });
      client.invalidateQueries({
        queryKey: ["customer_transaction", "customer-transactions"],
      });
      client.invalidateQueries({
        queryKey: ["product", "all-products-summary"],
      });
      client.invalidateQueries({
        queryKey: ["product", "all-infinite-products"],
      });
      client.invalidateQueries({
        queryKey: ["product", "products-top"],
      });
      client.invalidateQueries({
        queryKey: ["product"],
      });
    },
  });

  const getAllSales = (params?: any) =>
    useQuery({
      queryKey: [sale, "all-sales", params],
      queryFn: () => api.get("sales", { params }).then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

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

  const getSalesSummaryForReport = (params?: any) =>
    useQuery({
      queryKey: [sale, "sales-summary-for-report", params],
      queryFn: () =>
        api
          .get("sales/reports/sales-summary", { params })
          .then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const getSalesStatisticsForReport = (params?: any) =>
    useQuery<IResponseData>({
      queryKey: [sale, "sales-statistics-for-report", params],
      queryFn: () =>
        api
          .get("sales/reports/sales-statistics", { params })
          .then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });
  return {
    createSale,
    getAllSales,
    getTotalSales,
    getWeeklySale,
    getSalesSummaryForReport,
    getSalesStatisticsForReport,
  };
};

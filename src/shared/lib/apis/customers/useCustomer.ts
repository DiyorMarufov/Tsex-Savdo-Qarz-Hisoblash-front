import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "../../../../features/auth/api";
import type { IResponseData, NewCustomerFieldType } from "../../types";

export const customer = "customer";

export const useCustomer = () => {
  const client = useQueryClient();

  const createCustomer = useMutation({
    mutationFn: (data: NewCustomerFieldType) =>
      api.post("customers", data).then((res) => res.data),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [customer, "all-customers"],
      });
      client.invalidateQueries({
        queryKey: [customer, "all-customers-for-transaction"],
      });
    },
  });
  const getTotalCustomerBalance = () =>
    useQuery<IResponseData>({
      queryKey: [customer, "customer-total-balance"],
      queryFn: () =>
        api.get("customers/balances/total").then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const getMostDebtorCustomers = () =>
    useQuery<IResponseData>({
      queryKey: [customer, "most-debtor-customers"],
      queryFn: () => api.get("customers/debtors/top").then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const getCustomerBalanceSummary = (params?: any) =>
    useQuery({
      queryKey: [customer, "customer-balance-summary", params],
      queryFn: () =>
        api
          .get("customers/balances/summary", { params })
          .then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const getAllCustomers = (params?: any) =>
    useQuery({
      queryKey: [customer, "all-customers", params],
      queryFn: () => api.get("customers", { params }).then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const getAllCustomersForTransaction = (enabled: boolean = false) =>
    useQuery<IResponseData>({
      queryKey: [customer, "all-customers-for-transaction"],
      queryFn: () =>
        api.get("customers/transactions/list").then((res) => res.data),
      enabled,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      gcTime: 1000 * 60 * 60,
    });

  const getInfiniteCustomers = (enabled: boolean = false, params?: any) =>
    useInfiniteQuery({
      queryKey: [customer, "all-infinite-customers", params],
      queryFn: ({ pageParam = 1 }) =>
        api
          .get("customers/transactions/list", {
            params: { ...params, page: pageParam, limit: 10 },
          })
          .then((res) => res.data),
      enabled,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.data?.data.length === 10
          ? allPages.length + 1
          : undefined;
      },
      initialPageParam: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    });

  const getAllCustomersStatisticsForReport = (params?: any) =>
    useQuery({
      queryKey: [customer, "all-customers-statistics-for-report", params],
      queryFn: () =>
        api
          .get("customers/reports/customers-statistics", { params })
          .then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });
  return {
    createCustomer,
    getTotalCustomerBalance,
    getMostDebtorCustomers,
    getCustomerBalanceSummary,
    getAllCustomers,
    getAllCustomersForTransaction,
    getInfiniteCustomers,
    getAllCustomersStatisticsForReport,
  };
};

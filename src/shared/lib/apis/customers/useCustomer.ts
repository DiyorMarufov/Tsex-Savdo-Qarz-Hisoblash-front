import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

  const getCustomerBalanceSummary = () =>
    useQuery({
      queryKey: [customer, "customer-balance-summary"],
      queryFn: () =>
        api.get("customers/balances/summary").then((res) => res.data),
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
  return {
    createCustomer,
    getTotalCustomerBalance,
    getMostDebtorCustomers,
    getCustomerBalanceSummary,
    getAllCustomers,
    getAllCustomersForTransaction,
  };
};

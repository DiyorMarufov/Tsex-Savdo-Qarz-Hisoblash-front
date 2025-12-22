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

  const getCustomerCreditorTotalBalance = () =>
    useQuery<IResponseData>({
      queryKey: [customer, "creditor-total-balance"],
      queryFn: () =>
        api.get("customers/balances/creditor-total").then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const getCustomerDebtorTotalBalance = () =>
    useQuery<IResponseData>({
      queryKey: [customer, "debtor-total-balance"],
      queryFn: () =>
        api.get("customers/balances/debtor-total").then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const getCustomerNetTotalBalance = () =>
    useQuery<IResponseData>({
      queryKey: [customer, "net-total-balance"],
      queryFn: () =>
        api.get("customers/balances/net-total").then((res) => res.data),
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

  const getAllCustomersForTransaction = () =>
    useQuery<IResponseData>({
      queryKey: [customer, "all-customers-for-transaction"],
      queryFn: () =>
        api.get("customers/transactions/list").then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      gcTime: Infinity,
    });
  return {
    createCustomer,
    getTotalCustomerBalance,
    getMostDebtorCustomers,
    getCustomerCreditorTotalBalance,
    getCustomerDebtorTotalBalance,
    getCustomerNetTotalBalance,
    getAllCustomers,
    getAllCustomersForTransaction,
  };
};

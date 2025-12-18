import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../features/auth/api";
import type { IResponseData } from "../../types";

export const customer = "customer";

export const useCustomer = () => {
  const getTotalCustomerBalance = () =>
    useQuery<IResponseData>({
      queryKey: [customer, "totalBalance"],
      queryFn: () =>
        api.get("customers/balances/total").then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const getMostDebtorCustomers = () =>
    useQuery<IResponseData>({
      queryKey: [customer, "mostDebtorCustomers"],
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
  return {
    getTotalCustomerBalance,
    getMostDebtorCustomers,
    getCustomerCreditorTotalBalance,
    getCustomerDebtorTotalBalance,
    getCustomerNetTotalBalance,
    getAllCustomers,
  };
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../../features/auth/api";
import type { IResponseData, transactionFieldType } from "../../types";
import { customer } from "../customers/useCustomer";

export const customer_transaction = "customer_transaction";

export const useCustomerTransaction = () => {
  const client = useQueryClient();

  const createLend = useMutation({
    mutationFn: (data: transactionFieldType) =>
      api.post("customer-transactions/lend", data).then((res) => res.data),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [customer, "creditor-total-balance"],
      });
      client.invalidateQueries({
        queryKey: [customer, "debtor-total-balance"],
      });
      client.invalidateQueries({
        queryKey: [customer, "net-total-balance"],
      });
      client.invalidateQueries({ queryKey: [customer, "all-customers"] });
      client.invalidateQueries({
        queryKey: [customer, "customer-transactions"],
      });
      client.invalidateQueries({
        queryKey: [customer, "customer-total-balance"],
      });
      client.invalidateQueries({
        queryKey: [customer, "most-debtor-customers"],
      });
    },
  });

  const createBorrow = useMutation({
    mutationFn: (data: transactionFieldType) =>
      api.post("customer-transactions/borrow", data).then((res) => res.data),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [customer, "creditor-total-balance"],
      });
      client.invalidateQueries({
        queryKey: [customer, "debtor-total-balance"],
      });
      client.invalidateQueries({
        queryKey: [customer, "net-total-balance"],
      });
      client.invalidateQueries({ queryKey: [customer, "all-customers"] });
      client.invalidateQueries({
        queryKey: [customer, "customer-transactions"],
      });
      client.invalidateQueries({
        queryKey: [customer, "customer-total-balance"],
      });
      client.invalidateQueries({
        queryKey: [customer, "most-debtor-customers"],
      });
    },
  });

  const getCustomerTransactionsByCustomerId = (customerId: string) =>
    useQuery<IResponseData>({
      queryKey: [customer_transaction, "customer-transactions", customerId],
      queryFn: () =>
        api
          .get(`customer-transactions/by-customer/${customerId}`)
          .then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const getCustomerTransactionsDetailByParentTransactionId = (
    parent_transaction_id: string
  ) =>
    useQuery({
      queryKey: [
        customer_transaction,
        "customer-transactions-parent-id",
        parent_transaction_id,
      ],
      queryFn: () =>
        api
          .get(`customer-transactions/by-parent/${parent_transaction_id}`)
          .then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });
  return {
    createLend,
    createBorrow,
    getCustomerTransactionsByCustomerId,
    getCustomerTransactionsDetailByParentTransactionId,
  };
};

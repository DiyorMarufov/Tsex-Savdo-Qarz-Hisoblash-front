import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../features/auth/api";
import type { IResponseData } from "../../types";

export const customer_transaction = "customer_transaction";

export const useCustomerTransaction = () => {
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
    getCustomerTransactionsByCustomerId,
    getCustomerTransactionsDetailByParentTransactionId,
  };
};

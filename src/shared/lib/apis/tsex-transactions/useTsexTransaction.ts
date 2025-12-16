import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../features/auth/api";

export const tsex_transaction = "tsex_transaction";

export const useTsexTransaction = () => {
  const getTsexTransactionsByTsexId = (id: string) =>
    useQuery({
      queryKey: [tsex_transaction, id],
      queryFn: () =>
        api.get(`tsex-transactions/tsexes/${id}`).then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });
  return { getTsexTransactionsByTsexId };
};

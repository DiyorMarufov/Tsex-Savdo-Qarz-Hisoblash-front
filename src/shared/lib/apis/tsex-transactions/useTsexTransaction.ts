import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../../features/auth/api";

export const tsex_transaction = "tsex_transaction";

export const useTsexTransaction = () => {
  const client = useQueryClient();
  const createTsexTransaction = useMutation({
    mutationFn: ({
      data,
      type,
    }: {
      data: any;
      type: "full-payment" | "partial-payment" | "avans-payment";
    }) => api.post(`tsex-transactions/${type}/product`, data),

    onSuccess: () => {
      client.invalidateQueries({ queryKey: [tsex_transaction] });
      client.invalidateQueries({ queryKey: ["tsex", "all-tsex"] });
      client.invalidateQueries({ queryKey: ["tsex", "tsex-balance-summary"] });
      client.invalidateQueries({ queryKey: ["tsex", "total-balance"] });
      client.invalidateQueries({ queryKey: ["tsex", "most-debtor-tsexes"] });
      client.invalidateQueries({ queryKey: ["tsex", "all-tsex-summary"] });
      client.invalidateQueries({ queryKey: ["tsex", "all-tsex-statistics"] });
    },
  });

  const getTsexTransactionsByTsexId = (id: string, params?: any) =>
    useQuery({
      queryKey: [tsex_transaction, id, params],
      queryFn: () =>
        api
          .get(`tsex-transactions/tsexes/${id}`, { params })
          .then((res) => res.data),
      enabled: !!id,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });
  return { getTsexTransactionsByTsexId, createTsexTransaction };
};

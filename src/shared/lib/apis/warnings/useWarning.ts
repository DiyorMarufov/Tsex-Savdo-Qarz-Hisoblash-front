import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../../features/auth/api";

export const warning = "warning";

export const useWarning = () => {
  const client = useQueryClient();
  const getActiveWarnings = () =>
    useQuery({
      queryKey: [warning, "active-warnings"],
      queryFn: () => api.get("warnings").then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const updateStatus = useMutation({
    mutationFn: (id: string) =>
      api.patch(`warnings/${id}`).then((res) => res.data),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: [warning, "active-warnings"] }),
  });
  return { getActiveWarnings, updateStatus };
};

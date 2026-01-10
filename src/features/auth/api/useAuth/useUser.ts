import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "..";
import type { IAuthUser, UserFieldType } from "../../../../shared/lib/types";

export const user = "user";

export const useUser = () => {
  const client = useQueryClient();
  const createUser = useMutation({
    mutationFn: (data: UserFieldType) =>
      api.post("users", data).then((res) => res.data),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: [user, "all-users"] }),
  });

  const signIn = useMutation({
    mutationFn: (data: IAuthUser) =>
      api.post("users/login", data).then((res) => res.data),
  });

  const getUser = () =>
    useQuery({
      queryKey: [user, "profile"],
      queryFn: () => api.get("users/profile").then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const getAllUsers = (params?: any) =>
    useQuery({
      queryKey: [user, "all-users", params],
      queryFn: () => api.get("users", { params }).then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const updateUser = useMutation({
    mutationFn: ({ data, id }: { data: any; id: string }) =>
      api.patch(`users/${id}`, data).then((res) => res.data),
    onSuccess: () => client.invalidateQueries({ queryKey: [user, "profile"] }),
  });

  return { createUser, signIn, getUser, getAllUsers, updateUser };
};

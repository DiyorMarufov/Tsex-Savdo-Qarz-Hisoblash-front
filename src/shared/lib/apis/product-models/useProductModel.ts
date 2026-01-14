import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "../../../../features/auth/api";

export const product_model = "product_model";

export const useProductModel = () => {
  const client = useQueryClient();
  const createProductModel = useMutation({
    mutationFn: (data: any) =>
      api.post("product-models", data).then((res) => res.data),
    onSuccess: () => (
      client.invalidateQueries({
        queryKey: [product_model, "all-product-models"],
      }),
      client.invalidateQueries({
        queryKey: [product_model, "all-infinite-products-models"],
      })
    ),
  });

  const getAllProductModels = (params?: any) =>
    useQuery({
      queryKey: [product_model, "all-product-models", params],
      queryFn: () =>
        api.get("product-models", { params }).then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const getInfiniteProductModels = (enabled: boolean = false, params?: any) =>
    useInfiniteQuery({
      queryKey: [product_model, "all-infinite-product-models", params],
      queryFn: ({ pageParam = 1 }) =>
        api
          .get("product-models/reports/filters-list", {
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

  const getProductModelByIdForFilter = (id: string) =>
    useQuery({
      queryKey: [product_model, "product-model-by-id", id],
      queryFn: () =>
        api.get(`product-models/filters-list/${id}`).then((res) => res.data),
      enabled: !!id,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      gcTime: Infinity,
    });

  return {
    createProductModel,
    getAllProductModels,
    getInfiniteProductModels,
    getProductModelByIdForFilter,
  };
};

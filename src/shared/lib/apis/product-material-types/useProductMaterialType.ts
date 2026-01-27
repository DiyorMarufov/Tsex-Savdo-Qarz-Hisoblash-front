import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../features/auth/api";

export const product_material_type = "product_material_type";

export const useProductMaterialType = () => {
  const getAllProductMaterialTypesForFilter = (params?: any) =>
    useQuery({
      queryKey: [
        product_material_type,
        "all-product-material-types-for-filter",
        params,
      ],
      queryFn: () =>
        api
          .get("product-material-types/filters-list", { params })
          .then((res) => res.data),
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      gcTime: 1000 * 60 * 60,
    });
  return { getAllProductMaterialTypesForFilter };
};

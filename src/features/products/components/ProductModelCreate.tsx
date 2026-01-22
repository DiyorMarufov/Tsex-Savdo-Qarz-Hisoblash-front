import { Button, Form, Input, Select, type FormProps } from "antd";
import { Plus } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../../../shared/lib/apis/shops/useShop";
import { useTsex } from "../../../shared/lib/apis/tsexes/useTsex";
import { useApiNotification } from "../../../shared/hooks/api-notification/useApiNotification";
import { useProductModel } from "../../../shared/lib/apis/product-models/useProductModel";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import { debounce } from "../../../shared/lib/functions/debounce";
import {
  productCategories,
  productSizeOptions,
} from "../../../shared/lib/constants";
import { useProductCategory } from "../../../shared/lib/apis/product-categories/useProductCategory";
import type { QueryParams } from "../../../shared/lib/types";

type FieldType = {
  name: string;
  category_id: string;
  price: string;
  size: string;
  tsex_id: string;
  shop_id: string;
};

const ProductModelCreate = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [isTsexOpen, setIsTsexOpen] = useState<boolean>(false);
  const [isShopOpen,] = useState<boolean>(true);
  const { getParam, setParams } = useParamsHook();
  const [, setCategorySearch] = useState(getParam("category_search") || "");

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { getAllProductCategoriesForFilter } = useProductCategory();
  const { getAllShopsForProductsFilter } = useShop();
  const { getAllTsexesForProductsFilter } = useTsex();
  const { createProductModel } = useProductModel();
  const { handleApiError } = useApiNotification();

  // Query starts
  const query: QueryParams = useMemo(() => {
    const categorySearch = getParam("category_search") || undefined;

    return { categorySearch };
  }, [getParam]);
  // Query ends

  const onFinish: FormProps<FieldType>["onFinish"] = (values: FieldType) => {
    const { price } = values;

    const data = {
      ...values,
      price: String(price).replace(/\D/g, ""),
    };

    createProductModel.mutate(data, {
      onSuccess: () => {
        form.resetFields();
        navigate("/admin/models");
      },
      onError: (err: any) => {
        const status = err?.response?.data?.statusCode;
        const msg = err?.response?.data?.message;

        if (status === 409 && msg.startsWith("Model already exists")) {
          handleApiError("Model allaqachon mavjud", "topRight");
          return;
        } else if (
          status === 400 &&
          msg.startsWith("Price should not be negative")
        ) {
          handleApiError("Narx pozitiv bo'lishi kerak", "topRight");
          return;
        } else if (status === 404 && msg.startsWith("Category with ID")) {
          handleApiError("Kategoriya topilmadi", "topRight");
          return;
        } else if (status === 404 && msg.startsWith("Tsex with ID")) {
          handleApiError("Tsex topilmadi", "topRight");
          return;
        } else if (status === 404 && msg.startsWith("Shop with ID")) {
          handleApiError("Do'kon topilmadi", "topRight");
          return;
        } else if (status === 404 && msg.startsWith("User with ID")) {
          handleApiError("Superadmin topilmadi", "topRight");
          return;
        } else {
          handleApiError("Serverda xato", "topRight");
          return;
        }
      },
    });
  };

  // Search starts
  const debouncedSetCategorySearchQuery = useCallback(
    debounce((nextValue: string) => {
      setParams({
        category_search: nextValue || "",
      });
    }, 500),
    [setParams],
  );

  const handleCategorySearchChange = (value: string) => {
    setCategorySearch(value);

    if (!value.trim()) {
      debouncedSetCategorySearchQuery("");
      return;
    }

    const englishKey = Object.keys(productCategories).find((key) =>
      productCategories[key].toLowerCase().includes(value.toLowerCase()),
    );
    debouncedSetCategorySearchQuery(englishKey as string);
  };
  // Search ends

  // Options start
  const { data: allProductCategories, isLoading: productCategoryLoading } =
    getAllProductCategoriesForFilter(isCategoryOpen, {
      search: query.categorySearch,
    });
  const productCategoryOptions = allProductCategories?.data?.map((ct: any) => ({
    value: ct?.id,
    label: productCategories[ct?.name],
  }));

  const { data: tsexes, isLoading: tsexLoading } =
    getAllTsexesForProductsFilter(isTsexOpen);
  const tsexesOptions =
    tsexes?.data?.map((ts) => ({
      value: ts?.id,
      label: ts?.name,
    })) || [];

  const { data: shops, isLoading: shopLoading } =
    getAllShopsForProductsFilter(isShopOpen);
  const shopsOptions =
    shops?.data?.map((st) => ({
      value: st?.id,
      label: st?.name,
    })) || [];
  // Options end

  useEffect(() => {
    if (shopsOptions) {
      const shop = shopsOptions[0];
      form.setFieldsValue({ shop_id: shop?.value });
    }
  }, [shopsOptions[0]]);

  return (
    <Form
      layout="vertical"
      className="w-full max-w-3xl mx-auto mt-10"
      onFinish={onFinish}
      form={form}
    >
      <div className="grid grid-cols-2 gap-x-6">
        <div>
          <span className="text-[16px] max-[500px]:text-[15px] text-[#232E2F] flex mb-1">
            Nomi
          </span>
          <Form.Item<FieldType>
            name="name"
            rules={[
              {
                required: true,
                message: "Model nomini kiritish majburiy!",
              },
            ]}
          >
            <Input className="h-10!" placeholder="Nomi" allowClear />
          </Form.Item>
        </div>

        <div>
          <span className="text-[16px] max-[500px]:text-[15px] text-[#232E2F] flex mb-1">
            Kategoriya
          </span>
          <Form.Item<FieldType>
            name="category_id"
            rules={[
              {
                required: true,
                message: "Model kategoriyasini tanlash majburiy!",
              },
            ]}
          >
            <Select
              showSearch
              className="h-10!"
              placeholder="Kategoriya"
              options={productCategoryOptions}
              onDropdownVisibleChange={(visible: any) => {
                if (visible) setIsCategoryOpen(true);
              }}
              onSearch={handleCategorySearchChange}
              filterOption={false}
              loading={productCategoryLoading}
              allowClear
            />
          </Form.Item>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6">
        <div>
          <span className="text-[16px] max-[500px]:text-[15px] text-[#232E2F] flex mb-1">
            Narxi
          </span>
          <Form.Item<FieldType>
            name="price"
            rules={[
              {
                required: true,
                message: "Model narxini kiritish majburiy!",
              },
              {
                validator: (_, value) => {
                  if (!value) {
                    return Promise.resolve();
                  }

                  const numericValue = Number(String(value).replace(/,/g, ""));

                  if (numericValue > 0) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error("Narx 0 dan baland bo'lishi kerak!"),
                  );
                },
              },
            ]}
            normalize={(v) =>
              v
                ? String(v)
                    .replace(/[^\d]/g, "")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : v
            }
          >
            <Input className="h-10!" placeholder="Narxi" allowClear />
          </Form.Item>
        </div>

        <div>
          <span className="text-[16px] max-[500px]:text-[15px] text-[#232E2F] flex mb-1">
            Razmeri
          </span>
          <Form.Item<FieldType>
            name="size"
            rules={[
              {
                required: true,
                message: "Model razmerini tanlash majburiy!",
              },
            ]}
          >
            <Select
              className="h-10!"
              placeholder="Razmeri"
              options={productSizeOptions}
              allowClear
            />
          </Form.Item>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6">
        <div>
          <span className="text-[16px] max-[500px]:text-[15px] text-[#232E2F] flex mb-1">
            Tsex
          </span>
          <Form.Item<FieldType>
            name="tsex_id"
            rules={[
              {
                required: true,
                message: "Tsex tanlanishi majburiy!",
              },
            ]}
          >
            <Select
              className="h-10!"
              placeholder="Tsex"
              options={tsexesOptions}
              onDropdownVisibleChange={(visible: any) => {
                if (visible) setIsTsexOpen(true);
              }}
              loading={tsexLoading}
              showSearch
              allowClear
            />
          </Form.Item>
        </div>

        <div>
          <span className="text-[16px] max-[500px]:text-[15px] text-[#232E2F] flex mb-1">
            Do'kon
          </span>
          <Form.Item<FieldType>
            name="shop_id"
            rules={[
              {
                required: true,
                message: "Do'kon tanlanishi majburiy!",
              },
            ]}
          >
            <Select
              className="h-10!"
              placeholder={shopLoading ? "Yuklanmoqda..." : "Do'kon"}
              options={shopsOptions}
              loading={shopLoading}
              allowClear
            />
          </Form.Item>
        </div>
      </div>

      <Form.Item>
        <div className="flex min-[500px]:justify-end max-[380px]:flex-col-reverse gap-4 pt-4">
          <Button
            onClick={() => navigate(-1)}
            className="h-9! bg-red-500! text-white! max-[500px]:w-full"
          >
            Bekor qilish
          </Button>{" "}
          <Button
            type="primary"
            htmlType="submit"
            className="h-9! max-[500px]:w-full"
            loading={createProductModel.isPending}
            disabled={createProductModel.isPending}
          >
            <Plus />
            Yangi model qo'shish
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default memo(ProductModelCreate);

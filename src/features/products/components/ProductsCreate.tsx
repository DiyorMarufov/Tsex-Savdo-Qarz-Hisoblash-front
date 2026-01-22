import {
  Button,
  Form,
  Input,
  Select,
  type FormProps,
  type UploadProps,
} from "antd";
import Dragger from "antd/es/upload/Dragger";
import { Inbox, Plus } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../../../shared/lib/apis/products/useProduct";
import { useApiNotification } from "../../../shared/hooks/api-notification/useApiNotification";
import {
  colorOptions,
  productMaterialTypes,
  productUnitInPackageOptions,
} from "../../../shared/lib/constants";
import { useProductMaterialType } from "../../../shared/lib/apis/product-material-types/useProductMaterialType";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import type { QueryParams } from "../../../shared/lib/types";
import { debounce } from "../../../shared/lib/functions/debounce";

type FieldType = {
  model_id: string;
  material_type_id: string;
  color: string;
  quantity: number;
  unit_in_package: number;
};

const ProductsCreate = () => {
  const [fileList, setFileList] = useState<any>(null);
  const [isMaterialTypeOpen, setIsMaterialTypeOpen] = useState<boolean>(false);
  const { getParam, setParams } = useParamsHook();
  const [, setMaterialTypeSearch] = useState(
    getParam("material_type_search") || "",
  );

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();

  const { getAllProductMaterialTypesForFilter } = useProductMaterialType();

  const { createProduct, getLatestProductForProductCreate } = useProduct();
  const { handleApiError } = useApiNotification();

  const props: UploadProps = {
    name: "image",
    multiple: false,
    capture: false,
    beforeUpload: () => false,
    fileList,
    onChange(info) {
      setFileList(info.fileList);
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  // Query starts
  const query: QueryParams = useMemo(() => {
    const categorySearch = getParam("category_search") || undefined;
    const materialTypeSearch = getParam("material_type_search") || undefined;

    return { categorySearch, materialTypeSearch };
  }, [getParam]);
  // Query ends

  const onFinish: FormProps<FieldType>["onFinish"] = (values: FieldType) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, value as string);
      }
    });

    if (fileList && fileList.length > 0) {
      fileList.forEach((file: any) => {
        if (file.originFileObj) {
          formData.append("images", file.originFileObj);
        }
      });
    }

    createProduct.mutate(formData, {
      onSuccess: () => {
        form.resetFields();
        localStorage.removeItem("tsex_id");
        navigate(`/admin/models/product/${id}`);
      },
      onError: (err: any) => {
        const status = err?.response?.data?.statusCode;
        const msg = err?.response?.data?.message;

        if (
          status === 400 &&
          msg.startsWith(
            "Price or quantity or unit in package should not be negative",
          )
        ) {
          handleApiError(
            "Narxi,miqdori,pochkadagi soni positiv bolishi kerak",
            "topRight",
          );
          return;
        } else if (status === 404 && msg.startsWith("Model with ID")) {
          handleApiError("Model topilmadi", "topRight");
          return;
        } else if (status === 404 && msg.startsWith("Category with ID")) {
          handleApiError("Kategoriya topilmadi", "topRight");
          return;
        } else if (status === 404 && msg.startsWith("Material type with ID")) {
          handleApiError("Material turi topilmadi", "topRight");
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

  // Options start

  // Search starts
  const debouncedSetMaterialTypeSearchQuery = useCallback(
    debounce((nextValue: string) => {
      setParams({
        material_type_search: nextValue || "",
      });
    }, 500),
    [setParams],
  );

  const handleMaterialTypeSearchChange = (value: string) => {
    setMaterialTypeSearch(value);

    if (!value.trim()) {
      debouncedSetMaterialTypeSearchQuery("");
      return;
    }

    const englishKey = Object.keys(productMaterialTypes).find((key) =>
      productMaterialTypes[key].toLowerCase().includes(value.toLowerCase()),
    );
    debouncedSetMaterialTypeSearchQuery(englishKey as string);
  };
  // Search ends

  // Options start

  const colorOptionsWithDot = colorOptions.map((color) => ({
    value: color.value,
    label: (
      <div className="flex items-center gap-2 py-0.5">
        <div
          className="w-3.5 h-3.5 rounded-full border border-gray-200 shrink-0 shadow-sm"
          style={{ backgroundColor: color.hex }}
        />
        <span className="text-[14px] text-slate-700 font-medium">
          {color.label}
        </span>
      </div>
    ),
  }));

  const {
    data: allProductMaterialTypes,
    isLoading: productMaterialTypeLoading,
  } = getAllProductMaterialTypesForFilter(isMaterialTypeOpen, {
    search: query.materialTypeSearch,
  });
  const productMaterialTypeOptions = allProductMaterialTypes?.data?.map(
    (ct: any) => ({
      value: ct?.id,
      label: productMaterialTypes[ct?.name],
    }),
  );

  const { data: latestProduct, isLoading: latestProductLoading } =
    getLatestProductForProductCreate(id as string);
  const productModel = latestProduct?.data?.productModel;
  const latestProductOption: any = {
    value: latestProduct?.data?.product?.unit_in_package,
    label: latestProduct?.data?.product?.unit_in_package,
  };
  // Options end

  useEffect(() => {
    if (id) {
      form.setFieldsValue({ model_id: id });
    }

    const currentUnitValue = form.getFieldValue("unit_in_package");

    if (latestProductOption?.value && !currentUnitValue) {
      form.setFieldsValue({
        unit_in_package: latestProductOption.value,
      });
    }
  }, [id, latestProductOption?.value, form]);

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
            Model
          </span>
          <Form.Item label="" noStyle>
            <Input
              className="h-10! font-medium text-slate-800"
              placeholder="Model"
              value={
                productModel
                  ? `${productModel?.name}`
                  : latestProductLoading
                    ? "Yuklanmoqda..."
                    : id
              }
              disabled
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="model_id"
            noStyle
            rules={[{ required: true }]}
          >
            <Input type="hidden" />
          </Form.Item>
        </div>
        <div>
          <span className="text-[16px] max-[500px]:text-[15px] text-[#232E2F] flex mb-1">
            Material turi
          </span>
          <Form.Item<FieldType>
            name="material_type_id"
            rules={[
              {
                required: true,
                message: "Mahsulot material turini tanlash majburiy!",
              },
            ]}
          >
            <Select
              showSearch
              className="h-10!"
              placeholder="Material turi"
              options={productMaterialTypeOptions}
              onDropdownVisibleChange={(visible: any) => {
                if (visible) setIsMaterialTypeOpen(true);
              }}
              onSearch={handleMaterialTypeSearchChange}
              loading={productMaterialTypeLoading}
              filterOption={false}
              allowClear
            />
          </Form.Item>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6">
        <div>
          <span className="text-[16px] max-[500px]:text-[15px] text-[#232E2F] flex mb-1">
            Rangi
          </span>
          <Form.Item<FieldType>
            name="color"
            rules={[
              {
                required: true,
                message: "Mahsulot rangini tanlash majburiy!",
              },
            ]}
          >
            <Select
              className="h-10!"
              placeholder="Rangi"
              options={colorOptionsWithDot}
              allowClear
            />
          </Form.Item>
        </div>
        <div>
          <span className="text-[16px] max-[500px]:text-[15px] text-[#232E2F] flex mb-1">
            Miqdori
          </span>
          <Form.Item<FieldType>
            name="quantity"
            rules={[
              {
                required: true,
                message: "Mahsulot miqdorini kiritish majburiy!",
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
                    new Error("Miqdori 0 dan baland bo'lishi kerak!"),
                  );
                },
              },
            ]}
          >
            <Input
              type="number"
              className="h-10!"
              placeholder="Miqdori"
              allowClear
            />
          </Form.Item>
        </div>
      </div>

      <div>
        <span className="text-[16px] max-[500px]:text-[15px] text-[#232E2F] flex mb-1">
          Pochkadagi soni
        </span>
        <Form.Item<FieldType>
          name="unit_in_package"
          rules={[
            {
              required: true,
              message: "Mahsulot pochkadagi sonini tanlash majburiy!",
            },
          ]}
        >
          <Select
            className="h-10!"
            placeholder="Pochkadagi soni"
            options={productUnitInPackageOptions}
            allowClear
          />
        </Form.Item>
      </div>

      <div>
        <span className="text-[16px] max-[500px]:text-[15px] text-[#232E2F] flex mb-1">
          Mahsulot rasmi
        </span>
        <Dragger
          {...props}
          className="rounded-xl border-gray-300 bg-gray-50 hover:bg-gray-100 transition-al"
        >
          <p className="ant-upload-drag-icon flex justify-center">
            <Inbox className="w-10 h-10 text-blue-500" />
          </p>
          <p className="ant-upload-text text-gray-700 font-medium">
            Click or drag file to upload your store image
          </p>
        </Dragger>
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
            loading={createProduct.isPending}
            disabled={createProduct.isPending}
          >
            <Plus />
            Yangi mahsulot qo'shish
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default memo(ProductsCreate);

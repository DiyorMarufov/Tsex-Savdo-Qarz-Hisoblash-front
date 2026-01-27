import {
  Button,
  Form,
  Input,
  Select,
  Upload,
  Image,
  type FormProps,
  type UploadProps,
  type UploadFile,
  type GetProp,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Plus } from "lucide-react";
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
import { getOptimizedWebP } from "../../../shared/lib/functions/getOptimizedWebP";

type FieldType = {
  model_id: string;
  material_type_id: string;
  color: string;
  quantity: number;
  unit_in_package: number;
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const ProductsCreate = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
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

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const props: UploadProps = {
    name: "image",
    multiple: false,
    listType: "picture-card",
    fileList,
    onPreview: handlePreview,
    beforeUpload: () => false,
    onChange({ fileList }) {
      const processedFileList = fileList.map((file) => ({
        ...file,
        status: "done" as const,
      }));
      setFileList(processedFileList);
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const query: QueryParams = useMemo(() => {
    const categorySearch = getParam("category_search") || undefined;
    const materialTypeSearch = getParam("material_type_search") || undefined;
    return { categorySearch, materialTypeSearch };
  }, [getParam]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType,
  ) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, value as string);
      }
    });

    if (fileList && fileList.length > 0) {
      const uploadPromises = fileList.map((fileItem: any, inx: number) => {
        const actualFile =
          fileItem?.originFileObj ||
          (fileItem instanceof File ? fileItem : null);
        const finalFile = actualFile || fileItem;
        return getOptimizedWebP(finalFile, `product_${inx}.webp`);
      });

      const fixedFiles = await Promise.all(uploadPromises);
      fixedFiles.forEach((file) => {
        if (file) {
          formData.append("images", file);
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

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined style={{ fontSize: "20px", color: "#666" }} />
      <div style={{ marginTop: 8, color: "#666" }}>Upload</div>
    </button>
  );

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
                  if (!value) return Promise.resolve();
                  const numericValue = Number(String(value).replace(/,/g, ""));
                  if (numericValue > 0) return Promise.resolve();
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
        <Upload {...props}>{fileList.length >= 5 ? null : uploadButton}</Upload>
        {previewImage && (
          <Image
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
      </div>

      <Form.Item>
        <div className="flex min-[500px]:justify-end max-[380px]:flex-col-reverse gap-4 pt-4">
          <Button
            onClick={() => navigate(-1)}
            className="h-9! bg-red-500! text-white! max-[500px]:w-full"
          >
            Bekor qilish
          </Button>
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

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
import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../../../shared/lib/apis/shops/useShop";
import { useTsex } from "../../../shared/lib/apis/tsexes/useTsex";
import { useProduct } from "../../../shared/lib/apis/products/useProduct";
import { useApiNotification } from "../../../shared/hooks/api-notification/useApiNotification";

type FieldType = {
  name: string;
  brand: string;
  price: number;
  quantity: number;
  unit_in_package: number;
  size: string;
  shop_id: string;
  tsex_id: string;
};

const ProductsCreate = () => {
  const [fileList, setFileList] = useState<any>(null);
  const [isTsexOpen, setIsTsexOpen] = useState<boolean>(false);
  const [isShopOpen, setIsShopOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { getAllShopsForProductsFilter } = useShop();
  const { getAllTsexesForProductsFilter } = useTsex();
  const { createProduct } = useProduct();
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

  const onFinish: FormProps<FieldType>["onFinish"] = (values: FieldType) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (key === "price") {
          formData.append(key, String(value).replace(/\D/g, ""));
        } else {
          formData.append(key, value as string);
        }
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
        navigate("/admin/products");
      },
      onError: (err: any) => {
        const status = err?.response?.data?.statusCode;
        const msg = err?.response?.data?.message;

        if (
          status === 400 &&
          msg.startsWith(
            "Price or quantity or unit in package should not be negative"
          )
        ) {
          handleApiError(
            "Narxi,miqdori,pochkadagi soni positiv bolishi kerak",
            "topRight"
          );
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

  // Options start
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
                message: "Mahsulot nomini kiritish majburiy!",
              },
            ]}
          >
            <Input className="h-10!" placeholder="Nomi" />
          </Form.Item>
        </div>

        <div>
          <span className="text-[16px] max-[500px]:text-[15px] text-[#232E2F] flex mb-1">
            Brand
          </span>
          <Form.Item<FieldType>
            name="brand"
            rules={[
              {
                required: true,
                message: "Mahsulot brandini kiritish majburiy!",
              },
            ]}
          >
            <Input className="h-10!" placeholder="Brand" />
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
                message: "Mahsulot narxini kiritish majburiy!",
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
                    new Error("Narx 0 dan baland bo'lishi kerak!")
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
            <Input className="h-10!" placeholder="Narxi" />
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
                    new Error("Miqdori 0 dan baland bo'lishi kerak!")
                  );
                },
              },
            ]}
          >
            <Input type="number" className="h-10!" placeholder="Miqdori" />
          </Form.Item>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6">
        <div>
          <span className="text-[16px] max-[500px]:text-[15px] text-[#232E2F] flex mb-1">
            Pochkadagi soni
          </span>
          <Form.Item<FieldType>
            name="unit_in_package"
            rules={[
              {
                required: true,
                message: "Mahsulot pochkadagi sonini kiritish majburiy!",
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
                    new Error("Pochkadagi soni 0 dan baland bo'lishi kerak!")
                  );
                },
              },
            ]}
          >
            <Input className="h-10!" placeholder="Pochkadagi soni" />
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
                message: "Mahsulot razmerini kiritish majburiy!",
              },
            ]}
          >
            <Input className="h-10!" placeholder="Razmeri" />
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
              placeholder="Do'kon"
              options={shopsOptions}
              onDropdownVisibleChange={(visible: any) => {
                if (visible) setIsShopOpen(true);
              }}
              loading={shopLoading}
              allowClear
            />
          </Form.Item>
        </div>
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
        <div className="flex justify-end gap-4 pt-4 max-[500px]:flex-col-reverse">
          <Button
            onClick={() => navigate(-1)}
            className="h-10! bg-red-500! text-white!"
          >
            Bekor qilish
          </Button>{" "}
          <Button
            type="primary"
            htmlType="submit"
            className="h-10!"
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

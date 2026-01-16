import { Button, Form, Input, Select, type FormProps } from "antd";
import { Plus } from "lucide-react";
import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../../../shared/lib/apis/shops/useShop";
import { useTsex } from "../../../shared/lib/apis/tsexes/useTsex";
import { useApiNotification } from "../../../shared/hooks/api-notification/useApiNotification";
import { useProductModel } from "../../../shared/lib/apis/product-models/useProductModel";

type FieldType = {
  name: string;
  brand: string;
  shop_id: string;
  tsex_id: string;
};

const ProductModelCreate = () => {
  const [isTsexOpen, setIsTsexOpen] = useState<boolean>(false);
  const [isShopOpen, setIsShopOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { getAllShopsForProductsFilter } = useShop();
  const { getAllTsexesForProductsFilter } = useTsex();
  const { createProductModel } = useProductModel();
  const { handleApiError } = useApiNotification();

  const onFinish: FormProps<FieldType>["onFinish"] = (values: FieldType) => {
    createProductModel.mutate(values, {
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
            <Input className="h-10!" placeholder="Nomi" allowClear />
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
            <Input className="h-10!" placeholder="Brand" allowClear />
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

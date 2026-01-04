import {
  Button as AntdButton,
  Form,
  Input,
  Select,
  type FormProps,
  type UploadProps,
} from "antd";
import Dragger from "antd/es/upload/Dragger";
import { Inbox, Plus } from "lucide-react";
import { memo, useState } from "react";
import Button from "../../../shared/ui/Button/Button";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [form] = Form.useForm();

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
    console.log(values);
  };
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
            rules={[
              {
                required: true,
                message: "Mahsulot nomini kiritish majburiy!",
              },
            ]}
            name="name"
          >
            <Input className="h-10!" placeholder="Nomi" />
          </Form.Item>
        </div>

        <div>
          <span className="text-[16px] max-[500px]:text-[15px] text-[#232E2F] flex mb-1">
            Brand
          </span>
          <Form.Item<FieldType>
            rules={[
              {
                required: true,
                message: "Mahsulot brandini kiritish majburiy!",
              },
            ]}
            name="brand"
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
            rules={[
              {
                required: true,
                message: "Mahsulot narxini kiritish majburiy!",
              },
            ]}
            name="price"
          >
            <Input className="h-10!" placeholder="Narxi" />
          </Form.Item>
        </div>

        <div>
          <span className="text-[16px] max-[500px]:text-[15px] text-[#232E2F] flex mb-1">
            Miqdori
          </span>
          <Form.Item<FieldType>
            rules={[
              {
                required: true,
                message: "Mahsulot miqdorini kiritish majburiy!",
              },
            ]}
            name="quantity"
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
            rules={[
              {
                required: true,
                message: "Mahsulot pochkadagi sonini kiritish majburiy!",
              },
            ]}
            name="unit_in_package"
          >
            <Input className="h-10!" placeholder="Pochkadagi soni" />
          </Form.Item>
        </div>

        <div>
          <span className="text-[16px] max-[500px]:text-[15px] text-[#232E2F] flex mb-1">
            Razmeri
          </span>
          <Form.Item<FieldType>
            rules={[
              {
                required: true,
                message: "Mahsulot razmerini kiritish majburiy!",
              },
            ]}
            name="size"
          >
            <Input className="h-10!" placeholder="Razmeri" />
          </Form.Item>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6">
        <div>
          <span className="text-[16px] max-[500px]:text-[15px] text-[#232E2F] flex mb-1">
            Do'kon
          </span>
          <Form.Item<FieldType>
            rules={[
              {
                required: true,
                message: "Do'kon tanlanishi majburiy!",
              },
            ]}
            name="shop_id"
          >
            <Select className="h-10!" placeholder="Do'kon" />
          </Form.Item>
        </div>

        <div>
          <span className="text-[16px] max-[500px]:text-[15px] text-[#232E2F] flex mb-1">
            Tsex
          </span>
          <Form.Item<FieldType>
            rules={[
              {
                required: true,
                message: "Tsex tanlanishi majburiy!",
              },
            ]}
            name="tsex_id"
          >
            <Select className="h-10!" placeholder="Tsex" />
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
          <AntdButton
            onClick={() => navigate(-1)}
            className="h-10! bg-red-500! text-white!"
          >
            Bekor qilish
          </AntdButton>{" "}
          <Button type="primary" htmlType="submit" className="h-10!">
            <Plus />
            Yengi mahsulot qo'shish
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default memo(ProductsCreate);

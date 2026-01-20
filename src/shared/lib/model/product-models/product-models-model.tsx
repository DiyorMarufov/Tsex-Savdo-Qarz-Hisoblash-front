import type { ProColumns } from "@ant-design/pro-table";
import { Image, Popconfirm } from "antd";
import { Edit, Trash } from "lucide-react";
import { QuestionCircleOutlined } from "@ant-design/icons";

export type ProductModelTableItem = {
  id: string;
  name: string;
  brand: string;
  shop: {
    id: string;
    name: string;
  };
  tsex: {
    id: string;
    name: string;
  };
  products: {
    images: {
      id: string;
      image_url: string;
    }[];
  }[];
  created_at: string;
};

export const productModelColumns = (
  handleOpenDetail: (id: string) => void,
  {
    handleDelete,
    deleteProductModelById,
  }: {
    handleDelete: (id: string) => void;
    deleteProductModelById: any;
  },
): ProColumns<ProductModelTableItem>[] => [
  {
    title: "Rasm",
    dataIndex: "images",
    key: "model_image",
    width: 80,
    hideInSearch: true,
    render: (_, record) => (
      <Image
        src={record.products?.[0]?.images?.[0]?.image_url ?? undefined}
        alt={record.name}
        style={{
          width: "40px",
          height: "40px",
          objectFit: "contain",
          borderRadius: "4px",
        }}
      />
    ),
  },
  {
    title: "Model Nomi",
    dataIndex: "name",
    width: 120,
    render: (_, record) => <a>{record.name}</a>,
  },
  {
    title: "Brendi",
    dataIndex: "brand",
    width: 120,
  },
  {
    title: "Tsex (Ishlab chiqaruvchi)",
    dataIndex: ["tsex", "name"],
    width: 150,
  },
  {
    title: "Do'kon",
    dataIndex: ["shop", "name"],
    width: 150,
  },
  {
    title: "Yaratilgan sana",
    dataIndex: "created_at",
    width: 160,
    valueType: "dateTime",
    sorter: true,
    hideInSearch: true,
  },
  {
    title: "Amallar",
    width: 100,
    valueType: "option",
    render: (_, record) => (
      <div className="flex gap-3">
        <Edit className="text-green-600 cursor-pointer hover:opacity-80" />
        <Popconfirm
          title="Tasdiqlash"
          description="Rostdan o'chirmohchimisz?"
          okText="Ha"
          cancelText="Yo'q"
          onConfirm={() => handleDelete?.(record.id)}
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          okButtonProps={{
            danger: true,
            disabled: deleteProductModelById.isPending,
            loading: deleteProductModelById.isPending,
          }}
        >
          <Trash className="text-red-600 cursor-pointer hover:opacity-80" />
        </Popconfirm>
      </div>
    ),
  },
  {
    title: "",
    key: "action",
    width: 90,
    render: (_, record) => (
      <div
        className="text-[15px] text-green-500 cursor-pointer hover:opacity-80"
        onClick={() => handleOpenDetail(record.id)}
      >
        Batafsil
      </div>
    ),
  },
];

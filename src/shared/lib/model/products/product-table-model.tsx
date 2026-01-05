import type { ProColumns } from "@ant-design/pro-table";
import { Image } from "antd";
import { Edit } from "lucide-react";

export type ProductTableListItem = {
  id: string;
  name: string;
  brand: string;
  price: number;
  images: [{ id: string; image_url: string }];
  created_at: Date;
};

export const productColumns = (
  handleOpenDetail: any
): ProColumns<ProductTableListItem>[] => [
  {
    title: "Rasm",
    dataIndex: "image",
    key: "product_image",
    width: 80,
    fixed: "left",
    render: (_, record) => (
      <Image
        src={record.images[0].image_url || "https://via.placeholder.com/50"}
        alt={record.name}
        style={{
          width: "40px",
          height: "40px",
          objectFit: "contain",
        }}
      />
    ),
  },
  {
    title: "Nomi",
    dataIndex: "name",
    width: 150,
    render: (_, record) => <a>{record.name}</a>,
  },
  {
    title: "Brendi",
    dataIndex: "brand",
    width: 120,
  },
  {
    title: "Narxi",
    dataIndex: "price",
    width: 120,
    render: (_, record) => (
      <div className="text-green-600 font-bold">
        {record.price.toLocaleString()}
      </div>
    ),
  },
  {
    title: "Kiritilgan sana",
    dataIndex: "created_at",
    width: 160,
    valueType: "dateTime",
    sorter: true,
  },
  {
    title: "Amallar",
    width: 100,
    valueType: "option",
    render: (_) => (
      <div className="flex gap-3">
        <Edit className="text-green-600 cursor-pointer hover:opacity-80" />
      </div>
    ),
  },
  {
    title: "",
    key: "",
    width: 70,
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

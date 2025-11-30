import type { ProColumns } from "@ant-design/pro-table";
import { Edit, Trash } from "lucide-react";

export type ProductTableListItem = {
  id: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  unit_in_package: number;
  size: string;
  shop: any;
  tsex: any;
  created_by: any;
  created_at: Date;
  actions: any;
};

export const columns: ProColumns<ProductTableListItem>[] = [
  {
    title: "Nomi",
    dataIndex: "name",
    width: 120,
    fixed: "left",
    render: (_, record) => <a>{record.name}</a>,
  },
  {
    title: "Brendi",
    dataIndex: "brand",
    width: 110,
  },
  {
    title: "Narxi",
    dataIndex: "price",
    width: 100,
    align: "right",
    render: (_, record) => record.price.toLocaleString(),
  },
  {
    title: "Miqdori",
    dataIndex: "quantity",
    width: 70,
    align: "right",
  },
  {
    title: "Pochkadagi soni",
    dataIndex: "unit_in_package",
    width: 130,
    align: "right",
  },
  {
    title: "O‘lchami",
    dataIndex: "size",
    width: 100,
  },
  {
    title: "Do‘kon",
    dataIndex: ["shop", "name"],
    width: 120,
    render: (_, record) => record.shop?.name ?? "-",
  },
  {
    title: "Tsex",
    dataIndex: ["tsex", "name"],
    width: 120,
    render: (_, record) => record.tsex?.name ?? "-",
  },
  {
    title: "Kim kiritgan",
    dataIndex: ["created_by", "full_name"],
    width: 140,
    render: (_, record) => record.created_by?.full_name ?? "-",
  },
  {
    title: "Kiritilgan sana",
    dataIndex: "created_at",
    width: 160,
    valueType: "dateTime",
  },
  {
    key: 11,
    title: "Amallar",
    width: 150,
    valueType: "option",
    render: (_) => (
      <div className="flex gap-3">
        <Edit className="text-green-600 cursor-pointer hover:opacity-80" />
        <Trash className="text-red-600 cursor-pointer hover:opacity-80" />
      </div>
    ),
  },
];

export const fakeProducts: ProductTableListItem[] = [
  {
    id: "1",
    name: "Sport krossovka",
    brand: "Nike Air Max",
    price: 450000,
    quantity: 35,
    unit_in_package: 1,
    size: "39-43",
    shop: { name: "Sneaker Store" },
    tsex: { name: "Krossovka tsexi" },
    created_by: { full_name: "Diyor Marufov" },
    created_at: new Date("2024-11-15T11:20:00"),
    actions: {},
  },
  {
    id: "2",
    name: "Qishki etik",
    brand: "Columbia",
    price: 720000,
    quantity: 18,
    unit_in_package: 1,
    size: "39-43",
    shop: { name: "Winter Shoes" },
    tsex: { name: "Etik tsexi" },
    created_by: { full_name: "Admin User" },
    created_at: new Date("2024-11-10T09:50:00"),
    actions: {},
  },
  {
    id: "3",
    name: "Dukli tapochka",
    brand: "Lider",
    price: 38000,
    quantity: 150,
    unit_in_package: 10,
    size: "39-43",
    shop: { name: "Home Market" },
    tsex: { name: "Tapochka tsexi" },
    created_by: { full_name: "Sardor Bek" },
    created_at: new Date("2024-11-12T15:10:00"),
    actions: {},
  },
  {
    id: "4",
    name: "Erkaklar tuflisi",
    brand: "Bata",
    price: 260000,
    quantity: 25,
    unit_in_package: 1,
    size: "39-43",
    shop: { name: "Classic Shoes" },
    tsex: { name: "Tufli tsexi" },
    created_by: { full_name: "Diyor Marufov" },
    created_at: new Date("2024-11-11T13:05:00"),
    actions: {},
  },
  {
    id: "5",
    name: "Ayollar krossovkasi",
    brand: "Adidas",
    price: 390000,
    quantity: 40,
    unit_in_package: 1,
    size: "39-43",
    shop: { name: "Sneaker Store" },
    tsex: { name: "Krossovka tsexi" },
    created_by: { full_name: "Admin User" },
    created_at: new Date("2024-11-05T17:30:00"),
    actions: {},
  },
];

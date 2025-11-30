import type { ProColumns } from "@ant-design/pro-table";
import { Edit } from "lucide-react";

export type SaleItemsTableListItem = {
  id?: string;
  sale: { id: string; total_sum: number; created_at: Date };
  product: any;
  quantity: number;
  price: number;
  total_amount: number;
  created_at: Date;
  actions?: any;
};

export const salesItemColumns: ProColumns<SaleItemsTableListItem>[] = [
  {
    title: "Mahsulot",
    dataIndex: ["product", "name"], // Product obyekti ichidagi name
    width: 120,
    fixed: "left",
    sorter: true,
    render: (_, record) => record.product?.name ?? "-",
  },
  {
    title: "Soni",
    dataIndex: "quantity",
    width: 100,
    valueType: "digit", // Raqam formatida ko'rsatish
    hideInSearch: true,
  },
  {
    title: "Narxi",
    dataIndex: "price",
    width: 140,
    sorter: true,
    hideInSearch: true,
    render: (_, record) => {
      const formattedAmount = record.price.toLocaleString();
      return (
        <span className="font-bold text-green-600">{formattedAmount}</span>
      );
    },
  },
  {
    title: "Umumiy Summa",
    dataIndex: "total_amount",
    width: 160,
    sorter: true,
    render: (_, record) => (
      <span className="font-bold text-green-600">
        {record.total_amount.toLocaleString()}
      </span>
    ),
  },
  {
    title: "Sotuv Sanasi",
    dataIndex: "created_at",
    width: 180,
    valueType: "dateTime",
    sorter: true,
    search: false,
  },
  {
    title: "Amallar",
    key: "actions",
    width: 100,
    valueType: "option",
    render: () => (
      <div className="flex items-center ml-4">
        <Edit className="text-green-600 cursor-pointer hover:opacity-80" />
      </div>
    ),
  },
];

export const fakeSalesItems: SaleItemsTableListItem[] = [
  {
    id: "si1",
    sale: {
      id: "SOTUV-001",
      total_sum: 9500000,
      created_at: new Date("2025-11-29T10:00:00"),
    },
    product: { name: "Samsung Galaxy S23", category: "Telefonlar" },
    quantity: 1,
    price: 9500000,
    total_amount: 9500000,
    created_at: new Date("2025-11-29T10:00:00"),
  },
  {
    id: "si2",
    sale: {
      id: "SOTUV-001",
      total_sum: 9500000,
      created_at: new Date("2025-11-29T10:00:00"),
    },
    product: { name: "Himoya Plenkasi", category: "Aksessuarlar" },
    quantity: 2,
    price: 35000,
    total_amount: 70000,
    created_at: new Date("2025-11-29T10:01:00"),
  },
  {
    id: "si3",
    sale: {
      id: "SOTUV-002",
      total_sum: 9500000,
      created_at: new Date("2025-11-29T14:30:00"),
    },
    product: { name: "HP ProBook Laptop", category: "Kompyuterlar" },
    quantity: 1,
    price: 15000000,
    total_amount: 15000000,
    created_at: new Date("2025-11-29T14:30:00"),
  },
  {
    id: "si4",
    sale: {
      id: "SOTUV-003",
      total_sum: 9500000,
      created_at: new Date("2025-11-30T09:15:00"),
    },
    product: { name: "USB-C kabel", category: "Aksessuarlar" },
    quantity: 5,
    price: 15000,
    total_amount: 75000,
    created_at: new Date("2025-11-30T09:15:00"),
  },
  {
    id: "si5",
    sale: {
      id: "SOTUV-004",
      total_sum: 9500000,
      created_at: new Date("2025-11-30T11:05:00"),
    },
    product: { name: "Smart Watch T500", category: "Gadjetlar" },
    quantity: 1,
    price: 350000,
    total_amount: 350000,
    created_at: new Date("2025-11-30T11:05:00"),
  },
];

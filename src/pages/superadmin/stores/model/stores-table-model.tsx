import type { ProColumns } from "@ant-design/pro-table";
import { Edit, Trash } from "lucide-react";

export type StoresTableListItem = {
  id: string;
  name: string;
  address: string;
  created_at: Date;
  actions: any;
};

export const storesColumns: ProColumns<StoresTableListItem>[] = [
  {
    title: "Do‘kon nomi",
    dataIndex: "name",
    width: 130,
    fixed: "left",
    render: (_, record) => <a>{record.name}</a>,
  },
  {
    title: "Manzil",
    dataIndex: "address",
    width: 200,
  },
  {
    title: "Kiritilgan sana",
    dataIndex: "created_at",
    valueType: "dateTime",
    width: 180,
  },
  {
    title: "Amallar",
    key: "actions",
    valueType: "option",
    width: 120,
    render: (_) => (
      <div className="flex gap-3">
        <Edit className="text-green-600 cursor-pointer hover:opacity-80" />
        <Trash className="text-red-600 cursor-pointer hover:opacity-80" />
      </div>
    ),
  },
];

export const fakeStores: StoresTableListItem[] = [
  {
    id: "1",
    name: "Sneaker Store",
    address: "Toshkent, Chilonzor 17",
    created_at: new Date("2024-11-15T11:20:00"),
    actions: {},
  },
  {
    id: "2",
    name: "Winter Shoes",
    address: "Toshkent, Sergeli 5",
    created_at: new Date("2024-11-10T09:50:00"),
    actions: {},
  },
  {
    id: "3",
    name: "Home Market",
    address: "Toshkent, Yunusobod 12",
    created_at: new Date("2024-11-12T15:10:00"),
    actions: {},
  },
  {
    id: "4",
    name: "Classic Shoes",
    address: "Toshkent, Shayhontohur 3",
    created_at: new Date("2024-11-11T13:05:00"),
    actions: {},
  },
  {
    id: "5",
    name: "Adidas Store",
    address: "Toshkent, Mirzo Ulug‘bek 9",
    created_at: new Date("2024-11-05T17:30:00"),
    actions: {},
  },
];

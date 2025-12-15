import type { ProColumns } from "@ant-design/pro-table";
import { Edit, Trash } from "lucide-react";

export type StoresTableListItem = {
  id: string;
  name: string;
  address: string;
  created_at: Date;
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

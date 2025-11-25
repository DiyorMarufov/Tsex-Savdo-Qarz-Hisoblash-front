import type { ProColumns } from "@ant-design/pro-table";
import { Edit, Trash } from "lucide-react";

export type TsexTableListItem = {
  id: string;
  name: string;
  tsex: any;
  balance: number;
  created_at: Date;
  actions: any;
};

export const tsexColumns: ProColumns<TsexTableListItem>[] = [
  {
    title: "Nomi",
    dataIndex: "name",
    width: 100,
    fixed: "left",
    render: (_, record) => <a>{record.name}</a>,
  },
  {
    title: "Tsex",
    dataIndex: ["tsex", "name"],
    width: 150,
    render: (_, record) => record.tsex?.name ?? "-",
  },
  {
    title: "Balans",
    dataIndex: "balance",
    width: 100,
    align: "right",
  },
  {
    title: "Kiritilgan sana",
    dataIndex: "created_at",
    valueType: "dateTime",
    width: 130,
  },
  {
    title: "Amallar",
    key: "actions",
    valueType: "option",
    width: 120,
    render: () => (
      <div className="flex gap-3">
        <Edit className="text-green-600 cursor-pointer hover:opacity-80" />
        <Trash className="text-red-600 cursor-pointer hover:opacity-80" />
      </div>
    ),
  },
];

export const fakeTsexData: TsexTableListItem[] = [
  {
    id: "1",
    name: "Krossovka tsexi",
    tsex: { name: "Krossovka tsexi" },
    balance: 15000000,
    created_at: new Date("2024-11-15T11:20:00"),
    actions: {},
  },
  {
    id: "2",
    name: "Etik tsexi",
    tsex: { name: "Etik tsexi" },
    balance: 8400000,
    created_at: new Date("2024-11-10T09:50:00"),
    actions: {},
  },
  {
    id: "3",
    name: "Tapochka tsexi",
    tsex: { name: "Tapochka tsexi" },
    balance: 4200000,
    created_at: new Date("2024-11-12T15:10:00"),
    actions: {},
  },
  {
    id: "4",
    name: "Tufli tsexi",
    tsex: { name: "Tufli tsexi" },
    balance: 12600000,
    created_at: new Date("2024-11-11T13:05:00"),
    actions: {},
  },
  {
    id: "5",
    name: "Sport poyabzal tsexi",
    tsex: { name: "Sport poyabzal tsexi" },
    balance: 9700000,
    created_at: new Date("2024-11-05T17:30:00"),
    actions: {},
  },
];

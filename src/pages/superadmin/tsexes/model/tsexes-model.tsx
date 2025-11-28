import type { ProColumns } from "@ant-design/pro-table";
import { Edit, Trash } from "lucide-react";

export type TsexTableListItem = {
  id: string;
  name: string;
  tsex: any;
  balance: number;
  last_operation: string;
  created_at: Date;
  details?: string;
};

export const tsexColumns = (
  onOpenDetail: any
): ProColumns<TsexTableListItem>[] => [
  {
    title: "Nomi",
    dataIndex: "name",
    width: 100,
    fixed: "left",
    render: (_, record) => <a>{record.name}</a>,
  },
  {
    title: "Tsex Manager",
    dataIndex: ["tsex", "name"],
    width: 150,
    render: (_, record) => record.tsex?.name ?? "-",
  },
  {
    title: "Balans",
    dataIndex: "balance",
    width: 100,
    align: "right",
    render: (_, record) =>
      record.balance > 0 ? (
        <div className="text-red-600">- {record.balance.toLocaleString()}</div>
      ) : (
        <div className="text-green-600">
          + {record.balance.toLocaleString()}
        </div>
      ),
  },
  {
    title: "Oxirgi operatsiya",
    dataIndex: "last_operation",
    width: 160,
    render: (_, record) => (
      <div className="text-[#688C74]">{record.last_operation}</div>
    ),
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
  {
    title: "",
    key: "",
    width: 70,
    render: (_, record) => (
      <div
        className="text-[15px] text-green-500 cursor-pointer hover:opacity-80"
        onClick={() => onOpenDetail(record.id)}
      >
        Batafsil
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
    last_operation: "To'lov (2024-07-25) +1,500,000 UZS",
    created_at: new Date("2024-11-15T11:20:00"),
  },
  {
    id: "2",
    name: "Etik tsexi",
    tsex: { name: "Etik tsexi" },
    balance: 8400000,
    last_operation: "To'lov (2024-07-25) +1,500,000 UZS",
    created_at: new Date("2024-11-10T09:50:00"),
  },
  {
    id: "3",
    name: "Tapochka tsexi",
    tsex: { name: "Tapochka tsexi" },
    balance: 4200000,
    last_operation: "To'lov (2024-07-25) +1,500,000 UZS",
    created_at: new Date("2024-11-12T15:10:00"),
  },
  {
    id: "4",
    name: "Tufli tsexi",
    tsex: { name: "Tufli tsexi" },
    balance: 12600000,
    last_operation: "To'lov (2024-07-25) +1,500,000 UZS",
    created_at: new Date("2024-11-11T13:05:00"),
  },
  {
    id: "5",
    name: "Sport poyabzal tsexi",
    tsex: { name: "Sport poyabzal tsexi" },
    balance: 9700000,
    last_operation: "To'lov (2024-07-25) +1,500,000 UZS",
    created_at: new Date("2024-11-05T17:30:00"),
  },
];

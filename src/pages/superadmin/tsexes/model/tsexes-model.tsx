import type { ProColumns } from "@ant-design/pro-table";
import { Edit, Trash } from "lucide-react";

export type TsexTableListItem = {
  id: string;
  name: string;
  tsex: any;
  balance: number;
  last_operation: string;
  created_at: Date;
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
    dataIndex: ["tsex"],
    width: 150,
    render: (_, record) => record.tsex ?? "-",
  },
  {
    title: "Balans",
    dataIndex: "balance",
    width: 100,
    align: "right",
    render: (_, record) => {
      const balanceAmount = record.balance;
      const formattedAmount = Math.abs(balanceAmount).toLocaleString("uz-UZ");

      if (balanceAmount > 0) {
        return <div className="text-red-600">-{formattedAmount}</div>;
      }

      return <div className="text-green-600">{formattedAmount}</div>;
    },
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

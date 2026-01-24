import type { ProColumns } from "@ant-design/pro-table";
import { Edit, Trash } from "lucide-react";
import { formatPhoneNumber } from "../../../../shared/lib/functions/formatPhoneNumber";

export type CustomersListItemsType = {
  id?: string;
  full_name: string;
  phone_number: string;
  region: string;
  balance: number;
  last_transaction: string;
  created_at: Date;
};

export const customerColumns = (
  openDetail: any,
): ProColumns<CustomersListItemsType>[] => [
  {
    title: "F.I",
    dataIndex: "full_name",
    width: 120,
    fixed: "left",
    render: (_, record) => <a>{record.full_name}</a>,
  },
  {
    title: "Telefon Raqami",
    dataIndex: "phone_number",
    width: 150,
    render: (_, record) => formatPhoneNumber(record.phone_number),
  },
  {
    title: "Viloyat/Shahar",
    dataIndex: "region",
    width: 150,
    filters: true,
    onFilter: true,
  },
  {
    title: "Balans",
    dataIndex: "balance",
    width: 150,
    render: (_, record) => {
      const balanceAmount = record.balance;
      const formattedAmount = Math.abs(balanceAmount).toLocaleString("uz-UZ");

      if (balanceAmount > 0) {
        return <div className="text-red-600 font-bold">-{formattedAmount}</div>;
      }

      return <div className="text-green-600 font-bold">{formattedAmount}</div>;
    },
  },
  {
    title: "Oxirgi Tranzaksiya",
    dataIndex: "last_transaction",
    width: 180,
    render: (_, record) => (
      <div className="text-[#688C74]">
        {record.last_transaction ? record.last_transaction : "Hozircha yo'q"}
      </div>
    ),
  },
  {
    title: "Kiritilgan sana",
    dataIndex: "created_at",
    valueType: "dateTime",
    width: 170,
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
        onClick={() => openDetail(record.id)}
      >
        Batafsil
      </div>
    ),
  },
];

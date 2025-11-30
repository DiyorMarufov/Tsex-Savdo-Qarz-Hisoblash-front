import type { ProColumns } from "@ant-design/pro-table";
import { Edit } from "lucide-react";

export type SalesTableListItem = {
  id?: string;
  store: { name: string };
  seller: { name: string };
  customer: { name: string };
  type: "full_payment" | "partial_payment" | "real";
  total_sum: number;
  paid_amount: number;
  debt: number;
  actions?: any;
  details?: string;
};

export const salesColumns = (
  onOpenDetail: any
): ProColumns<SalesTableListItem>[] => [
  {
    title: "Do'kon",
    dataIndex: ["store", "name"], // Store obyekti ichidagi name
    width: 120,
    fixed: "left",
    sorter: true,
    render: (_, record) => <a>{record.store.name}</a>,
  },
  {
    title: "Sotuvchi",
    dataIndex: ["seller", "name"], // Seller obyekti ichidagi name
    width: 150,
    sorter: true,
    render: (_, record) => record.seller.name,
  },
  {
    title: "Mijoz",
    dataIndex: ["customer", "name"], // Customer obyekti ichidagi name
    width: 150,
    sorter: true,
    render: (_, record) => record.customer.name,
  },
  {
    title: "To'lov Turi",
    dataIndex: "type",
    width: 120,
    valueType: "select",
    valueEnum: {
      full_payment: {
        text: "To'liq To'lov",
        status: "Success",
      },
      partial_payment: {
        text: "Qisman To'lov",
        status: "Warning",
      },
      real: {
        text: "Real", // real - odatda kredit/debt degan ma'noda ishlatiladi
        status: "Error",
      },
    },
    filters: true,
    onFilter: true,
  },
  {
    title: "Summa",
    dataIndex: "total_sum",
    width: 120,
    sorter: true,
    hideInSearch: true,
    render: (_, record) => (
      <div className="text-green-600 font-bold">
        {record.total_sum.toLocaleString()}
      </div>
    ),
  },
  {
    title: "To'langan",
    dataIndex: "paid_amount",
    width: 120,
    sorter: true,
    hideInSearch: true,
    render: (_, record) => (
      <div className="text-green-600 font-bold">
        {record.paid_amount.toLocaleString()}
      </div>
    ),
  },
  {
    title: "Qarz (UZS)",
    dataIndex: "debt",
    width: 150,
    sorter: true,
    hideInSearch: true,
    render: (_, record) => {
      const debtAmount = record.debt;

      const formattedAmount = Math.abs(debtAmount).toLocaleString("uz-UZ");

      if (debtAmount > 0) {
        return <div className="text-red-600">- {formattedAmount}</div>;
      }

      return <div className="text-green-600">0</div>;
    },
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
    ), // Misol uchun bitta amal
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

export const fakeSales: SalesTableListItem[] = [
  {
    id: "s1",
    store: { name: "Markaziy Do'kon" },
    seller: { name: "Azizov Jamshid" },
    customer: { name: "Qurbonov Dilshod" },
    type: "full_payment",
    total_sum: 550000,
    paid_amount: 550000,
    debt: 0,
  },
  {
    id: "s2",
    store: { name: "Filial 1" },
    seller: { name: "Karimov Sherzod" },
    customer: { name: "Aliyeva Sevara" },
    type: "partial_payment",
    total_sum: 1200000,
    paid_amount: 500000,
    debt: 700000,
  },
  {
    id: "s3",
    store: { name: "Markaziy Do'kon" },
    seller: { name: "Azizov Jamshid" },
    customer: { name: "Valiyev G'ani" },
    type: "real",
    total_sum: 300000,
    paid_amount: 0,
    debt: 300000,
  },
  {
    id: "s4",
    store: { name: "Filial 2" },
    seller: { name: "Soliyev Lola" },
    customer: { name: "Hamidov Akmal" },
    type: "full_payment",
    total_sum: 80000,
    paid_amount: 80000,
    debt: 0,
  },
];

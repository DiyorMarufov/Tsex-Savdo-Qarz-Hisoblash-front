import type { ProColumns } from "@ant-design/pro-table";
import { Edit, Trash } from "lucide-react";

export type CustomerTranscationsListItemsType = {
  id?: string;
  customer: any;
  type:
    | "borrowing"
    | "borrow_more"
    | "repayment"
    | "paid_off"
    | "lending"
    | "lend_more"
    | "received";
  amount: number;
  due_date: Date;
  description: string;
  balance_after: number;
  status: "open" | "closed";
  created_at: Date;
};

export const transactionColumns = (
  handleOpenTransactionDetail: any
): ProColumns<CustomerTranscationsListItemsType>[] => [
  {
    title: "Mijoz F.I.",
    dataIndex: ["customer", "full_name"], // Nested field
    width: 120,
    sorter: true,
    search: false,
    fixed: "left",
    render: (_, record) => <a>{record.customer?.full_name || "Nomaʼlum"}</a>,
  },
  {
    title: "Tranzaksiya Turi",
    dataIndex: "type",
    width: 140,
    filters: true,
    onFilter: true,
    valueEnum: {
      borrowing: { text: "Qarz olish", status: "Error" },
      borrow_more: { text: "Qoʻshimcha qarz", status: "Error" },
      repayment: { text: "Qisman qaytarish", status: "Success" },
      paid_off: { text: "Toʻliq yopish", status: "Success" },
      lending: { text: "Qarz berish", status: "Warning" },
      lend_more: { text: "Qoʻshimcha berish", status: "Warning" },
      received: { text: "Qabul qilish", status: "Success" },
    },
  },
  {
    title: "Miqdor (UZS)",
    dataIndex: "amount",
    width: 120,
    align: "right",
    sorter: true,
    render: (_, record) => {
      const formattedAmount = record.amount.toLocaleString("uz-UZ");
      return (
        <span className="font-bold text-green-600">{formattedAmount}</span>
      );
    },
  },
  {
    title: "Tugash Sanasi",
    dataIndex: "due_date",
    valueType: "date", 
    width: 130,
    sorter: true,
  },
  {
    title: "Tranzaksiyadan Keyingi Balans",
    dataIndex: "balance_after",
    width: 180,
    search: false,
    render: (_, record) => {
      const balanceAmount = record.balance_after;
      const formattedAmount = Math.abs(balanceAmount).toLocaleString("uz-UZ");

      if (balanceAmount > 0) {
        return (
          <div className="text-red-600 font-bold">- {formattedAmount}</div>
        );
      }

      return <div className="text-green-600 font-bold">{formattedAmount}</div>;
    },
  },
  {
    title: "Holat",
    dataIndex: "status",
    width: 90,
    valueEnum: {
      open: { text: "Ochiq", status: "Processing" }, 
      closed: { text: "Yopilgan", status: "Success" }, 
    },
  },
  {
    title: "Izoh",
    dataIndex: "description",
    width: 250,
    ellipsis: true,
    search: false,
  },
  {
    title: "Kiritilgan sana",
    dataIndex: "created_at",
    valueType: "dateTime",
    width: 170,
  },
  {
    title: "Amallar",
    width: 100,
    valueType: "option",
    render: (_) => (
      <div className="flex gap-3">
        <Edit className="text-green-600 cursor-pointer hover:opacity-80" />
        <Trash className="text-red-600 cursor-pointer hover:opacity-80" />
      </div>
    ),
  },
  {
    title: "",
    key: "",
    width: 100,
    render: (_, record) => (
      <div
        className="text-[15px] text-green-500 cursor-pointer hover:opacity-80"
        onClick={() => handleOpenTransactionDetail(record.id)}
      >
        Batafsil
      </div>
    ),
  },
];

export const fakeTransactionData: CustomerTranscationsListItemsType[] = [
  {
    id: "1",
    customer: { id: "1", full_name: "Yusupov Akmal" },
    type: "borrowing",
    amount: 10000000,
    due_date: new Date("2026-01-15"),
    description: "Asosiy qarzni olib ketish",
    balance_after: -10000000,
    status: "open",
    created_at: new Date("2025-12-30"),
  },

  {
    id: "2",
    customer: { id: "1", full_name: "Yusupov Akmal" },
    type: "lending",
    amount: 850000,
    due_date: new Date("2025-12-30"),
    description: "Biz tomonidan berilgan tovar krediti",
    balance_after: 850000,
    status: "open",
    created_at: new Date("2025-12-30"),
  },
];

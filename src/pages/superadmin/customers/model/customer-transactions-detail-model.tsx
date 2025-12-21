import type { ProColumns } from "@ant-design/pro-table";
import { Edit, Trash } from "lucide-react";

export type CustomerTranscationDetailListItemsType = {
  id?: string;
  customer: any;
  type: "borrow-more" | "repayment" | "paid_off" | "lend-more" | "received";
  amount: number;
  description: string;
  balance_after: number;
  created_at: Date;
};

export const transactionDetailColumns: ProColumns<CustomerTranscationDetailListItemsType>[] =
  [
    {
      title: "Mijoz F.I.",
      dataIndex: ["customer", "full_name"],
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
        borrow_more: { text: "Qoʻshimcha qarz", status: "Error" },
        repayment: { text: "Qaytarish", status: "Success" },
        paid_off: { text: "Toʻliq yopish", status: "Success" },
        lend_more: { text: "Qoʻshimcha berish", status: "Warning" },
        received: { text: "Qabul qilish", status: "Success" },
      },
    },
    {
      title: "Miqdor (UZS)",
      dataIndex: "amount",
      width: 120,
      sorter: true,
      render: (_, record) => {
        const formattedAmount = record.amount.toLocaleString("uz-UZ");
        return (
          <span className="font-bold text-green-600">{formattedAmount}</span>
        );
      },
    },
    {
      title: "Tranzaksiyadan Keyingi Balans",
      dataIndex: "balance_after",
      width: 180,
      search: false,
      render: (_, record) => {
        const balanceAmount = record.balance_after;
        const formattedAmount = Math.abs(balanceAmount).toLocaleString("uz-UZ");

        if (balanceAmount < 0) {
          return (
            <div className="text-red-600 font-bold">-{formattedAmount}</div>
          );
        }

        return (
          <div className="text-green-600 font-bold">{formattedAmount}</div>
        );
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
  ];

export const fakeTransactionDetailData: CustomerTranscationDetailListItemsType[] =
  [
    {
      id: "1",
      customer: { id: "1", full_name: "Yusupov Akmal" },
      type: "borrow-more",
      amount: 10000000,
      description: "Asosiy qarzni olib ketish",
      balance_after: -10000000,
      created_at: new Date("2025-12-30"),
    },

    {
      id: "2",
      customer: { id: "1", full_name: "Yusupov Akmal" },
      type: "repayment",
      amount: 850000,
      description: "Biz tomonidan berilgan tovar krediti",
      balance_after: 850000,
      created_at: new Date("2025-12-30"),
    },
  ];

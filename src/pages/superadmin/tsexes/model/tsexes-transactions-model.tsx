import type { ProColumns } from "@ant-design/pro-table";
import { Edit } from "lucide-react";

// Type definition (takroriy, aniqlik uchun)
export type TsexTransactionsTableListItem = {
  id?: string;
  tsex: { name: string } | any;
  type: "To'liq to'lov" | "Qisman to'lov" | "Qo'shimcha to'lov" | "Mol olish";
  amount: number;
  description: string;
  balance_after: number;
  created_by: string;
  created_at: Date;
};

export const tsexTransactionsColumns: ProColumns<TsexTransactionsTableListItem>[] =
  [
    {
      title: "Tsex Nomi",
      dataIndex: ["tsex", "name"],
      width: 120,
      fixed: "left",
      render: (_, record) => <a>{record.tsex}</a>,
    },
    {
      title: "Tranzaksiya Turi",
      dataIndex: "type",
      width: 120,
      valueEnum: {
        payment: { text: "To'lov", status: "Success" },
        partial_payment: { text: "Qisman To'lov", status: "Warning" },
        avans: { text: "Avans", status: "Processing" },
        product_supply: { text: "Mol olish", status: "Error" },
      },
    },
    {
      title: "Miqdori (UZS)",
      dataIndex: "amount",
      width: 130,
      align: "right",
      render: (_, record) => (
        <div className="text-green-600">{record.amount.toLocaleString()}</div>
      ),
    },
    {
      title: "Izoh",
      dataIndex: "description",
      width: 160,
      ellipsis: true,
    },
    {
      title: "Balans (Keyin)",
      dataIndex: "balance_after",
      width: 130,
      align: "right",
      render: (_, record) => {
        const balanceAmount = record.balance_after;
        const formattedAmount = Math.abs(balanceAmount).toLocaleString("uz-UZ");

        if (balanceAmount > 0) {
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
      title: "Kim Kiritdi",
      dataIndex: ["created_by", "name"],
      width: 150,
      render: (_, record) => record.created_by ?? "-",
    },
    {
      title: "Sana va Vaqt",
      dataIndex: "created_at",
      valueType: "dateTime",
      width: 180,
      sorter: (a, b) => a.created_at.getTime() - b.created_at.getTime(),
    },
    {
      title: "Amallar",
      width: 100,
      valueType: "option",
      render: (_) => (
        <div className="flex">
          <Edit className="text-green-600 cursor-pointer hover:opacity-80" />
        </div>
      ),
    },
  ];

import type { ProColumns } from "@ant-design/pro-table";

// Type definition (takroriy, aniqlik uchun)
export type TsexTransactionsTableListItem = {
  id?: string;
  tsex: { name: string } | any;
  type: "payment" | "partial_payment" | "avans";
  amount: number;
  description: string;
  balance_after: number;
  created_by: { name: string } | any;
  created_at: Date;
};

export const tsexTransactionsColumns: ProColumns<TsexTransactionsTableListItem>[] =
  [
    {
      title: "Tsex Nomi",
      dataIndex: ["tsex", "name"],
      width: 120,
      fixed: "left",
      render: (_, record) => <a>{record.tsex.name}</a>,
    },
    {
      title: "Tranzaksiya Turi",
      dataIndex: "type",
      width: 120,
      valueEnum: {
        payment: { text: "To'lov", status: "Success" },
        partial_payment: { text: "Qisman To'lov", status: "Warning" },
        avans: { text: "Avans", status: "Processing" },
      },
    },
    {
      title: "Miqdori (UZS)",
      dataIndex: "amount",
      width: 130,
      align: "right",
      render: (_, record) => {
        const formattedAmount = record.amount.toLocaleString();
        const isNegative = record.type === "avans";
        return (
          <div className={isNegative ? "text-red-600" : "text-green-600"}>
            {isNegative ? `- ${formattedAmount}` : `+ ${formattedAmount}`}
          </div>
        );
      },
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
      render: (_, record) => record.balance_after.toLocaleString() + " UZS",
    },
    {
      title: "Kim Kiritdi",
      dataIndex: ["created_by", "name"],
      width: 150,
      render: (_, record) => record.created_by?.name ?? "-",
    },
    {
      title: "Sana va Vaqt",
      dataIndex: "created_at",
      valueType: "dateTime",
      width: 180,
      sorter: (a, b) => a.created_at.getTime() - b.created_at.getTime(),
    },
  ];

export const fakeTsexTransactionsData: TsexTransactionsTableListItem[] = [
  {
    tsex: { name: "Krossovka tsexi" },
    type: "payment",
    amount: 5500000,
    description: "Yangi buyurtma uchun to'lov.",
    balance_after: 15500000,
    created_by: { name: "Aliyev Sherzod" },
    created_at: new Date("2025-11-28T10:00:00"),
  },
  {
    tsex: { name: "Etik tsexi" },
    type: "avans",
    amount: 2000000,
    description: "Materiallar sotib olish uchun avans.",
    balance_after: 6400000,
    created_by: { name: "Valiyev Jamshid" },
    created_at: new Date("2025-11-27T15:30:00"),
  },
  {
    tsex: { name: "Krossovka tsexi" },
    type: "partial_payment",
    amount: 1500000,
    description: "Qisman to'lov, hisob-kitobni yopish.",
    balance_after: 17000000,
    created_by: { name: "Aliyev Sherzod" },
    created_at: new Date("2025-11-27T11:45:00"),
  },
  {
    tsex: { name: "Tapochka tsexi" },
    type: "payment",
    amount: 3200000,
    description: "Oylik buyurtma uchun to'liq to'lov.",
    balance_after: 7400000,
    created_by: { name: "G'aniyev Sardor" },
    created_at: new Date("2025-11-26T09:20:00"),
  },
  {
    tsex: { name: "Sport poyabzal tsexi" },
    type: "avans",
    amount: 1500000,
    description: "Kutilmagan xarajatlar uchun avans berildi.",
    balance_after: 8200000,
    created_by: { name: "Valiyev Jamshid" },
    created_at: new Date("2025-11-25T14:10:00"),
  },
];

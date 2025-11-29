import type { ProColumns } from "@ant-design/pro-table";

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
};

export const transactionColumns: ProColumns<CustomerTranscationsListItemsType>[] =
  [
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
        borrowing: { text: "Qarz oldi", status: "Error" },
        borrow_more: { text: "Qoʻshimcha qarz", status: "Error" },
        repayment: { text: "Qaytarish", status: "Success" },
        paid_off: { text: "Toʻliq yopish", status: "Success" },
        lending: { text: "Qarz berish", status: "Warning" },
        lend_more: { text: "Qoʻshimcha berish", status: "Warning" },
        received: { text: "Qaytarib olish", status: "Success" },
      },
    },
    {
      title: "Miqdor (UZS)",
      dataIndex: "amount",
      width: 120,
      align: "right",
      valueType: "money",
      sorter: true,
      render: (_, record) => {
        // Pul miqdorini formatlash
        const formattedAmount = record.amount.toLocaleString("uz-UZ");
        return <span className="font-medium">{formattedAmount}</span>;
      },
    },
    {
      title: "Tugash Sanasi",
      dataIndex: "due_date",
      valueType: "date", // Ant Design DatePicker bilan mos keladi
      width: 130,
      sorter: true,
    },
    {
      title: "Tranzaksiyadan Keyingi Balans",
      dataIndex: "balance_after",
      width: 180,
      align: "right",
      search: false,
      render: (_, record) => {
        const balance = record.balance_after;
        const formattedBalance = Math.abs(balance).toLocaleString("uz-UZ");

        if (balance > 0) {
          // Musbat: Bizga qarz/foyda
          return (
            <div className="text-green-600 font-bold">+ {formattedBalance}</div>
          );
        }
        if (balance < 0) {
          // Manfiy: Bizning qarzimiz/Zarar
          return (
            <div className="text-red-600 font-bold">- {formattedBalance}</div>
          );
        }
        // Nol
        return <div className="text-gray-500">{formattedBalance}</div>;
      },
    },
    {
      title: "Holat",
      dataIndex: "status",
      width: 90,
      valueEnum: {
        open: { text: "Ochiq", status: "Processing" }, // Davom etayotgan tranzaksiya
        closed: { text: "Yopilgan", status: "Success" }, // Yakunlangan tranzaksiya
      },
    },
    {
      title: "Izoh",
      dataIndex: "description",
      width: 250,
      ellipsis: true, // Uzun matnni qisqartirish
      search: false,
    },
  ];

export const fakeTransactionData: CustomerTranscationsListItemsType[] = [
  // --- 1-Tranzaksiya: Qarz Olish (Borrowing) ---
  {
    id: "1",
    customer: { id: "1", full_name: "Yusupov Akmal" },
    type: "borrowing",
    amount: 10000000,
    due_date: new Date("2026-01-15"),
    description: "Asosiy qarzni olib ketish",
    balance_after: -10000000, // Qarz yuki (Manfiy balans)
    status: "open",
  },

  // --- 2-Tranzaksiya: Qarzni Qaytarish (Repayment) ---
  {
    id: "2",
    customer: { id: "1", full_name: "Yusupov Akmal" },
    type: "repayment",
    amount: 3000000,
    due_date: new Date("2026-01-15"),
    description: "Birinchi to'lov (qarz qismini yopish)",
    balance_after: -7000000, // Qarz kamaydi
    status: "open",
  },

  // --- 3-Tranzaksiya: Qarzni To'liq Yopish (Paid Off) ---
  {
    id: "3",
    customer: { id: "2", full_name: "Qodirova Shahnoza" },
    type: "paid_off",
    amount: 1200000,
    due_date: new Date("2025-11-27"),
    description: "Oldingi 1.2 mln so'mlik qarz to'liq yopildi",
    balance_after: 0, // Balans 0 ga teng
    status: "closed",
  },

  // --- 4-Tranzaksiya: Qo'shimcha Qarz Olish (Borrow More) ---
  {
    id: "4",
    customer: { id: "5", full_name: "Karimov Javohir" },
    type: "borrow_more",
    amount: 500000,
    due_date: new Date("2026-02-01"),
    description: "Kutilmagan xarajatlar uchun qo'shimcha mablag'",
    balance_after: -4700000, // Oldingi -4200000 ga +500000 qo'shildi
    status: "open",
  },

  // --- 5-Tranzaksiya: Bizning Bergan Qarzimiz (Lending) ---
  {
    id: "5",
    customer: { id: "3", full_name: "Sobirov Alijon" },
    type: "lending",
    amount: 850000,
    due_date: new Date("2025-12-30"),
    description: "Biz tomonidan berilgan tovar krediti",
    balance_after: 850000, // Bizga qarzdor (Musbat balans)
    status: "open",
  },

  // --- 6-Tranzaksiya: Bergan Qarzimizdan Pulni Qaytarib Olish (Received) ---
  {
    id: "6",
    customer: { id: "3", full_name: "Sobirov Alijon" },
    type: "received",
    amount: 350000,
    due_date: new Date("2025-12-30"),
    description: "Berilgan qarzning bir qismi qoplandi",
    balance_after: 500000, // Bizga qarz qoldi
    status: "open",
  },
];

import type { ProColumns } from "@ant-design/pro-table";
import { Edit, Trash } from "lucide-react";

export type CustomersListItemsType = {
  id?: string;
  full_name: string;
  phone_number: string;
  region: string;
  balance: number;
  last_transaction: Date;
};

export const customerColumns = (
  openDetail: any
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
  },
  {
    title: "Viloyat/Shahar",
    dataIndex: "region",
    width: 150,
    filters: true,
    onFilter: true,
  },
  {
    title: "Balans (UZS)",
    dataIndex: "balance",
    width: 150,
    align: "right",
    render: (_, record) => {
      const balanceAmount = record.balance;
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
    title: "Oxirgi Tranzaksiya",
    dataIndex: "last_transaction",
    valueType: "dateTime",
    width: 180,
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

export const fakeCustomerData: CustomersListItemsType[] = [
  {
    id: "1",
    full_name: "Yusupov Akmal",
    phone_number: "+998 90 123 45 67",
    region: "Toshkent sh.",
    balance: 5500000, // Foyda (plyus)
    last_transaction: new Date("2025-11-28T10:00:00"),
  },
  {
    id: "2",
    full_name: "Qodirova Shahnoza",
    phone_number: "+998 91 987 65 43",
    region: "Samarqand viloyati",
    balance: -1200000, // Qarz (minus)
    last_transaction: new Date("2025-11-27T15:30:00"),
  },
  {
    id: "3",
    full_name: "Sobirov Alijon",
    phone_number: "+998 93 555 44 33",
    region: "Andijon viloyati",
    balance: 850000,
    last_transaction: new Date("2025-11-27T11:45:00"),
  },
  {
    id: "4",
    full_name: "Ergasheva Dilfuza",
    phone_number: "+998 94 111 22 33",
    region: "Buxoro viloyati",
    balance: 0,
    last_transaction: new Date("2025-11-26T09:20:00"),
  },
  {
    id: "5",
    full_name: "Karimov Javohir",
    phone_number: "+998 99 777 88 99",
    region: "Farg'ona viloyati",
    balance: -4200000,
    last_transaction: new Date("2025-11-25T14:10:00"),
  },
];

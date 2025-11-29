import type { ProColumns } from "@ant-design/pro-table";
import { Edit, Trash } from "lucide-react";

export type UsersTableListItem = {
  id?: string;
  full_name: string;
  phone_number: string;
  roles: { name: string };
  is_active: boolean;
  created_at: Date;
  actions: any;
};

export const userColumns: ProColumns<UsersTableListItem>[] = [
  {
    title: "F.I.SH.",
    dataIndex: "full_name",
    width: 120,
    fixed: "left",
    sorter: true,
    render: (_, record) => <a>{record.full_name}</a>,
  },
  {
    title: "Telefon Raqami",
    dataIndex: "phone_number",
    width: 150,
    search: false, // Telefon raqamida to'liq qidiruv shart emas
  },
  {
    title: "Roli",
    dataIndex: ["roles", "name"], // Roles obyekti ichidagi name
    width: 120,
    filters: true,
    onFilter: true,
    render: (_, record) => record.roles?.name ?? "-",
  },
  {
    title: "Faolligi",
    dataIndex: "is_active",
    width: 100,
    valueType: "select",
    filters: true,
    onFilter: true,
    valueEnum: {
      true: {
        text: "Aktiv",
        status: "Success",
      },
      false: {
        text: "Nofaol",
        status: "Error",
      },
    },
    render: (_, record) => {
      const isActive = record.is_active;
      return (
        <span style={{ color: isActive ? "green" : "red" }}>
          {isActive ? "Aktiv" : "Nofaol"}
        </span>
      );
    },
  },
  {
    title: "Ro'yxatga Olingan Sana",
    dataIndex: "created_at",
    width: 160,
    valueType: "dateTime", // Sana va Vaqtni ko'rsatadi
    sorter: true,
    search: false,
  },
  {
    title: "Amallar",
    key: "actions",
    width: 120,
    valueType: "option",
    render: (_) => (
      <div className="flex gap-3">
        <Edit className="text-green-600 cursor-pointer hover:opacity-80" />
        <Trash className="text-red-600 cursor-pointer hover:opacity-80" />
      </div>
    ),
  },
];

export const fakeUsers: UsersTableListItem[] = [
  {
    id: "u1",
    full_name: "Tolibov Dilshod",
    phone_number: "+998 90 123 00 01",
    roles: { name: "Administrator" },
    is_active: true,
    created_at: new Date("2024-01-10T10:00:00"),
    actions: {},
  },
  {
    id: "u2",
    full_name: "Karimova Shoira",
    phone_number: "+998 91 222 33 44",
    roles: { name: "Menejer" },
    is_active: true,
    created_at: new Date("2024-05-20T14:30:00"),
    actions: {},
  },
  {
    id: "u3",
    full_name: "Saidov G'ayrat",
    phone_number: "+998 93 555 66 77",
    roles: { name: "Ishchi" },
    is_active: false, // Nofaol foydalanuvchi
    created_at: new Date("2023-11-01T09:15:00"),
    actions: {},
  },
  {
    id: "u4",
    full_name: "Valiyeva Gulnora",
    phone_number: "+998 94 888 99 00",
    roles: { name: "Menejer" },
    is_active: true,
    created_at: new Date("2024-06-25T17:50:00"),
    actions: {},
  },
  {
    id: "u5",
    full_name: "Aliyev Jasur",
    phone_number: "+998 99 111 22 33",
    roles: { name: "Ishchi" },
    is_active: true,
    created_at: new Date("2024-03-05T11:20:00"),
    actions: {},
  },
];

import type { ProColumns } from "@ant-design/pro-table";
import { Edit, Trash } from "lucide-react";
import { formatPhoneNumber } from "../../../../shared/lib/functions/formatPhoneNumber";
import { roleTranslationToUzbek } from "../../../../shared/lib/constants";

export type UsersTableListItem = {
  id?: string;
  full_name: string;
  phone_number: string;
  roles: Array<{
    id: string;
    role: {
      id: string;
      name: string;
    };
  }>;
  is_active: boolean;
  created_at: Date;
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
    search: false,
    render: (_, record) => formatPhoneNumber(record.phone_number),
  },
  {
    title: "Roli",
    dataIndex: ["roles", "name"],
    width: 120,
    filters: true,
    onFilter: true,
    render: (_, record) =>
      roleTranslationToUzbek[
        record.roles?.[0].role.name as keyof typeof roleTranslationToUzbek
      ] ?? "-",
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
    valueType: "dateTime",
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
    id: "550e8400-e29b-41d4-a716-446655440000",
    full_name: "Tolibov Dilshod",
    phone_number: "+998 90 123 00 01",
    roles: [
      {
        id: "721a3642-2d8e-4f51-92b1-6a2d9c445101",
        role: { id: "a1b2c3d4-e5f6-4a5b-bcde-f12345678901", name: "ADMIN" },
      },
    ],
    is_active: true,
    created_at: new Date("2024-01-10T10:00:00"),
  },
  {
    id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    full_name: "Karimova Shoira",
    phone_number: "+998 91 222 33 44",
    roles: [
      {
        id: "8c9d0e1f-2a3b-4c5d-6e7f-8a9b0c1d2e3f",
        role: { id: "b2c3d4e5-f6a7-4b6c-cdef-012345678902", name: "MANAGER" },
      },
    ],
    is_active: true,
    created_at: new Date("2024-05-20T14:30:00"),
  },
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    full_name: "Saidov G'ayrat",
    phone_number: "+998 93 555 66 77",
    roles: [
      {
        id: "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
        role: { id: "c3d4e5f6-a7b8-4c9d-def0-123456789003", name: "USER" },
      },
    ],
    is_active: false,
    created_at: new Date("2023-11-01T09:15:00"),
  },
];

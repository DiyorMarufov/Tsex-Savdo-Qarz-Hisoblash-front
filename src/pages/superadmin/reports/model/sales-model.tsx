import type { ProColumns } from "@ant-design/pro-table";
import { Image } from "antd";

export type SalesTableListItem = {
  id?: string;
  shop: { name: string };
  seller: { full_name: string };
  customer: { full_name: string };
  type: "full_payment" | "partial_payment" | "real";
  total_amount: number;
  paid_amount: number;
  debt: number;
  created_at: Date;
  images?: { id: string; image_url: string }[];
};

export const salesColumns = (
  onOpenDetail: any
): ProColumns<SalesTableListItem>[] => [
  {
    title: "Do'kon",
    dataIndex: ["shop", "name"],
    width: 120,
    fixed: "left",
    sorter: true,
    render: (_, record) => <a>{record.shop.name}</a>,
  },
  {
    title: "Rasm",
    dataIndex: "images",
    width: 80,
    hideInSearch: true,
    render: (_, record) => {
      const firstImage = record.images?.[0]?.image_url;
      return (
        <div>
          {/* @ts-ignore */}
          <Image
            width={40}
            height={40}
            src={firstImage}
            fallback="https://os.alipayobjects.com/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            className="rounded-[10px] object-cover border border-gray-100"
            preview={!!firstImage}
          />
        </div>
      );
    },
  },
  {
    title: "Sotuvchi",
    dataIndex: ["seller", "name"],
    width: 150,
    sorter: true,
    render: (_, record) => record.seller.full_name,
  },
  {
    title: "Mijoz",
    dataIndex: ["customer", "name"],
    width: 150,
    sorter: true,
    render: (_, record) => record.customer.full_name,
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
        text: "Real",
        status: "Error",
      },
    },
    filters: true,
    onFilter: true,
  },
  {
    title: "Summa",
    dataIndex: "total_amount",
    width: 120,
    sorter: true,
    hideInSearch: true,
    render: (_, record) => (
      <div className="text-green-600 font-bold">
        {record.total_amount.toLocaleString()}
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
        return <div className="text-red-600">-{formattedAmount}</div>;
      }

      return <div className="text-green-600">0</div>;
    },
  },
  {
    title: "Kiritilgan sana",
    dataIndex: "created_at",
    width: 160,
    valueType: "dateTime",
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
    shop: { name: "Markaziy Do'kon" },
    seller: { full_name: "Azizov Jamshid" },
    customer: { full_name: "Qurbonov Dilshod" },
    type: "full_payment",
    total_amount: 550000,
    paid_amount: 550000,
    debt: 0,
    created_at: new Date("2024-05-20T14:30:00"),
  },
  {
    id: "s2",
    shop: { name: "Filial 1" },
    seller: { full_name: "Karimov Sherzod" },
    customer: { full_name: "Aliyeva Sevara" },
    type: "partial_payment",
    total_amount: 1200000,
    paid_amount: 500000,
    debt: 700000,
    created_at: new Date("2024-05-20T14:30:00"),
  },
  {
    id: "s3",
    shop: { name: "Markaziy Do'kon" },
    seller: { full_name: "Azizov Jamshid" },
    customer: { full_name: "Valiyev G'ani" },
    type: "real",
    total_amount: 300000,
    paid_amount: 0,
    debt: 300000,
    created_at: new Date("2024-05-20T14:30:00"),
  },
  {
    id: "s4",
    shop: { name: "Filial 2" },
    seller: { full_name: "Soliyev Lola" },
    customer: { full_name: "Hamidov Akmal" },
    type: "full_payment",
    total_amount: 80000,
    paid_amount: 80000,
    debt: 0,
    created_at: new Date("2024-05-20T14:30:00"),
  },
];

import type { ProColumns } from "@ant-design/pro-table";
import { Image } from "antd";

export type SalesTableListItem = {
  id?: string;
  shop: { name: string };
  seller: { full_name: string };
  customer: { full_name: string };
  type: "full_payment" | "real" | "avans";
  total_amount: number;
  paid_amount: number;
  debt: number;
  total_quantity: number;
  images?: { id: string; image_url: string }[];
  created_at: Date;
};

export const salesColumns = (
  onOpenDetail: any,
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
      avans: {
        text: "Avans",
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
      <div className="text-slate-700 font-bold">
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
    title: "Qarz (Real)",
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
    title: "Umumiy (pochka)",
    dataIndex: "total_quantity",
    width: 100,
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

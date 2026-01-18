import type { ProColumns } from "@ant-design/pro-table";

export type SaleItemsTableListItem = {
  id: string;
  product: string;
  product_brand: string;
  product_unit_in_package: number;
  quantity: number;
  sale_price: number;
  total_amount: number;
  created_at: string | Date;
};

export const salesItemColumns: ProColumns<SaleItemsTableListItem>[] = [
  {
    title: "Mahsulot",
    dataIndex: "product",
    width: 160,
    fixed: "left",
    sorter: true,
    render: (_, record) => <a>{record.product}</a>,
  },
  {
    title: "Brend",
    dataIndex: "product_brand",
    width: 130,
    sorter: true,
    render: (_, record) => record.product_brand,
  },
  {
    title: "Soni",
    dataIndex: "quantity",
    width: 100,
    sorter: true,
    hideInSearch: true,
    render: (_, record) => record.quantity,
  },
  {
    title: "Pochkada",
    dataIndex: "product_unit_in_package",
    width: 100,
    sorter: true,
    hideInSearch: true,
    render: (_, record) => record.product_unit_in_package,
  },

  {
    title: "Sotuv Narxi",
    dataIndex: "sale_price",
    width: 130,
    sorter: true,
    hideInSearch: true,
    render: (_, record) => (
      <div className="text-green-600 font-bold">
        {record.sale_price.toLocaleString()}
      </div>
    ),
  },
  {
    title: "Umumiy Summa",
    dataIndex: "total_amount",
    width: 150,
    sorter: true,
    hideInSearch: true,
    render: (_, record) => (
      <div className="text-green-600 font-bold">
        {record.total_amount.toLocaleString()}
      </div>
    ),
  },
  {
    title: "Sotuv Sanasi",
    dataIndex: "created_at",
    width: 170,
    valueType: "dateTime",
    sorter: true,
    hideInSearch: true,
  },
];

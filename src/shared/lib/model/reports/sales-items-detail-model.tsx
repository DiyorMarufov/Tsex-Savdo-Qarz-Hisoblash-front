import type { ProColumns } from "@ant-design/pro-table";

export type SaleItemsTableListItem = {
  id: string;
  product: string;
  product_brand: string;
  product_price: number;
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
    title: "Tannarxi",
    dataIndex: "product_price",
    width: 130,
    sorter: true,
    hideInSearch: true,
    render: (_, record) => (
      <div className="text-green-600 font-bold">
        {record.product_price.toLocaleString()}
      </div>
    ),
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

export const fakeSalesItems: SaleItemsTableListItem[] = [
  {
    id: "fa552202-20ae-436c-a1c3-69918c43316c",
    product: "Shoes Professional Sport",
    product_brand: "Nike",
    product_price: 130000,
    product_unit_in_package: 5,
    quantity: 10,
    sale_price: 150000,
    total_amount: 1500000,
    created_at: "2025-12-25T04:59:12.984Z",
  },
  {
    id: "ba112202-10ae-222c-a1c3-11118c43316c",
    product: "Classic T-Shirt",
    product_brand: "Adidas",
    product_price: 80000,
    product_unit_in_package: 10,
    quantity: 2,
    sale_price: 95000,
    total_amount: 190000,
    created_at: "2025-12-26T10:20:00.000Z",
  },
  {
    id: "ca334402-30fe-444c-b2d4-22228c43316c",
    product: "Running Shorts",
    product_brand: "Puma",
    product_price: 55000,
    product_unit_in_package: 1,
    quantity: 5,
    sale_price: 75000,
    total_amount: 375000,
    created_at: "2025-12-27T11:15:00.000Z",
  },
];

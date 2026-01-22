import type { ProColumns } from "@ant-design/pro-table";
import { productCategories, productMaterialTypes } from "../../constants";

export type SaleItemsTableListItem = {
  id: string;
  product: string;
  product_category: string;
  product_material_type: string;
  product_unit_in_package: number;
  quantity: number;
  sale_price: number;
  total_amount: number;
  total_units: number;
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
    title: "Kategoriya",
    dataIndex: "product_category",
    width: 130,
    sorter: true,
    render: (_, record) => productCategories[record.product_category],
  },
  {
    title: "Materia turi",
    dataIndex: "product_material_type",
    width: 130,
    sorter: true,
    render: (_, record) => productMaterialTypes[record.product_material_type],
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
    title: "Umumiy juft",
    dataIndex: "total_units",
    width: 150,
    sorter: true,
    hideInSearch: true,
    render: (_, record) => record.total_units,
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

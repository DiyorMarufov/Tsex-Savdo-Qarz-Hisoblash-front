import ProTable from "@ant-design/pro-table";
import { Select } from "antd";
import { memo, useRef } from "react";
import { fakeSales, salesColumns } from "../../../shared/lib/model/reports/sales-model";

const SaleItemsManager = () => {
  const saleId = useRef<string | null>(null);
  // Sale Items detail starts
  const handleSaleItems = (id: string) => {
    saleId.current = id;
  };

  // Sale Items detail ends
  return (
    <div className="flex flex-col gap-2 bg-[#ffffff] p-4 border border-bg-fy rounded-[5px] overflow-hidden">
      <span className="text-[18px] text-[#232E2F]">Sotuvdagi mahsulotlar</span>
      <div className="flex flex-col gap-1">
        <span className="text-[16px] text-[#232E2F]">Mahsulot</span>
        <Select
          placeholder="Mahsulotni qidiring yoki tanlang"
          className="h-10!"
        />
      </div>
      <div className="max-[500px]:hidden">
        <ProTable
          dataSource={fakeSales}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            responsive: false,
          }}
          columns={salesColumns(handleSaleItems)}
          search={false}
          dateFormatter="string"
          scroll={{ x: "max-content" }}
          className="custom-protable-background"
        />
      </div>
    </div>
  );
};

export default memo(SaleItemsManager);

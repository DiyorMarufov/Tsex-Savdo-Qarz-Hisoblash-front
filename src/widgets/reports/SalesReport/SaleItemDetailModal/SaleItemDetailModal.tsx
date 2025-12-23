import { memo } from "react";
import { Modal, Button as AntdButton } from "antd";
import ProTable from "@ant-design/pro-table";
import {
  salesItemColumns,
  type SaleItemsTableListItem,
} from "../../../../pages/superadmin/reports/model/sales-items-detail-model";
import SaleItemDetailCard from "../../../../shared/ui/SaleItemDetailCard/SaleItemDetailCard";

interface SaleDetailsModalProps {
  open: boolean;
  onCancel: () => void;
  data: SaleItemsTableListItem[];
  saleInfo?: {
    id: string;
    customerName: string;
    date: string;
    totalAmount: number;
  };
}

const SaleDetailModal = ({
  open,
  onCancel,
  data,
  saleInfo,
}: SaleDetailsModalProps) => {
  return (
    <Modal
      centered
      className="w-[1000px]! custom-modal-bg"
      styles={{ body: { maxHeight: "79vh", overflowY: "auto" } }}
      title={
        <div className="flex flex-col">
          <div>Sotuv tavsilotlari</div>
          <div className="flex gap-[3px] text-[#6C7381] text-[13px]">
            <div>Sotuv ID: {saleInfo?.id || "---"}</div>|
            <div>Mijoz: {saleInfo?.customerName || "---"}</div>|
            <div>Sana {saleInfo?.date || "---"}</div>
          </div>
        </div>
      }
      closable={{ "aria-label": "Custom Close Button" }}
      open={open}
      onCancel={onCancel}
      footer={
        <div className="flex flex-col gap-4">
          <div className="text-[17px] font-bold">
            Umumiy summa:{" "}
            <span>{saleInfo?.totalAmount.toLocaleString() || 0}</span>
          </div>
          <div className="flex gap-2 justify-end">
            <AntdButton className="bg-red-500! text-white!" onClick={onCancel}>
              Bekor qilish
            </AntdButton>
          </div>
        </div>
      }
    >
      <div className="max-[500px]:hidden">
        <ProTable
          dataSource={data}
          rowKey="id"
          pagination={{ showSizeChanger: true, responsive: false }}
          columns={salesItemColumns}
          search={false}
          dateFormatter="string"
          scroll={{ x: "max-content" }}
        />
      </div>

      <div className="mt-4 min-[500px]:hidden flex flex-col gap-5">
        {data.map((item) => (
          <SaleItemDetailCard key={item.id} item={item} />
        ))}
      </div>
    </Modal>
  );
};

export default memo(SaleDetailModal);

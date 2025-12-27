import { memo } from "react";
import { Modal, Button as AntdButton } from "antd";
import ProTable from "@ant-design/pro-table";
import {
  salesItemColumns,
  type SaleItemsTableListItem,
} from "../../../../pages/superadmin/reports/model/sales-items-detail-model";
import SaleItemReportMobileList from "../SaleItemReportMobileList/SaleItemReportMobileList";

interface SaleDetailsModalProps {
  open: boolean;
  onCancel: () => void;
  data: SaleItemsTableListItem[];
  total: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number, pageSize?: number) => void;
  saleInfo: any;
  loading: boolean;
}

const SaleDetailModal = ({
  open,
  onCancel,
  data,
  total,
  currentPage,
  pageSize,
  onPageChange,
  saleInfo,
  loading,
}: SaleDetailsModalProps) => {
  return (
    <Modal
      centered
      className="w-[1000px]! custom-modal-bg"
      styles={{ body: { maxHeight: "79vh", overflowY: "auto" } }}
      title={
        loading ? (
          <div className="flex flex-col animate-pulse">
            <div className="h-6 w-36 bg-gray-200 rounded mb-2"></div>
            <div className="flex items-center gap-[3px]">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <span className="text-gray-300">|</span>
              <div className="h-4 w-40 bg-gray-200 rounded"></div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <div>Sotuv tavsilotlari</div>
            <div className="flex gap-[3px] text-[#6C7381] text-[13px]">
              <div>Mijoz: {saleInfo?.customerName || "---"}</div>|
              <div>
                Sana:{" "}
                {new Date(saleInfo?.date).toLocaleString("uz-UZ") || "---"}
              </div>
            </div>
          </div>
        )
      }
      closable={{ "aria-label": "Custom Close Button" }}
      open={open}
      onCancel={onCancel}
      footer={
        <div className="flex flex-col gap-4">
          {loading ? (
            <div className="flex justify-end gap-2 animate-pulse">
              <div className="h-5 w-28 bg-gray-200 rounded"></div>
              <div className="h-5 w-24 bg-green-100 rounded"></div>
            </div>
          ) : (
            <div className="text-[17px] font-bold">
              Umumiy summa:{" "}
              <span className="text-green-500 font-bold">
                {saleInfo?.totalAmount.toLocaleString() || 0}
              </span>
            </div>
          )}
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
          pagination={{
            showSizeChanger: true,
            responsive: false,
            current: currentPage,
            pageSize,
            total,
            onChange: onPageChange,
          }}
          columns={salesItemColumns}
          search={false}
          dateFormatter="string"
          scroll={{ x: "max-content" }}
          loading={loading}
        />
      </div>

      <SaleItemReportMobileList
        data={data}
        loading={loading}
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </Modal>
  );
};

export default memo(SaleDetailModal);

import ProTable from "@ant-design/pro-table";
import { Modal, Select, Button as AntdButton } from "antd";
import { memo, useRef, useState } from "react";
import {
  fakeSales,
  salesColumns,
} from "../../../pages/superadmin/reports/model/sales-model";
import {
  fakeSalesItems,
  salesItemColumns,
  type SaleItemsTableListItem,
} from "../../../pages/superadmin/reports/model/sales-items-detail-model";
import { Edit } from "lucide-react";

const SaleItemsManager = () => {
  const [detailOpen, setdetailOpen] = useState<boolean>(false);
  const saleId = useRef<string | null>(null);
  // Sale Items detail starts
  const handleSaleItems = (id: string) => {
    saleId.current = id;
    setdetailOpen(true);
  };

  const handleCancelSaleItems = () => {
    setdetailOpen(false);
  };
  // Sale Items detail ends
  return (
    <div className="flex flex-col gap-2 bg-[#ffffff] p-4 rounded-[5px]">
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

      <Modal
        centered
        className="w-[1000px]! custom-modal-bg"
        styles={{
          body: {
            maxHeight: "79vh",
            overflowY: "auto",
          },
        }}
        title={
          <div className="flex flex-col">
            <div>Sotuv tavsilotlari</div>
            <div className="flex gap-[3px] text-[#6C7381] text-[13px]">
              <div>Sotuv ID: efaiejnfa</div>| <div>Mijoz: Kimdur</div>|
              <div>Sana 25.05.2025</div>
            </div>
          </div>
        }
        closable={{ "aria-label": "Custom Close Button" }}
        open={detailOpen}
        onCancel={handleCancelSaleItems}
        footer={
          <div className="flex flex-col gap-4">
            <div className="text-[17px] font-bold">
              Umumiy summa: <span>15,000,000</span>
            </div>
            <div className="flex gap-2 justify-end">
              <AntdButton
                className="bg-red-500! text-white!"
                onClick={handleCancelSaleItems}
              >
                Bekor qilish
              </AntdButton>
            </div>
          </div>
        }
      >
        <div className="max-[500px]:hidden">
          <ProTable
            dataSource={fakeSalesItems}
            rowKey="id"
            pagination={{
              showSizeChanger: true,
              responsive: false,
            }}
            columns={salesItemColumns}
            search={false}
            dateFormatter="string"
            scroll={{ x: "max-content" }}
          />
        </div>

        <div className="mt-4 min-[500px]:hidden flex flex-col gap-5">
          {fakeSalesItems.map((sli: SaleItemsTableListItem) => (
            <div
              key={sli.id}
              className="flex flex-col gap-3 border border-bg-fy bg-[#ffffff] rounded-[12px] overflow-hidden"
            >
              <div className="flex justify-between items-center gap-3 pt-3 px-3.5">
                <div className="flex flex-col items-start">
                  <span className="text-[15px] font-bold text-[#64748B]">
                    Mahsulot
                  </span>
                  <a className="text-[16px] font-bold">{sli.product.name}</a>
                </div>
                <div className="flex flex-col items-end">
                  <Edit className="text-green-600 cursor-pointer hover:opacity-80" />
                </div>
              </div>

              <div className="flex px-3.5">
                <div className="flex flex-col w-1/2">
                  <span className="text-[15px] font-medium text-[#6B7280]">
                    Soni
                  </span>
                  <span className="text-[16px] font-bold text-[#4B5563]">
                    {sli.quantity}
                  </span>
                </div>
                <div className="flex flex-col w-1/2">
                  <span className="text-[15px] font-medium text-[#6B7280]">
                    Narxi
                  </span>
                  <span className="text-[16px] font-bold text-green-500">
                    {sli.price.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="w-full h-px bg-bg-fy"></div>

              <div className="flex px-3.5 pb-3">
                <div className="flex flex-col w-1/2">
                  <span className="text-[15px] font-medium text-[#6B7280]">
                    Umumiy Summa
                  </span>
                  <span className="text-[16px] font-bold text-green-500">
                    {sli.total_amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-col w-1/2">
                  <span className="text-[15px] font-medium text-[#6B7280]">
                    Sotuv Sanasi
                  </span>
                  <span className="text-[15px] font-bold text-[#4B5563]">
                    {sli.created_at.toLocaleString("uz-UZ")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default memo(SaleItemsManager);

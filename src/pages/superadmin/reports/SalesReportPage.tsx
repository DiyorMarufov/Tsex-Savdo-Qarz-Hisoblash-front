import { memo, useRef, useState } from "react";
import ProTable from "@ant-design/pro-table";
import { fakeSales, salesColumns } from "./model/sales-model";
import { fakeSalesItems } from "./model/sales-items-detail-model";
import SalesReportBalances from "../../../widgets/reports/SalesReport/SalesReportBalances/SalesReportBalances";
import SalesReportChart from "../../../widgets/reports/SalesReport/SalesReportChart/SalesReportChart";
import SalesReportMobileList from "../../../widgets/reports/SalesReport/SalesReportMobileList/SalesReportMobileList";
import SaleItemDetailModal from "../../../widgets/reports/SalesReport/SaleItemDetailModal/SaleItemDetailModal";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import ReportFilter from "../../../widgets/reports/SalesReport/ReportFilter/ReportFilter";

const SalesReportPage = () => {
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
    <div className="flex flex-col gap-5">
      <ReportFilter />

      <SalesReportBalances />

      <SalesReportChart />

      <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] p-3.5">
        <SearchInput
          placeholder="Do'kon,sotuvchi,mijoz bo'yicha qidirish"
          className="h-12! bg-bg-ty! text-[16px]!"
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
          footer={() => (
            <div>
              <span className="text-[17px] font-bold">
                Jami savdo:{" "}
                <span className="text-green-500 font-bold text-[18px]">
                  15,000,000
                </span>
              </span>
            </div>
          )}
        />
      </div>

      <SalesReportMobileList data={fakeSales} onDetail={handleSaleItems} />

      <SaleItemDetailModal
        open={detailOpen}
        onCancel={handleCancelSaleItems}
        data={fakeSalesItems}
      />
    </div>
  );
};

export default memo(SalesReportPage);

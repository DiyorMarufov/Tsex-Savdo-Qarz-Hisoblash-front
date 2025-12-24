import { memo, useCallback, useMemo, useRef, useState } from "react";
import ProTable from "@ant-design/pro-table";
import { fakeSales, salesColumns } from "./model/sales-model";
import { fakeSalesItems } from "./model/sales-items-detail-model";
import SalesReportBalances from "../../../widgets/reports/SalesReport/SalesReportBalances/SalesReportBalances";
import SalesReportChart from "../../../widgets/reports/SalesReport/SalesReportChart/SalesReportChart";
import SalesReportMobileList from "../../../widgets/reports/SalesReport/SalesReportMobileList/SalesReportMobileList";
import SaleItemDetailModal from "../../../widgets/reports/SalesReport/SaleItemDetailModal/SaleItemDetailModal";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import ReportFilter from "../../../widgets/reports/SalesReport/ReportFilter/ReportFilter";
import { useSale } from "../../../shared/lib/apis/sales/useSale";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import type { QueryParams } from "../../../shared/lib/types";

const SalesReportPage = () => {
  const [detailOpen, setdetailOpen] = useState<boolean>(false);
  const saleId = useRef<string | null>(null);

  const { getSalesSummaryForReport } = useSale();
  const { getParam, setParam } = useParamsHook();

  // Query starts
  const query: QueryParams = useMemo(() => {
    const startDate = getParam("startDate") || undefined;
    const endDate = getParam("endDate") || undefined;

    return { startDate, endDate };
  }, [getParam]);
  // Query ends

  // Sale Items detail starts
  const handleSaleItems = (id: string) => {
    saleId.current = id;
    setdetailOpen(true);
  };

  const handleCancelSaleItems = () => {
    setdetailOpen(false);
  };
  // Sale Items detail ends

  // SalesSummary starts
  const { data: salesSummary, isLoading: salesReportLoading } =
    getSalesSummaryForReport({
      startDate: query.startDate,
      endDate: query.endDate,
    });
  const summary = salesSummary?.data;

  const totalSales = summary?.totalSales;
  const paidTotal = summary?.paidTotal;
  const unpaidTotal = summary?.unpaidTotal;
  // SalesSummary ends

  // Report Filter starts
  const handleFilterChange = useCallback(
    (dates: string[] | null) => {
      if (dates) {
        setParam("startDate", dates[0]);
        setParam("endDate", dates[1]);
      } else {
        setParam("startDate", "");
        setParam("endDate", "");
      }
    },
    [setParam]
  );
  // Report Filter ends

  return (
    <div className="flex flex-col gap-5">
      <ReportFilter onFilter={handleFilterChange} />

      <SalesReportBalances
        isLoading={salesReportLoading}
        totalSales={totalSales}
        paidTotal={paidTotal}
        unpaidTotal={unpaidTotal}
      />

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

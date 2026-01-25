import { memo, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSaleItem } from "../../../shared/lib/apis/sale-items/useSaleItem";
import SaleItemReportMobileList from "../../../widgets/reports/SalesReport/SaleItemReportMobileList/SaleItemReportMobileList";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import type { QueryParams } from "../../../shared/lib/types";
import ProTable from "@ant-design/pro-table";
import SaleItemReportHeader from "../../../features/sale-items/components/SaleItemReportHeader";
import SaleItemReportHeaderSkeleton from "../../../shared/ui/Skeletons/Reports/SalesReport/SaleItemReportHeaderSkeleton";
import {
  salesItemColumns,
  type SaleItemsTableListItem,
} from "../../../shared/lib/model/reports/sales-items-detail-model";
import { ArrowLeft } from "lucide-react";

const AdminSaleItemsReportPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSaleItemsBySaleId } = useSaleItem();
  const { getParam, setParams, removeParam } = useParamsHook();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  // Query starts
  const query: QueryParams = useMemo(() => {
    const page = Number(getParam("page")) || 1;
    const limit = Number(getParam("limit")) || 5;

    return {
      page,
      limit,
    };
  }, [getParam]);
  // Query ends

  const { data: allSaleItems, isLoading: saleItemLoading } =
    getSaleItemsBySaleId(id as string);

  const saleItems: SaleItemsTableListItem[] = allSaleItems?.data?.data || [];
  const saleInfo = allSaleItems?.data?.saleInfo;
  const totalQuantity = allSaleItems?.data?.totalQuantity;
  const total = allSaleItems?.data?.total;

  // PageChange starts
  const handlePageChange = (newPage: number, newPageSize?: number) => {
    const updateParams: { page?: number; limit?: number } = {};

    if (newPage > 1) {
      updateParams.page = newPage;
    }

    if (newPageSize && newPageSize !== 5) {
      updateParams.limit = newPageSize;
    }

    setParams(updateParams);

    if (newPage === 1) {
      removeParam("page");
    }
    if (newPageSize === 5 && getParam("limit")) {
      removeParam("limit");
    }
  };
  // PageChange ends

  return (
    <div className="flex flex-col gap-4">
      <ArrowLeft
        className="hover:opacity-75 cursor-pointer mb-1"
        onClick={() => navigate(-1)}
      />
      <div className="min-[500px]:hidden">
        {saleItemLoading ? (
          <SaleItemReportHeaderSkeleton />
        ) : (
          <SaleItemReportHeader
            saleInfo={saleInfo}
            totalQuantity={totalQuantity}
          />
        )}
      </div>
      <div className="max-[500px]:hidden">
        <div className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px] overflow-hidden">
          <div className="px-4 py-3 border-b border-bg-fy flex justify-between items-center bg-gray-50/50">
            <div className="flex items-center gap-2">
              <h3 className="text-[16px] font-bold text-[#374151]">
                {saleInfo?.customerName} ning xaridlari
              </h3>
            </div>
            {saleItemLoading ? (
              <div className="h-[26px] w-[110px] bg-gray-200 animate-pulse rounded border border-gray-100"></div>
            ) : (
              <span className="text-[12px] text-gray-400 font-medium bg-white px-2 py-1 rounded border border-bg-fy">
                Umumiy: {totalQuantity || 0} ta mahsulot, {saleInfo?.totalUnits}{" "}
                juft
              </span>
            )}
          </div>

          <ProTable
            dataSource={saleItems}
            rowKey="id"
            pagination={{
              showSizeChanger: true,
              responsive: false,
              current: query.page,
              pageSize: query.limit,
              total,
              onChange: handlePageChange,
            }}
            columns={salesItemColumns}
            search={false}
            dateFormatter="string"
            scroll={{ x: "max-content" }}
            loading={saleItemLoading}
          />

          <div className="px-6 py-4 bg-gray-50 border-t border-bg-fy flex justify-end items-center gap-10">
            <div className="flex flex-col items-end">
              <span className="text-[13px] text-[#6B7280] font-bold uppercase tracking-wider">
                Mahsulotlar umumiy summasi
              </span>
              <div className="flex items-baseline gap-1">
                {saleItemLoading ? (
                  <div className="h-[30px] w-32 bg-gray-200 animate-pulse rounded-md mt-1"></div>
                ) : (
                  <span className="text-[20px] font-black text-green-600">
                    {saleInfo?.totalAmount?.toLocaleString()}
                  </span>
                )}
                <span className="text-[12px] font-bold text-green-600 uppercase">
                  uzs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SaleItemReportMobileList
        data={saleItems}
        loading={saleItemLoading}
        total={totalQuantity}
        currentPage={Number(query.page)}
        pageSize={Number(query.limit)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default memo(AdminSaleItemsReportPage);

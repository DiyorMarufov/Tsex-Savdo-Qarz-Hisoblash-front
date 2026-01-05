import { memo, useMemo } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Button from "../../../shared/ui/Button/Button";
import { Plus } from "lucide-react";
import ProTable from "@ant-design/pro-table";
import { salesColumns } from "../../../shared/lib/model/reports/sales-model";
import PlusButton from "../../../shared/ui/Button/PlusButton";
import SalesFilter from "../../../widgets/sales/SalesFilter/SalesFilter";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import { useSale } from "../../../shared/lib/apis/sales/useSale";
import type { QueryParams } from "../../../shared/lib/types";
import dayjs from "dayjs";
import SalesReportMobileList from "../../../widgets/reports/SalesReport/SalesReportMobileList/SalesReportMobileList";

const AdminSalesPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { getParam, setParams, removeParam } = useParamsHook();
  const { getAllSales } = useSale();

  // Query starts
  const query: QueryParams = useMemo(() => {
    const page = Number(getParam("page")) || 1;
    const limit = Number(getParam("limit")) || 5;
    const search = getParam("search") || undefined;
    const s = getParam("startDate");
    const e = getParam("endDate");
    const shopId = getParam("shopId") || "";
    const tsexId = getParam("tsexId") || "";

    const isFirstLoad = s === null && e === null;

    return {
      page,
      limit,
      search,
      start: isFirstLoad ? dayjs().startOf("day") : s ? dayjs(s) : null,
      end: isFirstLoad ? dayjs().endOf("day") : e ? dayjs(e) : null,
      startStr: isFirstLoad
        ? dayjs().startOf("day").format("YYYY-MM-DD HH:mm:ss")
        : s || "",
      endStr: isFirstLoad
        ? dayjs().endOf("day").format("YYYY-MM-DD HH:mm:ss")
        : e || "",
      shopId,
      tsexId,
    };
  }, [getParam]);
  // Query ends

  // Sale Items detail starts
  const handleSaleItems = (id: string) => navigate(`${id}`);
  // Sale Items detail ends

  // SalesReportData starts
  const { data: allSales, isLoading: salesLoading } = getAllSales({
    page: query.page,
    limit: query.limit,
    search: query.search,
    startDate: query.startStr,
    endDate: query.endStr,
    productId: query.productId,
    shopId: query.shopId,
    tsexId: query.tsexId,
  });
  const sales = allSales?.data?.data;
  const total = allSales?.data?.total;
  // SalesReportData ends

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

  if (pathname.startsWith("/admin/sales/")) return <Outlet />;
  return (
    <div className="pb-12">
      <div className="flex justify-between gap-3">
        <LargeTitle title="Sotuvlar" />
        <div className="max-[500px]:hidden">
          <Button onClick={() => navigate("add")}>
            <Plus />
            Yangi sotuv yaratish
          </Button>
        </div>

        <PlusButton setOpen={() => navigate("add")} />
      </div>
      <div className="flex flex-col gap-5">
        <div className="min-[500px]:mt-2">
          <SalesFilter />
        </div>

        <div className="max-[500px]:hidden">
          <ProTable
            dataSource={sales}
            rowKey="id"
            pagination={{
              showSizeChanger: true,
              responsive: false,
              current: query.page,
              pageSize: query.limit,
              total,
              onChange: handlePageChange,
            }}
            columns={salesColumns(handleSaleItems)}
            search={false}
            dateFormatter="string"
            scroll={{ x: "max-content" }}
            loading={salesLoading}
          />
        </div>

        <SalesReportMobileList
          data={sales}
          isLoading={salesLoading}
          total={total}
          currentPage={Number(query.page)}
          pageSize={Number(query.limit)}
          onPageChange={handlePageChange}
          onDetail={handleSaleItems}
        />
      </div>
    </div>
  );
};

export default memo(AdminSalesPage);

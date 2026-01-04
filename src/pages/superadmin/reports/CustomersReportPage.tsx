import { memo, useCallback, useMemo, useState } from "react";
import CustomersReportBalances from "../../../widgets/reports/CustomersReport/CustomersReportBalances/CustomersReportBalances";
import CustomersReportChart from "../../../widgets/reports/CustomersReport/CustomersReportChart/CustomersReportChart";
import CustomersReportFilter from "../../../widgets/reports/CustomersReport/CustomersReportFilter/CustomersReportFilter";
import { useCustomer } from "../../../shared/lib/apis/customers/useCustomer";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import type { Option, QueryParams } from "../../../shared/lib/types";
import { debounce } from "../../../shared/lib/functions/debounce";
import { formatPhoneNumber } from "../../../shared/lib/functions/formatPhoneNumber";
import ProTable from "@ant-design/pro-table";
import { customerColumns } from "../customers/model/customers-model";
import CustomerMobileList from "../../../widgets/customers/CustomerMobileList/CustomerMobileList";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import dayjs from "dayjs";

const CustomersReportPage = () => {
  const navigate = useNavigate();
  const { getParam, setParams, removeParam } = useParamsHook();
  const [localSearch, setLocalSearch] = useState(getParam("search") || "");
  const [isCustomerOpen, setIsCustomerOpen] = useState<boolean>(false);
  const {
    getAllCustomers,
    getCustomerBalanceSummary,
    getAllCustomersStatisticsForReport,
    getAllCustomersForTransaction,
  } = useCustomer();
  // CustomersReportCard starts

  // Query starts
  const query: QueryParams = useMemo(() => {
    const page = Number(getParam("page")) || 1;
    const limit = Number(getParam("limit")) || 5;
    const search = getParam("search") || undefined;
    const s = getParam("startDate");
    const e = getParam("endDate");
    const customerId = getParam("customerId") || "";

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
      customerId,
    };
  }, [getParam]);
  // Query ends

  const { data: customerBalancesSummary, isLoading: customerBalanceLoading } =
    getCustomerBalanceSummary({
      startDate: query.startStr,
      endDate: query.endStr,
      customerId: query.customerId,
    });
  const customerBalances = customerBalancesSummary?.data;
  const creditor = customerBalances?.creditorTotalBalance;
  const debtor = customerBalances?.debtorTotalBalance;
  const net = customerBalances?.netTotalBalance;
  // CustomersReportCard ends

  // CustomersReportChart starts
  const { data: customersStats, isLoading: customersStatsLoading } =
    getAllCustomersStatisticsForReport({
      startDate: query.startStr,
      endDate: query.endStr,
      customerId: query.customerId,
    });
  const borrowed = customersStats?.data?.borrowed;
  const lent = customersStats?.data?.lent;
  const totalBorrowed = customersStats?.data?.totalBorrowed;
  const totalLent = customersStats?.data?.totalLent;
  // CustomersReportChart ends

  // Detail starts
  const handleOpenDetail = (id: string) => {
    navigate(`/superadmin/customer/transaction/${id}`);
  };
  // Detail ends

  // CustomerData starts
  const { data: allCustomers, isLoading: customerLoading } = getAllCustomers({
    startDate: query.startStr,
    endDate: query.endStr,
    customerId: query.customerId,
  });
  const customers = allCustomers?.data?.data;
  const total = allCustomers?.data?.total || 0;
  // CustomerData ends

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

  // Search starts
  const debouncedSetSearchQuery = useCallback(
    debounce((nextValue: string) => {
      setParams({
        search: nextValue || "",
        page: 1,
      });
    }, 500),
    [setParams]
  );

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    debouncedSetSearchQuery(value);
  };
  // Search ends

  // CustomerReportFilter starts
  const onFilterSubmit = (filters: {
    dates: string[] | null;
    customerId: string;
  }) => {
    setParams({
      startDate: filters.dates?.[0] || "",
      endDate: filters.dates?.[1] || "",
      customerId: filters.customerId || "",
    });
  };
  // CustomerReportFilter ends

  // Customers list for transaction starts
  const { data: allCustomersList, isLoading: customerListLoading } =
    getAllCustomersForTransaction(isCustomerOpen);
  const customerOptions: Option[] = [
    {
      value: "",
      label: "Barcha mijozlar",
    },
    ...(allCustomersList?.data?.map((cs: any) => ({
      value: cs.id,
      label: (
        <div className="flex items-center justify-between w-full gap-4">
          <span className="font-medium text-slate-800 truncate">
            {cs.full_name}
          </span>
          <span className="text-[12px] text-slate-400 font-normal tabular-nums shrink-0">
            {formatPhoneNumber(cs.phone_number)}
          </span>
        </div>
      ),
    })) || []),
  ];
  // Customers list for transaction ends

  return (
    <div className="flex flex-col gap-5">
      <CustomersReportFilter
        onFilterSubmit={onFilterSubmit}
        start={query.start}
        end={query.end}
        customerId={query.customerId}
        customerOptions={customerOptions}
        setIsCustomerOpen={setIsCustomerOpen}
        customerLoading={customerListLoading}
      />
      <CustomersReportBalances
        creditor={creditor}
        debtor={debtor}
        net={net}
        loading={customerBalanceLoading}
      />

      <CustomersReportChart
        borrowed={borrowed}
        lent={lent}
        totalBorrowed={totalBorrowed}
        totalLent={totalLent}
        loading={customersStatsLoading}
      />
      <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] p-3.5 flex items-center gap-5 max-[960px]:flex-wrap">
        <SearchInput
          placeholder="Mijoz nomi,tel raqami orqali qidirish"
          className="h-12! bg-bg-ty! text-[17px]!"
          value={localSearch}
          onChange={handleSearchChange}
        />
      </div>
      <div className="max-[500px]:hidden">
        <ProTable
          dataSource={customers}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            responsive: false,
            current: query.page,
            pageSize: query.limit,
            total,
            onChange: handlePageChange,
          }}
          columns={customerColumns(handleOpenDetail)}
          search={false}
          dateFormatter="string"
          scroll={{ x: "max-content" }}
          loading={customerLoading}
        />
      </div>

      <CustomerMobileList
        data={customers}
        onDetail={handleOpenDetail}
        currentPage={query.page}
        pageSize={query.limit}
        total={total}
        onPageChange={handlePageChange}
        loading={customerLoading}
        isReport
      />
    </div>
  );
};

export default memo(CustomersReportPage);

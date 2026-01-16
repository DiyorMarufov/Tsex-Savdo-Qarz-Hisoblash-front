import { memo, useCallback, useEffect, useMemo, useState } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import ProTable from "@ant-design/pro-table";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import { useTsex } from "../../../shared/lib/apis/tsexes/useTsex";
import type { QueryParams } from "../../../shared/lib/types";
import { debounce } from "../../../shared/lib/functions/debounce";
import { tsexColumns } from "../../../shared/lib/model/tsexes/tsexes-model";
import TsexesMobileList from "../../../widgets/tsexes/TsexesMobileList/TsexesMobileList";

const AdminTsexesPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { getParam, setParams, removeParam } = useParamsHook();
  const [localSearch, setLocalSearch] = useState(getParam("search") || "");

  const { getAllTsexes } = useTsex();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  // Query starts
  const query: QueryParams = useMemo(() => {
    const page = Number(getParam("page")) || 1;
    const limit = Number(getParam("limit")) || 5;
    const search = getParam("search") || undefined;

    return { page, limit, search };
  }, [getParam]);
  // Query ends

  // HandleOpenDetail starts
  const handleOpenDetail = (id: string) => {
    navigate(`transactions/${id}`);
  };
  // HanleOpenDetail ends

  // TsexData starts
  const { data: allTsexes, isLoading: tsexLoading } = getAllTsexes(query);
  const tsexes = allTsexes?.data?.data;
  const total = allTsexes?.data?.total || 0;
  // TsexData ends

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

  if (pathname.startsWith("/admin/tsexes/transactions")) return <Outlet />;

  return (
    <div>
      <div className="flex justify-between items-center w-full">
        <LargeTitle title="Tsexlar" />
      </div>

      <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] p-3.5 flex items-center gap-5 max-[960px]:flex-wrap">
        <SearchInput
          placeholder="Tsex nomi yoki operatsiya bo'yicha qidirish"
          className="h-10! bg-bg-ty! text-[17px]!"
          value={localSearch}
          onChange={handleSearchChange}
        />
      </div>

      <div className="mt-4 max-[500px]:hidden">
        <ProTable
          dataSource={tsexes}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            responsive: false,
            current: query.page,
            pageSize: query.limit,
            total,
            onChange: handlePageChange,
            pageSizeOptions: [5, 10],
          }}
          columns={tsexColumns(handleOpenDetail)}
          search={false}
          dateFormatter="string"
          scroll={{ x: "max-content" }}
          loading={tsexLoading}
        />
      </div>

      <TsexesMobileList
        data={tsexes}
        currentPage={Number(query.page)}
        pageSize={Number(query.limit)}
        total={total}
        onPageChange={handlePageChange}
        loading={tsexLoading}
        onDetail={handleOpenDetail}
      />
    </div>
  );
};

export default memo(AdminTsexesPage);

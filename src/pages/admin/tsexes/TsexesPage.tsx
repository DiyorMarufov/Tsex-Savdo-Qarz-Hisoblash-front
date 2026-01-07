import { memo, useCallback, useMemo, useState } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import ProTable from "@ant-design/pro-table";
import { Button as AntdButton, Pagination } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import { useTsex } from "../../../shared/lib/apis/tsexes/useTsex";
import type { QueryParams } from "../../../shared/lib/types";
import { debounce } from "../../../shared/lib/functions/debounce";
import { Edit } from "lucide-react";
import TsexCardSkeleton from "../../../shared/ui/Skeletons/Tsexes/TsexCardSkeleton";
import {
  tsexColumns,
  type TsexTableListItem,
} from "../../../shared/lib/model/tsexes/tsexes-model";

const AdminTsexesPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { getParam, setParams, removeParam } = useParamsHook();
  const [localSearch, setLocalSearch] = useState(getParam("search") || "");

  const { getAllTsexes } = useTsex();

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

      <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] mt-2 p-3.5 flex items-center gap-5 max-[960px]:flex-wrap">
        <SearchInput
          placeholder="Tsex nomi yoki operatsiya bo'yicha qidirish"
          className="h-11! bg-bg-ty! text-[17px]!"
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

      <div className="min-[500px]:hidden flex flex-col gap-5 mt-4">
        {tsexLoading && <TsexCardSkeleton />}
        {tsexes && tsexes?.length > 0 ? (
          tsexes?.map((ts: TsexTableListItem) => (
            <div
              key={ts?.id}
              className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px]"
            >
              <div className="flex flex-col">
                <div className="grid grid-cols-2 gap-3 px-3.5 py-2.5">
                  <div className="flex flex-col justify-start">
                    <span className="text-[15px] font-medium text-[#6B7280]">
                      Nomi
                    </span>
                    <a className="text-[16px] font-bold text-green-600">
                      {ts?.name}
                    </a>
                  </div>
                  <div className="flex flex-col justify-start">
                    <span className="text-[15px] font-medium text-[#6B7280]">
                      Tsex Manager
                    </span>
                    <span className="text-[16px] font-bold text-[#4B5563]">
                      {ts?.manager.full_name}
                    </span>
                  </div>
                  <div className="flex flex-col justify-start">
                    <span className="text-[15px] font-medium text-[#6B7280] whitespace-nowrap">
                      Balansi
                    </span>
                    {ts?.balance > 0 ? (
                      <span className="text-[16px] font-bold text-red-500">
                        -{ts?.balance.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-[16px] font-bold text-green-500">
                        {ts?.balance.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3 pb-2.5">
                  <div className="flex flex-col px-3.5">
                    <div>
                      <span className="font-medium text-[#6B7280] text-[15px]">
                        Oxirgi operatsiya
                      </span>
                    </div>
                    <div>
                      <span className="text-[16px] font-bold text-[#4B5563]">
                        {ts?.last_transaction
                          ? ts?.last_transaction
                          : "Hozircha yo'q"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col px-3.5">
                    <div>
                      <span className="font-medium text-[#6B7280] text-[15px]">
                        Kiritilgan sana
                      </span>
                    </div>
                    <div>
                      <span className="text-[16px] font-bold text-[#4B5563]">
                        {ts?.created_at.toLocaleString("uz-UZ")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full h-px bg-bg-fy"></div>

                <div className="flex justify-between mt-1 px-3.5 pt-2 pb-3">
                  <div className="flex items-center gap-5">
                    <Edit className="text-green-600 cursor-pointer hover:opacity-80" />
                  </div>
                  <div>
                    <AntdButton
                      className="bg-[#1D4ED8]! text-white!"
                      onClick={() => handleOpenDetail(ts.id)}
                    >
                      Batafsil
                    </AntdButton>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-[20vh] text-red-500 text-[19px] col-span-2">
            Hozircha ma'lumot yo'q
          </div>
        )}
        <div className="flex justify-center">
          <Pagination
            current={query.page}
            pageSize={query.limit}
            onChange={handlePageChange}
            total={total}
            showSizeChanger
          />
        </div>
      </div>
    </div>
  );
};

export default memo(AdminTsexesPage);

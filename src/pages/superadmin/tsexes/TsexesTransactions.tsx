import ProTable from "@ant-design/pro-table";
import { memo, useEffect, useMemo } from "react";
import {
  tsexTransactionsColumns,
  type TsexTransactionsTableListItem,
} from "./model/tsexes-transactions-model";
import { Pagination } from "antd";
import { Edit } from "lucide-react";
import { useParams } from "react-router-dom";
import { useTsexTransaction } from "../../../shared/lib/apis/tsex-transactions/useTsexTransaction";
import type {
  QueryParams,
  TsexTransactionsType,
} from "../../../shared/lib/types";
import TsexTransactionCardSkeleton from "../../../shared/ui/Skeletons/TsexTranscations/TsexTransactionCardSkeleton";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import NameSkeleton from "../../../shared/ui/Skeletons/NameSkeleton/NameSkeleton";

const tsexTransactionsTypeUzbek: TsexTransactionsType = {
  partial_payment: "Qisman to'lov",
  payment: "To'liq to'lov",
  avans: "Qo'shimcha to'lov",
  product_supply: "Mol olish",
};

type TsexTransactionKeys = keyof typeof tsexTransactionsTypeUzbek;

const TsexesTransactions = () => {
  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  const { id } = useParams();
  const { getTsexTransactionsByTsexId } = useTsexTransaction();

  const { getParam, setParams, removeParam } = useParamsHook();

  // TsexTranscationsData start
  const { data: allTsexTransactions, isLoading: tsexTranscationLoading } =
    getTsexTransactionsByTsexId(id as string);
  const tsexTransactions = allTsexTransactions?.data?.data?.map((att: any) => ({
    id: att?.id,
    tsex: att?.tsex?.name,
    type: tsexTransactionsTypeUzbek[att?.type as TsexTransactionKeys],
    amount: att?.amount,
    description: att?.description,
    balance_after: att?.balance_after,
    created_by: att?.created_by?.full_name,
    created_at: att?.created_at,
  }));
  const total = allTsexTransactions?.data?.total || 0;

  // TsexTranscationsData end

  // Query starts
  const query: QueryParams = useMemo(() => {
    const page = Number(getParam("page")) || 1;
    const limit = Number(getParam("limit")) || 5;

    return { page, limit };
  }, [getParam]);
  // Query ends

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
  const tsexName = tsexTransactions?.[0]?.tsex;
  return (
    <div>
      {tsexTranscationLoading ? (
        <NameSkeleton />
      ) : (
        <div className="pb-3 text-[20px] font-medium text-[#4B5563]">
          {tsexName ? tsexName : "Hozircha no'malum"} tsexning tranzaksiyalari
        </div>
      )}
      <ProTable
        dataSource={tsexTransactions}
        rowKey="id"
        pagination={{
          showSizeChanger: true,
          responsive: false,
          current: query.page,
          pageSize: query.limit,
          total,
          onChange: handlePageChange,
        }}
        columns={tsexTransactionsColumns}
        search={false}
        dateFormatter="string"
        scroll={{ x: "max-content" }}
        className="max-[500px]:hidden"
        loading={tsexTranscationLoading}
      />

      <div className="min-[500px]:hidden flex flex-col gap-5">
        {tsexTranscationLoading && <TsexTransactionCardSkeleton />}
        {tsexTransactions && tsexTransactions?.length > 0 ? (
          tsexTransactions?.map((dt: TsexTransactionsTableListItem) => (
            <div
              key={dt.id}
              className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px] overflow-hidden"
            >
              <div className="px-3.5 py-2.5 flex justify-between items-center">
                <a className="text-[16px] font-bold">{dt.tsex}</a>
                <span className="text-[12px] font-bold">
                  {(() => {
                    switch (dt.type) {
                      case "To'liq to'lov":
                        return (
                          <span className="bg-green-100 rounded-full text-green-500 px-2 py-1">
                            To'liq To'lov
                          </span>
                        );
                      case "Qisman to'lov":
                        return (
                          <span className="bg-yellow-100 rounded-full text-yellow-500 px-2 py-1">
                            Qisman To'lov
                          </span>
                        );
                      case "Qo'shimcha to'lov":
                        return (
                          <span className="bg-blue-100 rounded-full text-blue-500 px-2 py-1">
                            Avans (Oldindan)
                          </span>
                        );
                      case "Mol olish":
                        return (
                          <span className="bg-red-100 rounded-full text-red-500 px-2 py-1">
                            Mol Olish
                          </span>
                        );
                      default:
                        return dt.type;
                    }
                  })()}
                </span>
              </div>
              <div className="w-full h-px bg-bg-fy"></div>
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3 px-3.5 py-2.5">
                  <div className="flex flex-col w-1/2 justify-start">
                    <span className="text-[15px] font-medium text-[#6B7280]">
                      Miqdori
                    </span>
                    <span className="text-[16px] font-bold text-green-600">
                      {dt.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[15px] font-medium text-[#6B7280] whitespace-nowrap">
                      Balans (Keyin)
                    </span>
                    {dt.balance_after > 0 ? (
                      <span className="text-[16px] font-bold text-red-500">
                        -{dt.balance_after.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-[16px] font-bold text-green-500">
                        {dt.balance_after.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col col-span-2">
                    <span className="text-[15px] font-medium text-[#6B7280]">
                      Izoh
                    </span>
                    <span className="text-[16px] font-bold text-[#4B5563]">
                      {dt.description ? dt.description : "Izoh yo'q"}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center bg-bg-ty px-3.5">
                  <div className="py-2 flex flex-col">
                    <span className="text-[#6D7482] font-bold text-[15px]">
                      {dt.created_by}
                    </span>
                    <span className="text-[#6D7482] font-bold text-[15px]">
                      {new Date(dt.created_at).toLocaleString("uz-UZ")}
                    </span>
                  </div>

                  <div>
                    <Edit className="text-green-600 cursor-pointer hover:opacity-80" />
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

export default memo(TsexesTransactions);

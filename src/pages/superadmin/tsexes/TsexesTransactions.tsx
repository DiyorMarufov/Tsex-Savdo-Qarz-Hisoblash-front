import ProTable from "@ant-design/pro-table";
import { memo, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTsexTransaction } from "../../../shared/lib/apis/tsex-transactions/useTsexTransaction";
import type {
  QueryParams,
  TsexTransactionsType,
} from "../../../shared/lib/types";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import NameSkeleton from "../../../shared/ui/Skeletons/NameSkeleton/NameSkeleton";
import TsexTransactionMobileList from "../../../widgets/tsexes/TsexTransactionsMobileList/TsexTransactionMobileList";
import { ArrowLeft } from "lucide-react";
import { tsexTransactionsColumns } from "../../../shared/lib/model/tsexes/tsexes-transactions-model";

const tsexTransactionsTypeUzbek: TsexTransactionsType = {
  partial_payment: "Qisman to'lov",
  payment: "To'liq to'lov",
  avans: "Qo'shimcha to'lov",
  product_supply: "Mol olish",
};

type TsexTransactionKeys = keyof typeof tsexTransactionsTypeUzbek;

const TsexesTransactions = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getTsexTransactionsByTsexId } = useTsexTransaction();

  const { getParam, setParams, removeParam } = useParamsHook();
  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

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
      <ArrowLeft
        className="hover:opacity-75 cursor-pointer mb-2"
        onClick={() => navigate(-1)}
      />
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

      <TsexTransactionMobileList
        transactions={tsexTransactions}
        loading={tsexTranscationLoading}
        currentPage={Number(query.page)}
        pageSize={Number(query.limit)}
        total={total}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default memo(TsexesTransactions);

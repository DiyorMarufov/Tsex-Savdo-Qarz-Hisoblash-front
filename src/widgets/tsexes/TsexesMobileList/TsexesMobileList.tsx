import { memo } from "react";
import { Pagination } from "antd";
import TsexCard from "../../../shared/ui/TsexCard/TsexCard";
import TsexCardSkeleton from "../../../shared/ui/Skeletons/Tsexes/TsexCardSkeleton";
import type { TsexTableListItem } from "../../../shared/lib/model/tsexes/tsexes-model";

interface TsexMobileListProps {
  data: TsexTableListItem[] | undefined;
  loading: boolean;
  total: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number, pageSize: number) => void;
  onDetail: (id: string) => void;
  isReport?: boolean;
}

const TsexMobileList = ({
  data,
  loading,
  total,
  currentPage,
  pageSize,
  onPageChange,
  onDetail,
  isReport = false,
}: TsexMobileListProps) => {
  if (loading) return <TsexCardSkeleton />;

  return (
    <div
      className={`min-[500px]:hidden flex flex-col gap-3 ${isReport ? "" : "mt-4"}`}
    >
      {data && data.length > 0 ? (
        data.map((ts) => <TsexCard key={ts.id} ts={ts} onDetail={onDetail} />)
      ) : (
        <div className="flex justify-center items-center h-[20vh] text-red-500 text-[19px]">
          Hozircha ma'lumot yo'q
        </div>
      )}

      {total > pageSize && (
        <div className="flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={total}
            onChange={onPageChange}
            showSizeChanger
          />
        </div>
      )}
    </div>
  );
};

export default memo(TsexMobileList);

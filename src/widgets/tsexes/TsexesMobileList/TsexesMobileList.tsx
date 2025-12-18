import { memo } from "react";
import { Pagination } from "antd";
import type { TsexTableListItem } from "../../../pages/superadmin/tsexes/model/tsexes-model";
import TsexCard from "../../../shared/ui/TsexCard/TsexCard";
import TsexCardSkeleton from "../../../shared/ui/Skeletons/Tsexes/TsexCardSkeleton";

interface TsexMobileListProps {
  data: TsexTableListItem[] | undefined;
  loading: boolean;
  total: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number, pageSize?: number) => void;
  onDetail: (id: string) => void;
}

const TsexMobileList = ({
  data,
  loading,
  total,
  currentPage,
  pageSize,
  onPageChange,
  onDetail,
}: TsexMobileListProps) => {
  if (loading) return <TsexCardSkeleton />;

  return (
    <div className="min-[500px]:hidden flex flex-col gap-5 mt-4">
      {data && data.length > 0 ? (
        data.map((ts) => <TsexCard key={ts.id} ts={ts} onDetail={onDetail} />)
      ) : (
        <div className="flex justify-center items-center h-[20vh] text-red-500 text-[19px]">
          Hozircha ma'lumot yo'q
        </div>
      )}

      {total > 0 && (
        <div className="flex justify-center mt-2">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            onChange={onPageChange}
            total={total}
            showSizeChanger
          />
        </div>
      )}
    </div>
  );
};

export default memo(TsexMobileList);

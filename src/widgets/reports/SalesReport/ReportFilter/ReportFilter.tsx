import { DatePicker } from "antd";
import { memo, useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import Filter from "../../../../shared/ui/Filter/Filter";
import type { Option } from "../../../../shared/lib/types";

interface ReportFilterProps {
  onFilter: (dates: string[] | null, tsexId: string) => void;
  start: Dayjs | undefined | null;
  end: Dayjs | undefined | null;
  setIsTsexOpen: (open: boolean) => void;
  tsexId?: string;
  tsexesOptions: Option[];
  tsexLoading: boolean;
}

const ReportFilter = ({ onFilter, start, end, setIsTsexOpen, tsexId, tsexesOptions, tsexLoading }: ReportFilterProps) => {
  const [tempDates, setTempDates] = useState<[Dayjs | null, Dayjs | null]>([
    start || null,
    end || null,
  ]);
  const [tempTsexId, setTempTsexId] = useState(tsexId);

  useEffect(() => {
    setTempDates([start || null, end || null]);
    setTempTsexId(tsexId);
  }, [start, end, tsexId]);

  const handleRangeChange = (values: any, dateStrings: [string, string]) => {
    setTempDates(values);
    onFilter(values ? dateStrings : null, tempTsexId || "");
  };

  const handleTsexChange = (val: string) => {
    setTempTsexId(val)
    const dateStrings = tempDates?.[0] && tempDates?.[1] ? [tempDates?.[0].format("YYYY-MM-DD HH:mm:ss"), tempDates?.[1].format("YYYY-MM-DD HH:mm:ss")] : null
    onFilter(dateStrings, val)
  }

  return (
    <div className="rounded-[12px] border border-bg-fy bg-white p-3.5">
      <div className="flex items-center gap-4 w-full max-[800px]:flex-col max-[800px]:items-stretch">
        <div className="w-1/3 max-[800px]:w-full">
          <DatePicker.RangePicker
            value={tempDates}
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            onChange={handleRangeChange}
            className="h-11! w-full rounded-lg border-slate-200"
            inputReadOnly
            placeholder={["Boshlanish", "Tugash"]}
          />
        </div>

        <div className="w-1/3 max-[800px]:w-full">
          <Filter
            value={tempTsexId}
            onChange={handleTsexChange}
            placeholder="Barcha tsexlar"
            className="h-11! w-full rounded-lg custom-select border-slate-200"
            options={tsexesOptions}
            onDropdownVisibleChange={(visible: any) => {
              if (visible) setIsTsexOpen(true);
            }}
            loading={tsexLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(ReportFilter);

import { DatePicker } from "antd";
import { memo } from "react";
import { Dayjs } from "dayjs";
import Filter from "../../../../shared/ui/Filter/Filter";

interface ReportFilterProps {
  onFilter: (dates: string[] | null) => void;
  start: Dayjs | undefined | null;
  end: Dayjs | undefined | null;
}

const ReportFilter = ({ onFilter, start, end }: ReportFilterProps) => {
  const handleRangeChange = (values: any, dateStrings: [string, string]) => {
    if (!values) {
      onFilter(null);
      return;
    }
    onFilter(dateStrings);
  };

  return (
    <div className="rounded-[12px] border border-bg-fy bg-white p-3.5">
      <div className="flex items-center gap-4 w-full max-[800px]:flex-col max-[800px]:items-stretch">
        <div className="w-1/3 max-[800px]:w-full">
          <DatePicker.RangePicker
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            onChange={handleRangeChange}
            className="h-11! w-full rounded-lg border-slate-200"
            inputReadOnly
            placeholder={["Boshlanish", "Tugash"]}
            value={[start, end]}
          />
        </div>

        <div className="w-1/3 max-[800px]:w-full">
          <Filter
            placeholder="Barcha tsexlar"
            className="h-11! w-full rounded-lg custom-select border-slate-200"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(ReportFilter);

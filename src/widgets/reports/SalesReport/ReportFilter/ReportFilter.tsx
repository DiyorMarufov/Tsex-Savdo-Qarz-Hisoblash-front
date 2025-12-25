import { DatePicker } from "antd";
import { memo } from "react";
import { Dayjs } from "dayjs";

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
    <div className="rounded-[12px] border border-bg-fy bg-[#ffffff] p-3.5 flex items-center gap-3">
      <div className="flex items-center gap-3 w-full">
        <div>
          <DatePicker.RangePicker
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            onChange={handleRangeChange}
            className="h-11! w-full"
            inputReadOnly
            placeholder={["Boshlanish", "Tugash"]}
            value={[start, end]}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(ReportFilter);

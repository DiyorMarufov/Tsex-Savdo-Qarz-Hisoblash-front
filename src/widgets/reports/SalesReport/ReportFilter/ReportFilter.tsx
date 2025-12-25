import { Button, DatePicker } from "antd";
import { Filter } from "lucide-react";
import { memo, useState } from "react";
import { Dayjs } from "dayjs";

interface ReportFilterProps {
  onFilter: (dates: string[] | null) => void;
  start: Dayjs | undefined | null;
  end: Dayjs | undefined | null;
}

const ReportFilter = ({ onFilter, start, end }: ReportFilterProps) => {
  const [selectedDates, setSelectedDates] = useState<string[] | null>(null);

  const handleRangeChange = (values: any, dateStrings: [string, string]) => {
    if (!values) {
      setSelectedDates(null);
      return;
    }
    setSelectedDates(dateStrings);
  };

  const handleSubmit = () => {
    onFilter(selectedDates);
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
        <Button
          className="flex items-center justify-center gap-3 h-11!"
          type="primary"
          onClick={handleSubmit}
        >
          <Filter className="w-5 h-5" />
          <span className="max-[420px]:hidden">Filterlash</span>
        </Button>
      </div>
    </div>
  );
};

export default memo(ReportFilter);

import { Button, DatePicker } from "antd";
import { Filter } from "lucide-react";
import { memo } from "react";

const SalesReportFilter = () => {
  return (
    <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] p-3.5 flex items-center gap-3">
      <div className="flex items-center gap-3">
        <div className="w-full">
          <DatePicker.RangePicker
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            onChange={(value, dateString) => {
              console.log("Selected Time: ", value);
              console.log("Formatted Selected Time: ", dateString);
            }}
            className="h-11!"
            inputReadOnly
          />
        </div>
        <Button className="flex items-center justify-center gap-3 h-11!" type="primary">
          <Filter className="w-5 h-5" />
          <span className="max-[420px]:hidden">Filterlarsh</span>
        </Button>
      </div>
    </div>
  );
};

export default memo(SalesReportFilter);

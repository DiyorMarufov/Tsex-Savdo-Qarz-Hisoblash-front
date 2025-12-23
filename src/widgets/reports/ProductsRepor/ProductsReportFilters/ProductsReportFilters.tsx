import { memo } from "react";
import Filter from "../../../../shared/ui/Filter/Filter";
import { DatePicker } from "antd";

const ProductsReportFilters = () => {
  return (
    <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] mt-2 p-3.5 grid grid-cols-3 gap-4 max-[1000px]:grid-cols-1">
      <div className="w-full">
        <DatePicker.RangePicker
          showTime={{ format: "HH:mm" }}
          format="YYYY-MM-DD HH:mm"
          onChange={(value, dateString) => {
            console.log("Selected Time: ", value);
            console.log("Formatted Selected Time: ", dateString);
          }}
          className="h-12! w-full "
          inputReadOnly
        />
      </div>
      <div className="grid grid-cols-2 max-[1000px]:col-span-1 gap-4">
        <Filter
          placeholder="Barcha tsexlar"
          className="h-12! max-[1000px]:w-full custom-select"
        />
        <Filter
          placeholder="Barcha do'konlar"
          className="h-12! max-[1000px]:w-full custom-select"
        />
      </div>
    </div>
  );
};

export default memo(ProductsReportFilters);

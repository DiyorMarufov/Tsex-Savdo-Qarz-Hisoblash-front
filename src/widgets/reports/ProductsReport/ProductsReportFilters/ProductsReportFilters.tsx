import { memo } from "react";
import Filter from "../../../../shared/ui/Filter/Filter";
import { DatePicker } from "antd";

const ProductsReportFilters = () => {
  return (
    <div className="rounded-[12px] border border-bg-fy bg-white p-4 grid grid-cols-3 gap-4 max-[1000px]:grid-cols-1">
      <div className="w-full">
        <DatePicker.RangePicker
          showTime={{ format: "HH:mm" }}
          format="YYYY-MM-DD HH:mm"
          placeholder={["Boshlanish", "Tugash"]}
          className="h-11 w-full rounded-lg border-slate-200 hover:border-indigo-400 focus:border-indigo-500 transition-all"
          inputReadOnly
        />
      </div>

      <div className="col-span-2 grid grid-cols-2 gap-4 max-[1000px]:col-span-1 max-[390px]:grid-cols-1">
        <div className="w-full">
          <Filter
            placeholder="Barcha tsexlar"
            className="h-11! w-full rounded-lg custom-select border-slate-200"
          />
        </div>
        <div className="w-full">
          <Filter
            placeholder="Barcha do'konlar"
            className="h-11! w-full rounded-lg custom-select border-slate-200"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(ProductsReportFilters);

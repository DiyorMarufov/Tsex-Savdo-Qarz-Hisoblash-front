import { Button, DatePicker, Drawer } from "antd";
import { memo, useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import Filter from "../../../../shared/ui/Filter/Filter";
import type { Option } from "../../../../shared/lib/types";
import type { DrawerProps } from "antd/lib";
import { FilterOutlined } from "@ant-design/icons";

interface ReportFilterProps {
  onFilterSubmit: (filters: { dates: string[] | null; tsexId: string }) => void;
  start: Dayjs | undefined | null;
  end: Dayjs | undefined | null;
  setIsTsexOpen: (open: boolean) => void;
  tsexId?: string;
  tsexesOptions: Option[];
  tsexLoading: boolean;
}

const ReportFilter = ({
  onFilterSubmit,
  start,
  end,
  setIsTsexOpen,
  tsexId,
  tsexesOptions,
  tsexLoading,
}: ReportFilterProps) => {
  const [open, setOpen] = useState(false);
  const [placement] = useState<DrawerProps["placement"]>("right");
  const [tempDates, setTempDates] = useState<[Dayjs | null, Dayjs | null]>([
    start || null,
    end || null,
  ]);
  const [tempDateStrings, setTempDateStrings] = useState<string[] | null>([
    start ? start.format("YYYY-MM-DD HH:mm:ss") : "",
    end ? end.format("YYYY-MM-DD HH:mm:ss") : "",
  ]);
  const [tempTsexId, setTempTsexId] = useState(tsexId);

  useEffect(() => {
    setTempDates([start || null, end || null]);
    setTempDateStrings([
      start ? start.format("YYYY-MM-DD HH:mm:ss") : "",
      end ? end.format("YYYY-MM-DD HH:mm:ss") : "",
    ]);
    setTempTsexId(tsexId);
  }, [start, end, tsexId]);

  const handleSubmit = () => {
    onFilterSubmit({
      dates: tempDateStrings,
      tsexId: tempTsexId || "",
    });
    setOpen(false);
  };

  const handleRangeChange = (values: any, dateStrings: [string, string]) => {
    setTempDates(values);
    setTempDateStrings(values ? dateStrings : null);
  };

  return (
    <div>
      <div className="rounded-[12px] border border-bg-fy bg-white p-3.5 gap-4 grid grid-cols-5 max-[1150px]:grid-cols-1 max-[800px]:hidden items-end">
        <div className="w-full">
          <DatePicker.RangePicker
            value={tempDates}
            onChange={handleRangeChange}
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            placeholder={["Boshlanish", "Tugash"]}
            className="h-10! w-full rounded-lg border-slate-200"
            inputReadOnly
          />
        </div>

        <div className="col-span-3 grid grid-cols-3 gap-4 max-[1150px]:col-span-1 max-[1150px]:grid-cols-1">
          <div className="w-full">
            <Filter
              value={tempTsexId}
              options={tsexesOptions}
              onChange={setTempTsexId}
              placeholder="Barcha tsexlar"
              className="h-10! w-full rounded-lg custom-select border-slate-200"
              onDropdownVisibleChange={(visible: any) => {
                if (visible) setIsTsexOpen(true);
              }}
              loading={tsexLoading}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="primary"
            icon={<FilterOutlined />}
            className="h-9! w-full max-w-[150px] bg-indigo-600 rounded-lg font-medium"
            onClick={handleSubmit}
          >
            Filtrlash
          </Button>
        </div>
      </div>
      <div className="min-[800px]:hidden flex justify-end">
        <Button
          icon={<FilterOutlined />}
          onClick={() => setOpen(true)}
          className="rounded-lg flex items-center bg-white border-slate-200 text-slate-600"
        >
          Filtrlar
        </Button>
      </div>
      <Drawer
        title="Filtrlar"
        placement={placement}
        onClose={() => setOpen(false)}
        open={open}
        key={placement}
        width={300}
      >
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <p className="mb-1 text-sm text-slate-500">Sana oralig'i</p>
            <DatePicker.RangePicker
              value={tempDates}
              onChange={handleRangeChange}
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
              placeholder={["Boshlanish", "Tugash"]}
              className="h-10! w-full rounded-lg border-slate-200"
              inputReadOnly
            />
          </div>

          <div className="w-full">
            <p className="mb-1 text-sm text-slate-500">Tsexlar</p>
            <Filter
              value={tempTsexId}
              options={tsexesOptions}
              onChange={setTempTsexId}
              placeholder="Barcha tsexlar"
              className="h-10! w-full rounded-lg custom-select border-slate-200"
              onDropdownVisibleChange={(visible: any) => {
                if (visible) setIsTsexOpen(true);
              }}
              loading={tsexLoading}
            />
          </div>

          <Button
            type="primary"
            className="h-9! w-full rounded-lg mt-2 bg-indigo-600"
            onClick={handleSubmit}
          >
            Filtrlash
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default memo(ReportFilter);

import { Button, DatePicker, Drawer } from "antd";
import { memo, useEffect, useState, type FC } from "react";
import { FilterOutlined } from "@ant-design/icons";
import type { DrawerProps } from "antd/lib";
import type { Dayjs } from "dayjs";
import type { Option } from "../../../shared/lib/types";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import Filter from "../../../shared/ui/Filter/Filter";

interface CombinedReportFilterProps {
  onFilterSubmit?: (filters: {
    dates: string[] | null;
    customerId: string;
    workshopId: string;
    storeId: string;
    search?: string;
  }) => void;
  start?: Dayjs | null;
  end?: Dayjs | null;
  customerId?: string;
  workshopId?: string;
  storeId?: string;
  customerOptions?: Option[];
  workshopOptions?: Option[];
  storeOptions?: Option[];
  customerLoading?: boolean;
  workshopLoading?: boolean;
  storeLoading?: boolean;
  onSearchChange?: (value: string) => void;
}

const SalesFilter: FC<CombinedReportFilterProps> = ({
  // onFilterSubmit,
  start,
  end,
  customerId,
  workshopId,
  storeId,
  customerOptions = [],
  workshopOptions = [],
  storeOptions = [],
  customerLoading = false,
  workshopLoading = false,
  storeLoading = false,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [placement] = useState<DrawerProps["placement"]>("right");

  const [tempDates, setTempDates] = useState<[Dayjs | null, Dayjs | null]>([
    start || null,
    end || null,
  ]);
  const [_, setTempDateStrings] = useState<string[] | null>(null);
  const [tempCustomerId, setTempCustomerId] = useState(customerId);
  const [tempWorkshopId, setTempWorkshopId] = useState(workshopId);
  const [tempStoreId, setTempStoreId] = useState(storeId);

  useEffect(() => {
    setTempDates([start || null, end || null]);
    setTempCustomerId(customerId);
    setTempWorkshopId(workshopId);
    setTempStoreId(storeId);
  }, [start, end, customerId, workshopId, storeId]);

  const handleRangeChange = (values: any, dateStrings: [string, string]) => {
    setTempDates(values);
    setTempDateStrings(values ? dateStrings : null);
  };

  const handleSubmit = () => {
    // onFilterSubmit({
    //   dates: tempDateStrings,
    //   customerId: tempCustomerId || "",
    //   workshopId: tempWorkshopId || "",
    //   storeId: tempStoreId || "",
    // });
    setOpen(false);
  };

  return (
    <div>
      <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] grid grid-cols-[300px_1fr] max-[1200px]:grid-cols-1 p-3.5 gap-3 items-center">
        <div className="w-full">
          <SearchInput
            placeholder="Mijoz ismi bo'yicha qidirish"
            className="h-11! bg-bg-ty! text-[16px]! max-[1200px]:w-full!"
          />
        </div>

        <div className="max-[800px]:hidden grid grid-cols-5 gap-3 items-end">
          <div className="w-full">
            <DatePicker.RangePicker
              value={tempDates}
              onChange={handleRangeChange}
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
              placeholder={["Boshlanish", "Tugash"]}
              className="h-11 w-full rounded-lg border-slate-200"
              inputReadOnly
            />
          </div>
          <div className="w-full">
            <Filter
              value={tempCustomerId}
              options={customerOptions}
              onChange={setTempCustomerId}
              placeholder="Barcha mijozlar"
              className="h-11! w-full rounded-lg custom-select border-slate-200"
              loading={customerLoading}
            />
          </div>
          <div className="w-full">
            <Filter
              value={tempWorkshopId}
              options={workshopOptions}
              onChange={setTempWorkshopId}
              placeholder="Barcha tsexlar"
              className="h-11! w-full rounded-lg custom-select border-slate-200"
              loading={workshopLoading}
            />
          </div>
          <div className="w-full">
            <Filter
              value={tempStoreId}
              options={storeOptions}
              onChange={setTempStoreId}
              placeholder="Barcha do'konlar"
              className="h-11! w-full rounded-lg custom-select border-slate-200"
              loading={storeLoading}
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="primary"
              icon={<FilterOutlined />}
              onClick={handleSubmit}
              className="h-11! w-full max-w-[150px] bg-indigo-600 rounded-lg font-medium"
            >
              Filtrlash
            </Button>
          </div>
        </div>

        <div className="min-[800px]:hidden flex justify-end">
          <Button
            icon={<FilterOutlined />}
            onClick={() => setOpen(true)}
            className="h-11 rounded-lg flex items-center bg-white border-slate-200 text-slate-600"
          >
            Filtrlar
          </Button>
        </div>
      </div>

      <Drawer
        title="Filtrlar"
        placement={placement}
        onClose={() => setOpen(false)}
        open={open}
        key={placement}
        width={280}
      >
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <p className="mb-1 text-sm text-slate-500 font-medium">
              Sana oralig'i
            </p>
            <DatePicker.RangePicker
              value={tempDates}
              onChange={handleRangeChange}
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
              placeholder={["Boshlanish", "Tugash"]}
              className="h-11! w-full rounded-lg border-slate-200"
              inputReadOnly
            />
          </div>

          <div className="w-full">
            <p className="mb-1 text-sm text-slate-500 font-medium">Mijozlar</p>
            <Filter
              value={tempCustomerId}
              options={customerOptions}
              onChange={setTempCustomerId}
              placeholder="Barcha mijozlar"
              className="h-11! w-full rounded-lg custom-select border-slate-200"
              loading={customerLoading}
            />
          </div>

          <div className="w-full">
            <p className="mb-1 text-sm text-slate-500 font-medium">Tsexlar</p>
            <Filter
              value={tempWorkshopId}
              options={workshopOptions}
              onChange={setTempWorkshopId}
              placeholder="Barcha tsexlar"
              className="h-11! w-full rounded-lg custom-select border-slate-200"
              loading={workshopLoading}
            />
          </div>

          <div className="w-full">
            <p className="mb-1 text-sm text-slate-500 font-medium">Do'konlar</p>
            <Filter
              value={tempStoreId}
              options={storeOptions}
              onChange={setTempStoreId}
              placeholder="Barcha do'konlar"
              className="h-11! w-full rounded-lg custom-select border-slate-200"
              loading={storeLoading}
            />
          </div>

          <Button
            type="primary"
            icon={<FilterOutlined />}
            onClick={handleSubmit}
            className="h-11! w-full rounded-lg mt-2 bg-indigo-600 flex items-center justify-center font-medium"
          >
            Filtrlash
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default memo(SalesFilter);

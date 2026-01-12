import { Button, DatePicker, Drawer } from "antd";
import { memo, useEffect, useState, type FC } from "react";
import { FilterOutlined } from "@ant-design/icons";
import type { DrawerProps } from "antd/lib";
import type { Dayjs } from "dayjs";
import type { Option } from "../../../shared/lib/types";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import Filter from "../../../shared/ui/Filter/Filter";

interface CombinedReportFilterProps {
  onFilterSubmit: (filters: {
    dates: string[] | null;
    shopId: string;
    tsexId: string;
  }) => void;
  start: Dayjs | undefined | null;
  end: Dayjs | undefined | null;
  shopId?: string;
  tsexId?: string;
  localSearch?: string;
  shopsOptions: Option[];
  tsexesOptions: Option[];
  setIsTsexOpen: (open: boolean) => void;
  setIsShopOpen: (open: boolean) => void;
  handleSearchChange: (value: string) => void;
  tsexLoading: boolean;
  shopLoading: boolean;
}

const SalesFilter: FC<CombinedReportFilterProps> = ({
  onFilterSubmit,
  start,
  end,
  shopId,
  tsexId,
  localSearch,
  shopsOptions = [],
  tsexesOptions = [],
  setIsTsexOpen,
  setIsShopOpen,
  handleSearchChange,
  tsexLoading,
  shopLoading,
}) => {
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
  const [tempShopId, setTempShopId] = useState(shopId);
  const [tempTsexId, setTempTsexId] = useState(tsexId);

  useEffect(() => {
    setTempDates([start || null, end || null]);
    setTempDateStrings([
      start ? start.format("YYYY-MM-DD HH:mm:ss") : "",
      end ? end.format("YYYY-MM-DD HH:mm:ss") : "",
    ]);
    setTempShopId(shopId);
    setTempTsexId(tsexId);
  }, [start, end, shopId, tsexId]);

  const handleSubmit = () => {
    onFilterSubmit({
      dates: tempDateStrings,
      shopId: tempShopId || "",
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
      <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] grid grid-cols-[300px_1fr] max-[1200px]:grid-cols-1 p-3.5 gap-3 items-center">
        <div className="w-full">
          <SearchInput
            placeholder="Do'kon,sotuvchi,mijoz bo'yicha qidirish"
            className="h-10! bg-bg-ty! text-[16px]! max-[1200px]:w-full!"
            value={localSearch}
            onChange={handleSearchChange}
          />
        </div>

        <div className="max-[800px]:hidden grid grid-cols-4 gap-3 items-end">
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
          <div className="w-full">
            <Filter
              value={tempShopId}
              options={shopsOptions}
              onChange={setTempShopId}
              placeholder="Barcha do'konlar"
              className="h-10! w-full rounded-lg custom-select border-slate-200"
              onDropdownVisibleChange={(visible: any) => {
                if (visible) setIsShopOpen(true);
              }}
              loading={shopLoading}
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="primary"
              icon={<FilterOutlined />}
              onClick={handleSubmit}
              className="h-9! w-full max-w-[150px] bg-indigo-600 rounded-lg font-medium"
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
            <p className="mb-1 text-sm text-slate-500 font-medium">
              Sana oralig'i
            </p>
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
            <p className="mb-1 text-sm text-slate-500 font-medium">Tsexlar</p>
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

          <div className="w-full">
            <p className="mb-1 text-sm text-slate-500 font-medium">Do'konlar</p>
            <Filter
              value={tempShopId}
              options={shopsOptions}
              onChange={setTempShopId}
              placeholder="Barcha do'konlar"
              className="h-10! w-full rounded-lg custom-select border-slate-200"
              onDropdownVisibleChange={(visible: any) => {
                if (visible) setIsShopOpen(true);
              }}
              loading={shopLoading}
            />
          </div>

          <Button
            type="primary"
            icon={<FilterOutlined />}
            onClick={handleSubmit}
            className="h-9! w-full rounded-lg mt-2 bg-indigo-600 flex items-center justify-center font-medium"
          >
            Filtrlash
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default memo(SalesFilter);

import { memo, useState, useEffect } from "react";
import Filter from "../../../../shared/ui/Filter/Filter";
import { DatePicker, Drawer, Button, type DrawerProps } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import type { Option } from "../../../../shared/lib/types";
import type { Dayjs } from "dayjs";

interface ProductReportFiltersProps {
  onFilterSubmit: (filters: {
    dates: string[] | null;
    shopId: string;
    tsexId: string;
    productId: string;
  }) => void;
  start: Dayjs | undefined | null;
  end: Dayjs | undefined | null;
  shopId?: string;
  tsexId?: string;
  productId?: string;
  shopsOptions: Option[];
  productOptions: Option[];
  tsexesOptions: Option[];
  setIsProductOpen: (open: boolean) => void;
  setIsTsexOpen: (open: boolean) => void;
  setIsShopOpen: (open: boolean) => void;
  productLoading: boolean;
  tsexLoading: boolean;
  shopLoading: boolean;
}

const ProductsReportFilters = ({
  onFilterSubmit,
  start,
  end,
  shopId,
  tsexId,
  productId,
  shopsOptions = [],
  productOptions = [],
  tsexesOptions = [],
  setIsProductOpen,
  setIsTsexOpen,
  setIsShopOpen,
  productLoading,
  tsexLoading,
  shopLoading,
}: ProductReportFiltersProps) => {
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
  const [tempProductId, setTempProductId] = useState(productId);

  useEffect(() => {
    setTempDates([start || null, end || null]);
    setTempDateStrings([
      start ? start.format("YYYY-MM-DD HH:mm:ss") : "",
      end ? end.format("YYYY-MM-DD HH:mm:ss") : "",
    ]);
    setTempShopId(shopId);
    setTempTsexId(tsexId);
    setTempProductId(productId);
  }, [start, end, shopId, tsexId, productId]);

  const handleSubmit = () => {
    onFilterSubmit({
      dates: tempDateStrings,
      shopId: tempShopId || "",
      tsexId: tempTsexId || "",
      productId: tempProductId || "",
    });
    setOpen(false);
  };

  const handleRangeChange = (values: any, dateStrings: [string, string]) => {
    setTempDates(values);
    setTempDateStrings(values ? dateStrings : null);
  };

  return (
    <div>
      <div className="rounded-[12px] border border-bg-fy bg-white p-4 gap-4 grid grid-cols-5 max-[1150px]:grid-cols-1 max-[800px]:hidden items-end">
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

        <div className="col-span-3 grid grid-cols-3 gap-4 max-[1150px]:col-span-1 max-[390px]:grid-cols-1">
          <div className="w-full">
            <Filter
              value={tempProductId}
              options={productOptions}
              onChange={setTempProductId}
              placeholder="Barcha mahsulotlar"
              className="h-11! w-full rounded-lg custom-select border-slate-200"
              onDropdownVisibleChange={(visible: any) => {
                if (visible) setIsProductOpen(true);
              }}
              loading={productLoading}
            />
          </div>
          <div className="w-full">
            <Filter
              value={tempTsexId}
              options={tsexesOptions}
              onChange={setTempTsexId}
              placeholder="Barcha tsexlar"
              className="h-11! w-full rounded-lg custom-select border-slate-200"
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
              className="h-11! w-full rounded-lg custom-select border-slate-200"
              onDropdownVisibleChange={(visible: any) => {
                if (visible) setIsShopOpen(true);
              }}
              loading={shopLoading}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="primary"
            icon={<FilterOutlined />}
            onClick={handleSubmit}
            className="h-10! w-full max-w-[150px] bg-indigo-600 rounded-lg font-medium"
          >
            Filtrlash
          </Button>
        </div>
      </div>

      <div className="min-[800px]:hidden flex justify-end">
        <Button
          icon={<FilterOutlined />}
          onClick={() => setOpen(true)}
          className="rounded-lg flex items-center bg-white border-slate-200 text-slate-600 h-11"
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
        width={280}
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
              className="h-11! w-full rounded-lg border-slate-200"
              inputReadOnly
            />
          </div>

          <div className="w-full">
            <p className="mb-1 text-sm text-slate-500">Mahsulotlar</p>
            <Filter
              value={tempProductId}
              options={productOptions}
              onChange={setTempProductId}
              placeholder="Barcha mahsulotlar"
              className="h-11! w-full rounded-lg custom-select border-slate-200"
              onDropdownVisibleChange={(visible: any) => {
                if (visible) setIsProductOpen(true);
              }}
              loading={productLoading}
            />
          </div>

          <div className="w-full">
            <p className="mb-1 text-sm text-slate-500">Tsexlar</p>
            <Filter
              value={tempTsexId}
              options={tsexesOptions}
              onChange={setTempTsexId}
              placeholder="Barcha tsexlar"
              className="h-11! w-full rounded-lg custom-select border-slate-200"
              onDropdownVisibleChange={(visible: any) => {
                if (visible) setIsTsexOpen(true);
              }}
              loading={tsexLoading}
            />
          </div>

          <div className="w-full">
            <p className="mb-1 text-sm text-slate-500">Do'konlar</p>
            <Filter
              value={tempShopId}
              options={shopsOptions}
              onChange={setTempShopId}
              placeholder="Barcha do'konlar"
              className="h-11! w-full rounded-lg custom-select border-slate-200"
              onDropdownVisibleChange={(visible: any) => {
                if (visible) setIsShopOpen(true);
              }}
              loading={shopLoading}
            />
          </div>

          <Button
            type="primary"
            className="h-10! w-full rounded-lg mt-2 bg-indigo-600"
            onClick={handleSubmit}
          >
            Filtrlash
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default memo(ProductsReportFilters);

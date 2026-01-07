import { Button, DatePicker, Drawer } from "antd";
import { memo, useEffect, useState, type FC } from "react";
import Filter from "../../../../shared/ui/Filter/Filter";
import { FilterOutlined } from "@ant-design/icons";
import type { DrawerProps } from "antd/lib";
import type { Dayjs } from "dayjs";
import type { Option } from "../../../../shared/lib/types";

interface CustomersReportFilterProps {
  onFilterSubmit: (filters: {
    dates: string[] | null;
    customerId: string;
  }) => void;
  start: Dayjs | undefined | null;
  end: Dayjs | undefined | null;
  customerId?: string;
  customerOptions: Option[];
  setIsCustomerOpen: (open: boolean) => void;
  customerLoading: boolean;
  customerHasNextPage?: boolean;
  customerIsFetchingNextPage?: boolean;
  customerFetchNextPage?: any;
}

const CustomersReportFilter: FC<CustomersReportFilterProps> = ({
  onFilterSubmit,
  start,
  end,
  customerId,
  customerOptions = [],
  setIsCustomerOpen,
  customerLoading,
  customerHasNextPage,
  customerIsFetchingNextPage,
  customerFetchNextPage,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [placement] = useState<DrawerProps["placement"]>("right");

  const [tempDates, setTempDates] = useState<[Dayjs | null, Dayjs | null]>([
    start || null,
    end || null,
  ]);
  const [tempDateStrings, setTempDateStrings] = useState<string[] | null>([
    start ? start.format("YYYY-MM-DD HH:mm:ss") : "",
    end ? end.format("YYYY-MM-DD HH:mm:ss") : "",
  ]);
  const [tempCustomerId, setTempCustomerId] = useState(customerId);

  useEffect(() => {
    setTempDates([start || null, end || null]);
    setTempDateStrings([
      start ? start.format("YYYY-MM-DD HH:mm:ss") : "",
      end ? end.format("YYYY-MM-DD HH:mm:ss") : "",
    ]);
    setTempCustomerId(customerId);
  }, [start, end, customerId]);

  const handleSubmit = () => {
    onFilterSubmit({
      dates: tempDateStrings,
      customerId: tempCustomerId || "",
    });
    setOpen(false);
  };

  const handleRangeChange = (values: any, dateStrings: [string, string]) => {
    setTempDates(values);
    setTempDateStrings(values ? dateStrings : null);
  };

  const handleScroll = (e: any) => {
    const { target } = e;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
      if (customerHasNextPage && !customerIsFetchingNextPage) {
        customerFetchNextPage();
      }
    }
  };
  return (
    <div>
      <div className="rounded-[12px] border border-bg-fy bg-white p-3.5 gap-4 grid grid-cols-4 max-[1150px]:grid-cols-1 max-[800px]:hidden items-end">
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

        <div className="col-span-2 grid grid-cols-2 gap-4 max-[1150px]:col-span-1 max-[390px]:grid-cols-1">
          <div className="w-full">
            <Filter
              onPopupScroll={handleScroll}
              value={tempCustomerId}
              options={customerOptions}
              onChange={setTempCustomerId}
              placeholder="Barcha mijozlar"
              className="h-11! w-full rounded-lg custom-select border-slate-200"
              onDropdownVisibleChange={(visible: any) => {
                if (visible) setIsCustomerOpen(true);
              }}
              dropdownRender={(menu: any) => (
                <>
                  {menu}
                  {customerIsFetchingNextPage && (
                    <span className="text-[12px] text-gray-500">
                      Yuklanmoqda...
                    </span>
                  )}
                </>
              )}
              loading={customerLoading}
            />
          </div>
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
              className="h-11! w-full rounded-lg border-slate-200"
              inputReadOnly
            />
          </div>

          <div className="w-full">
            <p className="mb-1 text-sm text-slate-500">Mijozar</p>
            <Filter
              onPopupScroll={handleScroll}
              value={tempCustomerId}
              options={customerOptions}
              onChange={setTempCustomerId}
              placeholder="Barcha mijozlar"
              className="h-11! w-full rounded-lg custom-select border-slate-200"
              onDropdownVisibleChange={(visible: any) => {
                if (visible) setIsCustomerOpen(true);
              }}
              dropdownRender={(menu: any) => (
                <>
                  {menu}
                  {customerIsFetchingNextPage && (
                    <span className="text-[12px] text-gray-500">
                      Yuklanmoqda...
                    </span>
                  )}
                </>
              )}
              loading={customerLoading}
            />
          </div>

          <Button
            type="primary"
            icon={<FilterOutlined />}
            onClick={handleSubmit}
            className="h-11! w-full rounded-lg mt-2 bg-indigo-600 flex items-center justify-center"
          >
            Filtrlash
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default memo(CustomersReportFilter);

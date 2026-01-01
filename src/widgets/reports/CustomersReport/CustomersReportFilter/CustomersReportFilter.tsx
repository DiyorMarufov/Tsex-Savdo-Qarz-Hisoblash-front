import { Button, DatePicker, Drawer } from "antd";
import { memo, useState } from "react";
import Filter from "../../../../shared/ui/Filter/Filter";
import { FilterOutlined } from "@ant-design/icons";
import type { DrawerProps } from "antd/lib";

const CustomersReportFIlter = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [placement] = useState<DrawerProps["placement"]>("right");

  return (
    <div>
      <div className="rounded-[12px] border border-bg-fy bg-white p-3.5 gap-4 grid grid-cols-4 max-[1150px]:grid-cols-1 max-[800px]:hidden items-end">
        <div className="w-full">
          <DatePicker.RangePicker
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
              placeholder="Barcha mijozlar"
              className="h-11! w-full rounded-lg custom-select border-slate-200"
            />
          </div>
          <div className="w-full">
            <Filter
              placeholder="Barcha tranzaksiya tiplar"
              className="h-11! w-full rounded-lg custom-select border-slate-200"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="primary"
            icon={<FilterOutlined />}
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
              placeholder="Barcha mijozlar"
              className="h-11! w-full rounded-lg custom-select border-slate-200"
            />
          </div>

          <div className="w-full">
            <p className="mb-1 text-sm text-slate-500">Tranzaksiya tiplar</p>
            <Filter
              placeholder="Barcha tranzaksiya tiplar"
              className="h-11! w-full rounded-lg custom-select border-slate-200"
            />
          </div>

          <Button
            type="primary"
            icon={<FilterOutlined />}
            className="h-11! w-full rounded-lg mt-2 bg-indigo-600 flex items-center justify-center"
          >
            Filtrlash
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default memo(CustomersReportFIlter);

import { Select, Switch } from "antd";
import { memo } from "react";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";

const SystemParameters = () => {
  return (
    <div className="bg-white rounded-xl border border-bg-fy overflow-hidden">
      <div className="px-3.5 py-3 border-b border-gray-50">
        <h3 className="font-bold text-gray-800">Tizim parametrlari</h3>
      </div>
      <div className="px-3.5 pb-3.5 flex justify-between max-[800px]:flex-col gap-5">
        <div className="flex min-[395px]:items-center justify-between min-[395px]:gap-5 gap-3 max-[395px]:flex-col">
          <p className="text-sm font-semibold text-gray-800">Tizim tili</p>
          <Select
            defaultValue="uz"
            className="w-64 h-10! max-[390px]:w-full"
            options={[
              { value: "uz", label: "O'zbek" },
              { value: "en", label: "English" },
              { value: "ru", label: "Русский" },
            ]}
          />
        </div>

        <div className="flex items-center justify-between gap-5">
          <p className="text-sm font-semibold text-gray-800">Mavzu rejimi</p>

          <div className="flex items-center gap-3">
            <Switch
              defaultChecked
              checkedChildren={<MoonOutlined className="text-[12px]" />}
              unCheckedChildren={<SunOutlined className="text-[12px]" />}
              className="bg-gray-300 peer-checked:bg-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SystemParameters);

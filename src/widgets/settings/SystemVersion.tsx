import { memo } from "react";

const SystemVersion = () => (
  <div className="bg-[#ffffff] rounded-xl border border-bg-fy p-3.5">
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-800">
            Tizim versiyasi
          </span>
          <span className="text-xs text-gray-500">
            Oxirgi yangilanish: 15.05.2024
          </span>
        </div>
      </div>
      <div className="px-3 py-1 bg-white border border-gray-200 rounded-md shadow-sm">
        <span className="text-xs font-bold text-[#137fec]">v2.4.12-stable</span>
      </div>
    </div>
  </div>
);

export default memo(SystemVersion);

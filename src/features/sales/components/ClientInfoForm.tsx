import { Select } from "antd";
import { Plus } from "lucide-react";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import type { Option } from "../../../shared/lib/types";

interface ClientInfoFormProps {
  customerId?: string;
  handleChange: (key: "customerId", value: string) => void;
  customerOptions: Option[];
  customerListLoading: boolean;
  customerHasNextPage?: boolean;
  customerIsFetchingNextPage?: boolean;
  customerFetchNextPage?: any;
  onSearchChange?: (value: string) => void;
  setIsCustomerOpen: (visible: boolean) => void;
}

const ClientInfoForm = ({
  customerId,
  handleChange,
  customerOptions,
  customerListLoading,
  customerHasNextPage,
  customerIsFetchingNextPage,
  customerFetchNextPage,
  onSearchChange,
  setIsCustomerOpen,
}: ClientInfoFormProps) => {
  const navigate = useNavigate();

  const handleScroll = (e: any) => {
    const { target } = e;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
      if (customerHasNextPage && !customerIsFetchingNextPage) {
        customerFetchNextPage();
      }
    }
  };
  return (
    <div className="border border-bg-fy rounded-[5px] overflow-hidden">
      <div className="flex flex-col justify-end gap-2 bg-[#ffffff] p-4">
        <span className="text-[18px] text-[#232E2F]">Mijoz ma'lumotlari</span>
        <div className="flex items-end w-full gap-5">
          <div className="w-full flex flex-col gap-1">
            <span className="text-[16px] text-[#232E2F]">Mijoz</span>
            <Select
              className="h-10!"
              onPopupScroll={handleScroll}
              value={customerListLoading ? undefined : customerId}
              onChange={(val) => handleChange("customerId", val)}
              options={customerOptions}
              placeholder={
                customerListLoading
                  ? "Yuklanmoqda..."
                  : "Mijozni qidiring yoki tanlang"
              }
              onDropdownVisibleChange={(visible) => {
                if (visible) setIsCustomerOpen(visible);
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
              loading={customerListLoading}
              showSearch
              filterOption={false}
              onSearch={onSearchChange}
              allowClear
            />
          </div>
          <div
            className="p-2.5 rounded-full bg-green-500 cursor-pointer hover:opacity-80"
            onClick={() => navigate("/admin/customers")}
          >
            <Plus className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ClientInfoForm);

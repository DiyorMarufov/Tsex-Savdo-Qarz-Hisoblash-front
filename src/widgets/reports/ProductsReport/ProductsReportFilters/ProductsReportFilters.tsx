import { memo, useEffect, useState } from "react";
import Filter from "../../../../shared/ui/Filter/Filter";
import { DatePicker, Drawer, Button, Form } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import type { Option } from "../../../../shared/lib/types";
import type { Dayjs } from "dayjs";

// --- INTERFACE START ---
interface ProductReportFiltersProps {
  onFilterSubmit: (filters: {
    dates: string[] | null;
    customerId: string;
    shopId: string;
    tsexId: string;
    modelId: string;
  }) => void;
  start: Dayjs | undefined | null;
  end: Dayjs | undefined | null;
  customerId?: string;
  shopId?: string;
  tsexId?: string;
  modelId?: string;
  customerOptions?: Option[];
  shopsOptions: Option[];
  modelOptions?: Option[];
  tsexesOptions: Option[];
  setIsCustomerOpen?: (open: boolean) => void;
  customerHasNextPage?: boolean;
  customerIsFetchingNextPage?: boolean;
  customerFetchNextPage?: any;
  onSearchCustomerChange?: (value: string) => void;
  setIsModelOpen?: (open: boolean) => void;
  setIsTsexOpen: (open: boolean) => void;
  setIsShopOpen: (open: boolean) => void;
  modelLoading?: boolean;
  modelHasNextPage?: boolean;
  modeltIsFetchingNextPage?: boolean;
  modelFetchNextPage?: any;
  onSearchChange?: (value: string) => void;
  customerLoading?: boolean;
  tsexLoading: boolean;
  shopLoading: boolean;
  isProduct?: boolean;
}

interface FilterFormValues {
  range: [Dayjs | null, Dayjs | null];
  customerId: string;
  shopId: string;
  tsexId: string;
  modelId: string;
}

const ProductsReportFilters = ({
  onFilterSubmit,
  start,
  end,
  customerId,
  shopId,
  tsexId,
  modelId,
  customerOptions = [],
  shopsOptions = [],
  modelOptions = [],
  tsexesOptions = [],
  setIsCustomerOpen,
  customerHasNextPage,
  customerIsFetchingNextPage,
  customerFetchNextPage,
  onSearchCustomerChange,
  setIsModelOpen,
  setIsTsexOpen,
  setIsShopOpen,
  modelLoading,
  modelHasNextPage,
  modeltIsFetchingNextPage,
  modelFetchNextPage,
  onSearchChange,
  customerLoading,
  tsexLoading,
  shopLoading,
  isProduct = true,
}: ProductReportFiltersProps) => {
  const [form] = Form.useForm<FilterFormValues>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      range: [start || null, end || null],
      customerId: customerId || "",
      shopId: shopId || "",
      tsexId: tsexId || "",
      modelId: modelId || "",
    });
  }, [start, end, shopId, tsexId, modelId, form]);

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    const range = values.range;

    onFilterSubmit({
      dates:
        range && range[0] && range[1]
          ? [
              range[0].format("YYYY-MM-DD HH:mm:ss"),
              range[1].format("YYYY-MM-DD HH:mm:ss"),
            ]
          : null,
      customerId: values.customerId || "",
      shopId: values.shopId || "",
      tsexId: values.tsexId || "",
      modelId: values.modelId || "",
    });
    setOpen(false);
  };

  const handleScroll = (e: any) => {
    const { target } = e;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
      if (modelHasNextPage && !modeltIsFetchingNextPage) {
        modelFetchNextPage();
      }

      if (customerHasNextPage && !customerIsFetchingNextPage) {
        customerFetchNextPage();
      }
    }
  };

  const renderFilterFields = (isVertical: boolean) => (
    <>
      <div className="w-full">
        {isVertical && (
          <p className="mb-1 text-sm text-slate-500">Sana oralig'i</p>
        )}
        <Form.Item name="range" noStyle>
          <DatePicker.RangePicker
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            placeholder={["Boshlanish", "Tugash"]}
            className="h-10! w-full rounded-lg border-slate-200"
            inputReadOnly
          />
        </Form.Item>
      </div>

      <div
        className={
          isVertical
            ? "flex flex-col gap-4"
            : "col-span-3 grid grid-cols-3 gap-4 max-[1150px]:col-span-1 max-[390px]:grid-cols-1"
        }
      >
        {!isProduct && (
          <div className="w-full">
            {isVertical && (
              <p className="mb-1 text-sm text-slate-500">Mijozlar</p>
            )}
            <Form.Item name="customerId" noStyle>
              <Filter
                onPopupScroll={handleScroll}
                value={customerId}
                options={customerOptions}
                placeholder="Barcha mijozlar"
                className="h-10! w-full rounded-lg custom-select border-slate-200"
                onDropdownVisibleChange={(visible: any) => {
                  if (visible) setIsCustomerOpen?.(true);
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
                showSearch
                filterOption={false}
                onSearch={onSearchCustomerChange}
              />
            </Form.Item>
          </div>
        )}

        {isProduct && (
          <div className="w-full">
            {isVertical && (
              <p className="mb-1 text-sm text-slate-500">Modellar</p>
            )}
            <Form.Item name="modelId" noStyle>
              <Filter
                onPopupScroll={handleScroll}
                options={modelOptions}
                placeholder={
                  modelLoading ? "Yuklanmoqda..." : "Barcha modellar"
                }
                className="h-10! w-full rounded-lg custom-select border-slate-200"
                onOpenChange={(visible: boolean) =>
                  visible && setIsModelOpen?.(true)
                }
                dropdownRender={(menu: any) => (
                  <>
                    {menu}
                    {modeltIsFetchingNextPage && (
                      <span className="text-[12px] text-gray-500">
                        Yuklanmoqda...
                      </span>
                    )}
                  </>
                )}
                loading={modelLoading}
                showSearch
                filterOption={false}
                onSearch={onSearchChange}
              />
            </Form.Item>
          </div>
        )}
        <div className="w-full">
          {isVertical && <p className="mb-1 text-sm text-slate-500">Tsexlar</p>}
          <Form.Item name="tsexId" noStyle>
            <Filter
              options={tsexesOptions}
              placeholder="Barcha tsexlar"
              className="h-10! w-full rounded-lg custom-select border-slate-200"
              onOpenChange={(visible: boolean) =>
                visible && setIsTsexOpen(true)
              }
              loading={tsexLoading}
            />
          </Form.Item>
        </div>
        <div className="w-full">
          {isVertical && (
            <p className="mb-1 text-sm text-slate-500">Do'konlar</p>
          )}
          <Form.Item name="shopId" noStyle>
            <Filter
              options={shopsOptions}
              placeholder="Barcha do'konlar"
              className="h-10! w-full rounded-lg custom-select border-slate-200"
              onOpenChange={(visible: boolean) =>
                visible && setIsShopOpen(true)
              }
              loading={shopLoading}
            />
          </Form.Item>
        </div>
      </div>
    </>
  );

  return (
    <Form form={form} component={false}>
      <div className="rounded-[12px] border border-bg-fy bg-white p-3.5 gap-4 grid grid-cols-5 max-[1150px]:grid-cols-1 max-[800px]:hidden items-end">
        {renderFilterFields(false)}
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

      <Drawer
        title="Filtrlar"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        width={300}
      >
        <div className="flex flex-col gap-4">
          {renderFilterFields(true)}
          <Button
            type="primary"
            className="h-9! w-full rounded-lg mt-2 bg-indigo-600"
            onClick={handleSubmit}
          >
            Filtrlash
          </Button>
        </div>
      </Drawer>
    </Form>
  );
};

export default memo(ProductsReportFilters);

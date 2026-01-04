import { memo, useEffect, useRef, useState } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import ProTable from "@ant-design/pro-table";
import { Edit, Filter } from "lucide-react";
import {
  Modal,
  Button as AntdButton,
  Form,
  type FormProps,
  DatePicker,
  Select,
} from "antd";

import CountUp from "react-countup";
import {
  fakeSales,
  salesColumns,
  type SalesTableListItem,
} from "../../../shared/lib/model/reports/sales-model";
import {
  fakeSalesItems,
  salesItemColumns,
  type SaleItemsTableListItem,
} from "../../../shared/lib/model/reports/sales-items-detail-model";

type filterFieldType = {
  store?: string;
  tsex?: string;
  customer?: string;
};

const AdminReportsPage = () => {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [detailOpen, setdetailOpen] = useState<boolean>(false);
  const saleId = useRef<string | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);
  // Filter starts
  const handleFilter = () => {
    setFilterOpen(true);
  };

  const handleCancelFilter = () => {
    setFilterOpen(false);
  };

  const filterOnFinish: FormProps<filterFieldType>["onFinish"] = (
    values: filterFieldType,
  ) => {
    console.log("Success:", values);
  };
  // Filter ends

  // Sale Items detail starts
  const handleSaleItems = (id: string) => {
    saleId.current = id;
    setdetailOpen(true);
  };

  const handleCancelSaleItems = () => {
    setdetailOpen(false);
  };
  // Sale Items detail ends

  return (
    <div className="relative pb-11.5">
      <div>
        <LargeTitle title="Hisobotlar" />
      </div>

      <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] mt-2 p-3.5 flex items-center gap-3">
        <SearchInput
          placeholder="Ismi yoki telefon raqami bo'yicha qidirish"
          className="h-12! bg-bg-ty! text-[17px]!"
        />
        <div
          className="p-[11px] border border-[#D9D9D9] rounded-[5px] bg-bg-ty cursor-pointer opacity-70"
          onClick={handleFilter}
        >
          <Filter />
        </div>
      </div>
      <div className="mt-4 max-[500px]:hidden">
        <ProTable
          dataSource={fakeSales}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            responsive: false,
          }}
          columns={salesColumns(handleSaleItems)}
          search={false}
          dateFormatter="string"
          scroll={{ x: "max-content" }}
          footer={() => (
            <div>
              <span className="text-[17px] font-bold">
                Jami savdo:{" "}
                <span className="text-green-500 font-bold text-[18px]">
                  15,000,000
                </span>
              </span>
            </div>
          )}
        />
      </div>

      <div className="min-[500px]:hidden flex flex-col gap-5 mt-4">
        {fakeSales.map((sl: SalesTableListItem) => (
          <div
            key={sl.id}
            className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px]"
          >
            <div className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px]">
              <div className="flex justify-between px-3.5 py-2.5">
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold text-[#6B7280]">
                    {sl.shop.name}
                  </span>
                  <a className="text-[16px] font-bold">
                    {sl.customer.full_name}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={`px-2 rounded-full text-[16px] font-bold 
    ${
      sl.type === "full_payment"
        ? "bg-green-100 text-green-700"
        : sl.type === "partial_payment"
          ? "bg-yellow-100 text-yellow-700"
          : sl.type === "real"
            ? "bg-blue-100 text-blue-700"
            : "bg-gray-100 text-[#4B5563]"
    }`}
                  >
                    <span className="text-[12px] font-bold">
                      {sl.type === "full_payment"
                        ? "To'liq to'lov"
                        : sl.type === "partial_payment"
                          ? "Qisman to'lov"
                          : sl.type === "real"
                            ? "Real"
                            : sl.type}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3 px-3.5">
                  <div className="flex flex-col justify-start">
                    <span className="text-[15px] font-medium text-[#6B7280]">
                      Summa
                    </span>
                    <span className="text-[16px] font-bold text-green-600">
                      {sl.total_amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-col justify-start">
                    <span className="text-[15px] font-medium text-[#6B7280]">
                      To'langan
                    </span>
                    <span className="text-[16px] font-bold text-green-600">
                      {sl.paid_amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-col justify-start">
                    <span className="text-[15px] font-medium text-[#6B7280]">
                      Qarz
                    </span>
                    {sl.debt > 0 ? (
                      <span className="text-[16px] font-bold text-red-500">
                        -{sl.debt.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-[16px] font-bold text-red-500">
                        {sl.debt.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col justify-start">
                    <span className="text-[15px] font-medium text-[#6B7280]">
                      Sotuvchi
                    </span>
                    <span className="text-[16px] font-bold text-[#4B5563]">
                      {sl.seller.full_name}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-start px-3.5">
                  <span className="text-[15px] font-medium text-[#6B7280]">
                    Kiritilgan sana
                  </span>
                  <span className="text-[16px] font-bold text-[#4B5563]">
                    {sl.created_at.toLocaleString("uz-UZ")}
                  </span>
                </div>

                <div className="w-full h-px bg-bg-fy"></div>

                <div className="flex justify-end px-3.5 pb-3">
                  <div>
                    <AntdButton
                      className="bg-[#1D4ED8]! text-white!"
                      onClick={() => handleSaleItems(sl.id as string)}
                    >
                      Batafsil
                    </AntdButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        title="Filterlar"
        closable={{ "aria-label": "Custom Close Button" }}
        open={filterOpen}
        onCancel={handleCancelFilter}
        footer={
          <div className="flex gap-2 justify-end">
            <AntdButton
              className="bg-red-500! text-white!"
              onClick={handleCancelFilter}
            >
              Bekor qilish
            </AntdButton>
            <AntdButton
              onClick={() => form.submit()}
              className="bg-green-500! text-white!"
            >
              Tasdiqlash
            </AntdButton>
          </div>
        }
      >
        <div className="mt-6">
          <Form name="basic" onFinish={filterOnFinish} form={form}>
            <div className="mb-5 w-full">
              <span className="flex mb-1 font-medium text-[15px]">
                Sana oralig'i
              </span>
              <DatePicker.RangePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                onChange={(value, dateString) => {
                  console.log("Selected Time: ", value);
                  console.log("Formatted Selected Time: ", dateString);
                }}
                className="h-10! w-full"
                inputReadOnly
              />
            </div>

            <div>
              <span className="flex mb-1 font-medium text-[15px]">Do'kon</span>
              <Form.Item<filterFieldType> name="store">
                <Select className="h-10!" />
              </Form.Item>
            </div>

            <div>
              <span className="flex mb-1 font-medium text-[15px]">Tsex</span>
              <Form.Item<filterFieldType> name="tsex" className="w-full!">
                <Select className="h-10!" />
              </Form.Item>
            </div>

            <div>
              <span className="flex mb-1 font-medium text-[15px]">Mijoz</span>
              <Form.Item<filterFieldType> name="customer">
                <Select className="h-10!" />
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>

      <Modal
        centered
        className="w-[1000px]! custom-modal-bg"
        styles={{
          body: {
            maxHeight: "79vh",
            overflowY: "auto",
          },
        }}
        title={
          <div className="flex flex-col">
            <div>Sotuv tavsilotlari</div>
            <div className="flex gap-[3px] text-[#6C7381] text-[13px]">
              <div>Sotuv ID: efaiejnfa</div>| <div>Mijoz: Kimdur</div>|
              <div>Sana 25.05.2025</div>
            </div>
          </div>
        }
        closable={{ "aria-label": "Custom Close Button" }}
        open={detailOpen}
        onCancel={handleCancelSaleItems}
        footer={
          <div className="flex flex-col gap-4">
            <div className="text-[17px] font-bold">
              Umumiy summa: <span>15,000,000</span>
            </div>
            <div className="flex gap-2 justify-end">
              <AntdButton
                className="bg-red-500! text-white!"
                onClick={handleCancelSaleItems}
              >
                Bekor qilish
              </AntdButton>
            </div>
          </div>
        }
      >
        <div className="max-[500px]:hidden">
          <ProTable
            dataSource={fakeSalesItems}
            rowKey="id"
            pagination={{
              showSizeChanger: true,
              responsive: false,
            }}
            columns={salesItemColumns}
            search={false}
            dateFormatter="string"
            scroll={{ x: "max-content" }}
          />
        </div>

        <div className="mt-4 min-[500px]:hidden flex flex-col gap-5">
          {fakeSalesItems.map((sli: SaleItemsTableListItem) => (
            <div
              key={sli.id}
              className="flex flex-col gap-3 border border-bg-fy bg-[#ffffff] rounded-[12px] overflow-hidden"
            >
              <div className="flex justify-between items-center gap-3 pt-3 px-3.5">
                <div className="flex flex-col items-start">
                  <span className="text-[15px] font-bold text-[#64748B]">
                    Mahsulot
                  </span>
                  <a className="text-[16px] font-bold">{sli.product}</a>
                </div>
                <div className="flex flex-col items-end">
                  <Edit className="text-green-600 cursor-pointer hover:opacity-80" />
                </div>
              </div>

              <div className="flex px-3.5">
                <div className="flex flex-col w-1/2">
                  <span className="text-[15px] font-medium text-[#6B7280]">
                    Soni
                  </span>
                  <span className="text-[16px] font-bold text-[#4B5563]">
                    {sli.quantity}
                  </span>
                </div>
                <div className="flex flex-col w-1/2">
                  <span className="text-[15px] font-medium text-[#6B7280]">
                    Narxi
                  </span>
                  <span className="text-[16px] font-bold text-green-500">
                    {sli.sale_price.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="w-full h-px bg-bg-fy"></div>

              <div className="flex px-3.5 pb-3">
                <div className="flex flex-col w-1/2">
                  <span className="text-[15px] font-medium text-[#6B7280]">
                    Umumiy Summa
                  </span>
                  <span className="text-[16px] font-bold text-green-500">
                    {sli.total_amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-col w-1/2">
                  <span className="text-[15px] font-medium text-[#6B7280]">
                    Sotuv Sanasi
                  </span>
                  <span className="text-[15px] font-bold text-[#4B5563]">
                    {sli.created_at.toLocaleString("uz-UZ")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      <div
        className="min-[500px]:hidden fixed bottom-18 right-2.5 z-50 
                bg-[#ffffff] border border-gray-200 
                shadow-sm rounded-full p-2 pl-[15px]
                flex items-center justify-center w-[95%] overflow-auto"
      >
        <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
          Jami savdo:
        </span>

        <span className="font-extrabold text-[17px] text-green-600 truncate ml-2">
          <CountUp start={0} end={15200200} duration={2.5} separator="," />
        </span>
      </div>
    </div>
  );
};

export default memo(AdminReportsPage);

import { memo, useRef, useState } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import ProTable from "@ant-design/pro-table";
import { Edit, Filter, Trash } from "lucide-react";
import {
  Modal,
  Button as AntdButton,
  Form,
  type FormProps,
  DatePicker,
  Select,
} from "antd";
import {
  fakeSales,
  salesColumns,
  type SalesTableListItem,
} from "./model/sales-model";
import {
  fakeSalesItems,
  salesItemColumns,
} from "./model/sales-items-detail-model";

type filterFieldType = {
  store?: string;
  tsex?: string;
  customer?: string;
};

const ReportsPage = () => {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [detailOpen, setdetailOpen] = useState<boolean>(false);
  const saleId = useRef<string | null>(null);
  const [form] = Form.useForm();
  // Filter starts
  const handleFilter = () => {
    setFilterOpen(true);
  };

  const handleCancelFilter = () => {
    setFilterOpen(false);
  };

  const filterOnFinish: FormProps<filterFieldType>["onFinish"] = (
    values: filterFieldType
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
    <div>
      <div>
        <LargeTitle title="Hisobotlar" />
      </div>

      <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] mt-2 p-[17px] flex items-center gap-3">
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
        />
      </div>

      <div className="min-[500px]:hidden flex flex-col gap-5 mt-4">
        {fakeSales.map((sl: SalesTableListItem) => (
          <div
            key={sl.id}
            className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px]"
          >
            <div className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px]">
              <div className="flex justify-between p-5">
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold text-[#6B7280]">
                    {sl.store.name}
                  </span>
                  <a className="text-[17px] font-bold">{sl.customer.name}</a>
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
                    <span className="text-[14px] font-bold">
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
                <div className="grid grid-cols-2 gap-3 px-5">
                  <div className="flex flex-col justify-start">
                    <span className="text-[16px] font-medium text-[#6B7280]">
                      Summa
                    </span>
                    <span className="text-[17px] font-bold text-green-600">
                      {sl.total_sum.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-col justify-start">
                    <span className="text-[16px] font-medium text-[#6B7280]">
                      To'langan
                    </span>
                    <span className="text-[17px] font-bold text-green-600">
                      {sl.paid_amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-col justify-start">
                    <span className="text-[16px] font-medium text-[#6B7280] whitespace-nowrap">
                      Qarz
                    </span>
                    {sl.debt > 0 ? (
                      <span className="text-[17px] font-bold text-red-500">
                        -{sl.debt.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-[17px] font-bold text-red-500">
                        {sl.debt.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col justify-start">
                    <span className="text-[16px] font-medium text-[#6B7280]">
                      Sotuvchi
                    </span>
                    <span className="text-[17px] font-bold text-[#4B5563]">
                      {sl.seller.name}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-start px-5">
                  <span className="text-[16px] font-medium text-[#6B7280]">
                    Kiritilgan sana
                  </span>
                  <span className="text-[17px] font-bold text-[#4B5563]">
                    {sl.created_at.toLocaleString("uz-UZ")}
                  </span>
                </div>

                <div className="w-full h-px bg-bg-fy"></div>

                <div className="flex justify-between mt-1 px-5 pb-4">
                  <div className="flex items-center gap-5">
                    <Edit className="text-green-600 cursor-pointer hover:opacity-80" />
                    <Trash className="text-red-600 cursor-pointer hover:opacity-80" />
                  </div>
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
        className="w-[1000px]!"
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
      </Modal>
    </div>
  );
};

export default memo(ReportsPage);

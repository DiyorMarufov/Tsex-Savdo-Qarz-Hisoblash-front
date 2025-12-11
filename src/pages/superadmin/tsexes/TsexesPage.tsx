import { memo, useEffect, useState } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import { Button as AntdButton, Pagination } from "antd";
import Button from "../../../shared/ui/Button/Button";
import { Edit, Plus } from "lucide-react";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import ProTable from "@ant-design/pro-table";
import {
  fakeTsexData,
  tsexColumns,
  type TsexTableListItem,
} from "./model/tsexes-model";
import { Form, Input, Modal, Select, type FormProps } from "antd";
import CountUp from "react-countup";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

type FieldType = {
  tsex_id: string;
  type: "partial_payment" | "payment" | "avans";
  amount: number;
  description?: string;
};

const TsexesPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [form] = Form.useForm();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);
  // Add Modal starts
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // Add Modal ends

  // Add transaction starts
  const onFinish: FormProps<FieldType>["onFinish"] = (values: FieldType) => {
    console.log("Success:", values);
  };
  // Add transaction ends

  // HandleOpenDetail starts
  const handleOpenDetail = (id: string) => {
    navigate(`transactions/${id}`);
  };
  // HanleOpenDetail ends
  if (pathname.startsWith("/superadmin/tsexes/transactions")) return <Outlet />;

  return (
    <div>
      <div className="flex items-center justify-between gap-3 max-[500px]:flex-wrap">
        <div className="flex justify-between items-center w-full">
          <LargeTitle title="Tsexlar" />
          <div
            className="min-[500px]:hidden p-2.5 rounded-full bg-green-500 cursor-pointer hover:opacity-80"
            onClick={showModal}
          >
            <Plus className="text-white" />
          </div>
        </div>
        <div className="max-[500px]:hidden">
          <Button className="flex gap-2 max-[500px]:w-full" onClick={showModal}>
            <Plus /> Yangi operatsiya
          </Button>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-5 max-[1250px]:grid-cols-2 max-[500px]:grid-cols-1">
        <div className="border border-bg-fy bg-[#ffffff] rounded-2xl p-7 flex flex-col gap-1 max-[500px]:items-center">
          <span className="text-[22px] font-medium text-bg-py max-[900px]:text-[20px] max-[500px]:text-[17px]">
            Jami haqdorlik
          </span>
          <span className="font-bold text-[30px] text-green-600 max-[900px]:text-[25px] max-[500px]:text-[22px]">
            <CountUp
              start={0}
              end={15200000}
              duration={2.5}
              separator=","
              decimal="."
              suffix=" UZS"
            />
          </span>
        </div>
        <div className="border border-bg-fy bg-[#ffffff] rounded-2xl p-7 flex flex-col gap-1 max-[500px]:items-center">
          <span className="text-[22px] font-medium text-bg-py max-[900px]:text-[20px] max-[500px]:text-[17px]">
            Jami qarzdorlik
          </span>
          <span className="font-bold text-[30px] text-red-600 max-[900px]:text-[25px] max-[500px]:text-[22px]">
            <CountUp
              start={0}
              end={-15200000}
              duration={2.5}
              separator=","
              decimal="."
              suffix=" UZS"
            />
          </span>
        </div>
        <div
          className="border border-[#e5e5e5] bg-white rounded-2xl p-7 flex flex-col gap-1
                max-[1250px]:col-span-2 max-[1250px]:items-center
                max-[500px]:col-span-1"
        >
          <span className="text-[22px] font-medium text-bg-py max-[900px]:text-[20px] max-[500px]:text-[17px]">
            Umumiy balans
          </span>
          <span className="font-bold text-[30px] text-green-600 max-[900px]:text-[25px] max-[500px]:text-[22px]">
            <CountUp
              start={0}
              end={15200000}
              duration={2.5}
              separator=","
              decimal="."
              suffix=" UZS"
            />
          </span>
        </div>
      </div>

      <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] mt-6 p-3.5 flex items-center gap-5 max-[960px]:flex-wrap">
        <SearchInput
          placeholder="Tsex nomi yoki operatsiya bo'yicha qidirish"
          className="h-12! bg-bg-ty! text-[17px]!"
        />
      </div>

      <div className="mt-4 max-[500px]:hidden">
        <ProTable
          dataSource={fakeTsexData}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            responsive: false,
          }}
          columns={tsexColumns(handleOpenDetail)}
          search={false}
          dateFormatter="string"
          scroll={{ x: "max-content" }}
        />
      </div>

      <div className="min-[500px]:hidden flex flex-col gap-5 mt-4">
        {fakeTsexData.map((ts: TsexTableListItem) => (
          <div
            key={ts.id}
            className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px]"
          >
            <div className="flex flex-col">
              <div className="grid grid-cols-2 gap-3 px-3.5 py-2.5">
                <div className="flex flex-col justify-start">
                  <span className="text-[15px] font-medium text-[#6B7280]">
                    Nomi
                  </span>
                  <a className="text-[16px] font-bold text-green-600">
                    {ts.name}
                  </a>
                </div>
                <div className="flex flex-col justify-start">
                  <span className="text-[15px] font-medium text-[#6B7280]">
                    Tsex Manager
                  </span>
                  <span className="text-[16px] font-bold text-[#4B5563]">
                    {ts.tsex.name}
                  </span>
                </div>
                <div className="flex flex-col justify-start">
                  <span className="text-[15px] font-medium text-[#6B7280] whitespace-nowrap">
                    Balansi
                  </span>
                  {ts.balance > 0 ? (
                    <span className="text-[16px] font-bold text-red-500">
                      -{ts.balance.toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-[16px] font-bold text-green-500">
                      {ts.balance.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 pb-2.5">
                <div className="flex flex-col px-3.5">
                  <div>
                    <span className="font-medium text-[#6B7280] text-[15px]">
                      Oxirgi operatsiya
                    </span>
                  </div>
                  <div>
                    <span className="text-[16px] font-bold text-[#4B5563]">
                      {ts.last_operation}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col px-3.5">
                  <div>
                    <span className="font-medium text-[#6B7280] text-[15px]">
                      Kiritilgan sana
                    </span>
                  </div>
                  <div>
                    <span className="text-[16px] font-bold text-[#4B5563]">
                      {ts.created_at.toLocaleString("uz-UZ")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-bg-fy"></div>

              <div className="flex justify-between mt-1 px-3.5 pt-2 pb-3">
                <div className="flex items-center gap-5">
                  <Edit className="text-green-600 cursor-pointer hover:opacity-80" />
                </div>
                <div>
                  <AntdButton
                    className="bg-[#1D4ED8]! text-white!"
                    onClick={() => handleOpenDetail(ts.id)}
                  >
                    Batafsil
                  </AntdButton>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-center">
          <Pagination />
        </div>
      </div>

      <Modal
        centered
        title="To'lov qilish"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={
          <div className="flex gap-2 justify-end">
            <AntdButton
              className="bg-red-500! text-white!"
              onClick={handleCancel}
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
          <Form name="basic" onFinish={onFinish} form={form}>
            <div>
              <span className="flex mb-1 font-medium text-[15px]">Tsex</span>
              <Form.Item<FieldType>
                name="tsex_id"
                rules={[
                  {
                    required: true,
                    message: "Tsex tanlanishi shart!",
                  },
                ]}
              >
                <Select className="h-10!" />
              </Form.Item>
            </div>

            <div>
              <span className="flex mb-1 font-medium text-[15px]">
                To'lov turi
              </span>
              <Form.Item<FieldType>
                name="type"
                rules={[
                  {
                    required: true,
                    message: "To'lov turi tanlanishi shart!",
                  },
                ]}
              >
                <Select className="h-10!" />
              </Form.Item>
            </div>

            <div>
              <span className="flex mb-1 font-medium text-[15px]">Summa</span>
              <Form.Item<FieldType>
                name="amount"
                rules={[
                  {
                    required: true,
                    message: "To'lov summasi kiritilishi shart!",
                  },
                ]}
              >
                <Input className="h-10!" placeholder="0.00 UZS" />
              </Form.Item>
            </div>

            <div>
              <span className="flex mb-1 font-medium text-[15px]">
                Izoh (ixtiyoriy)
              </span>
              <Form.Item<FieldType> name="description">
                <Input.TextArea
                  className="h-17!"
                  autoSize={false}
                  placeholder="Izoh"
                />
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default memo(TsexesPage);

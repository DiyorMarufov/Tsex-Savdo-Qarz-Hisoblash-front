import { memo, useRef, useState } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import SmallTitle from "../../../shared/ui/Title/SmallTitle/SmallTitle";
import { Button as AntdButton } from "antd";
import Button from "../../../shared/ui/Button/Button";
import { Plus } from "lucide-react";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import { DatePicker } from "antd/lib";
import ProTable from "@ant-design/pro-table";
import { fakeTsexData, tsexColumns } from "./model/tsexes-model";
import { Form, Input, Modal, Select, type FormProps } from "antd";
import {
  fakeTsexTransactionsData,
  tsexTransactionsColumns,
} from "./model/tsexes-transactions-model";

type FieldType = {
  tsex_id: string;
  type: "partial_payment" | "payment" | "avans";
  amount: number;
  description?: string;
};

const TsexesPage = () => {
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const tsexId = useRef<string | null>(null);
  const [form] = Form.useForm();

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
    tsexId.current = id;
    setOpenDetail(true);
  };

  const handleCancelDetail = () => {
    setOpenDetail(false);
  };
  // HanleOpenDetail ends
  return (
    <div>
      <div className="flex items-center justify-between gap-3 max-[500px]:flex-wrap">
        <div>
          <LargeTitle title="Tsexlar" />
          <SmallTitle title="Barcha tsexlarning moliyaviy balanslarini kuzatish va boshqarish" />
        </div>
        <div className="max-[500px]:w-full">
          <Button className="flex gap-2 max-[500px]:w-full" onClick={showModal}>
            <Plus /> Yangi operatsiya
          </Button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-5 max-[1250px]:grid-cols-2 max-[500px]:grid-cols-1">
        <div className="border border-bg-fy bg-[#ffffff] rounded-2xl p-7 flex flex-col gap-1 max-[500px]:items-center">
          <span className="text-[22px] font-medium text-bg-py max-[900px]:text-[20px] max-[500px]:text-[17px]">
            Jami haqdorlik
          </span>
          <span className="font-bold text-[30px] text-green-600 max-[900px]:text-[25px] max-[500px]:text-[22px]">
            15,200,000 usz
          </span>
        </div>
        <div className="border border-bg-fy bg-[#ffffff] rounded-2xl p-7 flex flex-col gap-1 max-[500px]:items-center">
          <span className="text-[22px] font-medium text-bg-py max-[900px]:text-[20px] max-[500px]:text-[17px]">
            Jami qarzdorlik
          </span>
          <span className="font-bold text-[30px] text-red-600 max-[900px]:text-[25px] max-[500px]:text-[22px]">
            15,200,000 usz
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
            +15,200,000 usz
          </span>
        </div>
      </div>

      <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] mt-6 p-[17px] flex items-center gap-5 max-[960px]:flex-wrap">
        <SearchInput
          placeholder="Tsex nomi yoki operatsiya bo'yicha qidirish"
          className="h-12! bg-bg-ty! text-[17px]!"
        />
        <DatePicker className="h-12! bg-bg-ty! text-[17px]! w-[300px] max-[960px]:w-full!" />
      </div>

      <div className="mt-4">
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
              <Form.Item<FieldType> name="amount">
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

      <Modal
        centered
        title="Moliya tarixi"
        closable={{ "aria-label": "Custom Close Button" }}
        open={openDetail}
        onCancel={handleCancelDetail}
        footer={
          <div className="flex gap-2 justify-end">
            <AntdButton
              className="bg-red-500! text-white!"
              onClick={handleCancelDetail}
            >
              Bekor qilish
            </AntdButton>
          </div>
        }
      >
        <ProTable
          dataSource={fakeTsexTransactionsData}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            responsive: false,
          }}
          columns={tsexTransactionsColumns}
          search={false}
          dateFormatter="string"
          scroll={{ x: "max-content" }}
        />
      </Modal>
    </div>
  );
};

export default memo(TsexesPage);

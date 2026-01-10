import {
  Modal,
  Form,
  Select,
  Input,
  Button as AntdButton,
  type FormInstance,
} from "antd";
import { memo } from "react";
import type { Option } from "../../../../shared/lib/types";

interface TsexTransactionModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
  form: FormInstance;
  tsexesOptions: Option[];
  pending: boolean;
  setIsTsexOpen: (open: boolean) => void;
  loading: boolean;
}

const TsexTransactionModal = ({
  isOpen,
  onCancel,
  onFinish,
  form,
  tsexesOptions,
  pending,
  setIsTsexOpen,
  loading,
}: TsexTransactionModalProps) => {
  const paymentOptions = [
    { value: "payment", label: "to'liq to'lov" },
    { value: "partial_payment", label: "qisman to'lov" },
    { value: "avans", label: "qo'shimcha to'lov" },
  ];

  return (
    <Modal
      centered
      title="To'lov qilish"
      open={isOpen}
      onCancel={onCancel}
      footer={
        <div className="flex gap-2 justify-end">
          <AntdButton className="bg-red-500! text-white!" onClick={onCancel}>
            Bekor qilish
          </AntdButton>
          <AntdButton
            onClick={() => form.submit()}
            className="bg-green-500! text-white!"
            loading={pending}
            disabled={pending}
          >
            Tasdiqlash
          </AntdButton>
        </div>
      }
    >
      <div className="mt-6">
        <Form onFinish={onFinish} form={form}>
          <div>
            <span className="flex mb-1 font-medium text-[15px]">Tsex</span>
            <Form.Item
              name="tsex_id"
              rules={[{ required: true, message: "Tsex tanlanishi shart!" }]}
            >
              <Select
                className="h-10!"
                options={tsexesOptions}
                placeholder="Tsexni tanlang"
                onDropdownVisibleChange={(visible) => {
                  if (visible) setIsTsexOpen(true);
                }}
                loading={loading}
                allowClear
              />
            </Form.Item>
          </div>

          <div>
            <span className="flex mb-1 font-medium text-[15px]">
              To'lov turi
            </span>
            <Form.Item
              name="type"
              rules={[{ required: true, message: "To'lov turi shart!" }]}
            >
              <Select
                className="h-10!"
                options={paymentOptions}
                placeholder="To'lov turini tanlang"
                allowClear
              />
            </Form.Item>
          </div>

          <div>
            <span className="flex mb-1 font-medium text-[15px]">Summa</span>
            <Form.Item
              name="amount"
              rules={[
                { required: true, message: "Summa kiritilishi shart!" },
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.resolve();
                    }

                    const numericValue = Number(
                      String(value).replace(/,/g, "")
                    );

                    if (numericValue > 0) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error("Summa 0 dan baland bo'lishi kerak!")
                    );
                  },
                },
              ]}
              normalize={(v) =>
                v
                  ? String(v)
                      .replace(/[^\d]/g, "")
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : v
              }
            >
              <Input className="h-10!" placeholder="0,00 UZS" />
            </Form.Item>
          </div>

          <div>
            <span className="flex mb-1 font-medium text-[15px]">
              Izoh (ixtiyoriy)
            </span>
            <Form.Item name="description">
              <Input.TextArea
                className="h-17!"
                autoSize={false}
                placeholder="Izoh yozing"
                allowClear
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default memo(TsexTransactionModal);

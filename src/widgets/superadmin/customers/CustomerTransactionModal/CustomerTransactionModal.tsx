import { memo } from "react";
import {
  Modal,
  Form,
  Select,
  Input,
  DatePicker,
  Button as AntdButton,
  type FormInstance,
} from "antd";
import type { Option } from "../../../../shared/lib/types";

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
  form: FormInstance;
  type: "lend" | "borrow" | null;
  customerOptions?: Option[];
}

const CustomerTransactionModal = ({
  isOpen,
  onCancel,
  onFinish,
  form,
  type,
  customerOptions,
}: Props) => {
  return (
    <Modal
      centered
      title={type === "lend" ? "Qarz berish" : "Qarz olish"}
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
          >
            Tasdiqlash
          </AntdButton>
        </div>
      }
    >
      <div className="mt-6">
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            label="Mijoz"
            name="customer_id"
            rules={[{ required: true, message: "Mijoz tanlanishi shart!" }]}
          >
            <Select
              className="h-10!"
              options={customerOptions}
              placeholder="Mijozni tanlang"
            />
          </Form.Item>

          <Form.Item
            label="To'lov summasi"
            name="amount"
            rules={[
              { required: true, message: "To'lov summasi kiritilishi shart!" },
            ]}
          >
            <Input className="h-10!" placeholder="0.00 UZS" />
          </Form.Item>

          <Form.Item label="Qaytarish muddati (ixtiyoriy)" name="due_date">
            <DatePicker
              className="h-10! w-full"
              placeholder="YYYY-MM-DD"
              inputReadOnly={true}
            />
          </Form.Item>

          <Form.Item label="Izoh (ixtiyoriy)" name="description">
            <Input.TextArea
              className="h-17!"
              autoSize={false}
              placeholder="Izoh"
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default memo(CustomerTransactionModal);

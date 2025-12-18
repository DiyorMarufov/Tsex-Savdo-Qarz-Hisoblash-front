import {
  Modal,
  Form,
  Select,
  Input,
  Button as AntdButton,
  type FormInstance,
} from "antd";
import type { Option } from "../../../../shared/lib/types";

interface TsexTransactionModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
  form: FormInstance;
  tsexesOptions: Option[];
}

const TsexTransactionModal = ({
  isOpen,
  onCancel,
  onFinish,
  form,
  tsexesOptions,
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
          >
            Tasdiqlash
          </AntdButton>
        </div>
      }
    >
      <div className="mt-6">
        <Form onFinish={onFinish} form={form} layout="vertical">
          <Form.Item name="tsex_id" label="Tsex" rules={[{ required: true }]}>
            <Select className="h-10!" options={tsexesOptions} />
          </Form.Item>
          <Form.Item
            name="type"
            label="To'lov turi"
            rules={[{ required: true }]}
          >
            <Select className="h-10!" options={paymentOptions} />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Summa"
            rules={[{ required: true }]}
            normalize={(v) =>
              v ? Number(v.replace(/[^\d]/g, "")).toLocaleString() : v
            }
          >
            <Input className="h-10!" placeholder="0.00" />
          </Form.Item>
          <Form.Item name="description" label="Izoh (ixtiyoriy)">
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

export default TsexTransactionModal;

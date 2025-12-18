import { memo } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button as AntdButton,
  type FormInstance,
} from "antd";
import type { Option } from "../../../../shared/lib/types";

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
  form: FormInstance;
  regionOptions?: Option[];
}

const AddCustomerModal = ({
  isOpen,
  onCancel,
  onFinish,
  form,
  regionOptions,
}: Props) => {
  return (
    <Modal
      centered
      title="Yangi mijoz qo'shish"
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
            label="To'liq ismi"
            name="full_name"
            rules={[
              { required: true, message: "To'liq ism kiritilishi shart!" },
            ]}
          >
            <Input className="h-10!" placeholder="To'liq ism" />
          </Form.Item>

          <Form.Item
            label="Tel raqami"
            name="phone_number"
            rules={[
              { required: true, message: "Tel raqam kiritilishi shart!" },
            ]}
          >
            <Input className="h-10!" placeholder="+998" />
          </Form.Item>

          <Form.Item
            label="Viloyat/Shahar"
            name="region"
            rules={[
              {
                required: true,
                message: "Viloyat yoki shahar tanlanishi shart!",
              },
            ]}
          >
            <Select
              className="h-10! w-full"
              placeholder="Viloyat/Shahar tanlash"
              options={regionOptions}
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default memo(AddCustomerModal);

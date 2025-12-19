import {
  Modal,
  Form,
  Input,
  Select,
  Button as AntdButton,
  type FormProps,
  type FormInstance,
} from "antd";
import { memo, useEffect } from "react";
import { customerRegions } from "../../../../shared/lib/constants";
import type { newCustomerFieldType } from "../../../../shared/lib/types";

interface AddCustomerModalProps {
  open: boolean;
  onCancel: () => void;
  onFinish: FormProps<newCustomerFieldType>["onFinish"];
  form: FormInstance;
}

const AddCustomerModal = ({
  open,
  onCancel,
  onFinish,
  form,
}: AddCustomerModalProps) => {
  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  return (
    <Modal
      centered
      title="Yangi mijoz qo'shish"
      open={open}
      onCancel={onCancel}
      destroyOnHidden
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
        <Form name="newCustomerForm" onFinish={onFinish} form={form}>
          <div>
            <span className="flex mb-1 font-medium text-[15px]">
              To'liq ismi
            </span>
            <Form.Item<newCustomerFieldType>
              name="full_name"
              rules={[
                { required: true, message: "To'liq ism kiritilishi shart!" },
              ]}
            >
              <Input className="h-10!" placeholder="To'liq ism" />
            </Form.Item>
          </div>

          <div>
            <span className="flex mb-1 font-medium text-[15px]">
              Tel raqami
            </span>
            <Form.Item<newCustomerFieldType>
              name="phone_number"
              rules={[
                { required: true, message: "Tel raqam kiritilishi shart!" },
              ]}
            >
              <Input className="h-10!" placeholder="+998" />
            </Form.Item>
          </div>

          <div>
            <span className="flex mb-1 font-medium text-[15px]">
              Viloyat/Shahar
            </span>
            <Form.Item<newCustomerFieldType>
              name="region"
              rules={[{ required: true, message: "Viloyat tanlanishi shart!" }]}
            >
              <Select
                className="h-10! w-full"
                placeholder="Viloyat/Shahar tanlash"
                options={customerRegions}
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default memo(AddCustomerModal);

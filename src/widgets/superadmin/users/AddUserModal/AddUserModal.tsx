import { Modal, Form, Input, Select, Button as AntdButton } from "antd";
import { memo } from "react";
import { roleUserCreationOptions } from "../../../../shared/lib/constants";

interface UserFormModalProps {
  open: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
  form: any;
  loading: boolean;
}

const AddUserModal = ({
  open,
  onCancel,
  onFinish,
  form,
  loading,
}: UserFormModalProps) => {
  return (
    <Modal
      centered
      title="Foydalanuvchi yaratish"
      closable={{ "aria-label": "Custom Close Button" }}
      open={open}
      onCancel={onCancel}
      footer={
        <div className="flex gap-2 justify-end">
          <AntdButton className="bg-red-500! text-white!" onClick={onCancel}>
            Bekor qilish
          </AntdButton>
          <AntdButton
            disabled={loading}
            loading={loading}
            onClick={() => form.submit()}
            className="bg-green-500! text-white!"
          >
            Tasdiqlash
          </AntdButton>
        </div>
      }
    >
      <div className="mt-6">
        <Form
          name="basic"
          onFinish={onFinish}
          form={form}
          initialValues={{ phone_number: "+998 " }}
        >
          <div>
            <span className="flex mb-1 font-medium text-[15px]">
              To'liq ismi
            </span>
            <Form.Item
              name="full_name"
              rules={[
                {
                  required: true,
                  message: "To'liq ism kiritish shart!",
                },
              ]}
            >
              <Input className="h-10!" placeholder="To'liq ism" allowClear/>
            </Form.Item>
          </div>

          <div>
            <span className="flex mb-1 font-medium text-[15px]">
              Tel raqami
            </span>
            <Form.Item
              name="phone_number"
              rules={[
                {
                  required: true,
                  message: "Tel raqami kiritilishi shart !",
                },
              ]}
            >
              <Input
                className="h-10!"
                placeholder="+998"
                maxLength={17}
                onChange={(e) => {
                  if (!e.target.value.startsWith("+998")) {
                    e.target.value =
                      "+998" + e.target.value.replace(/\D/g, "").slice(0, 9);
                  }

                  const numbers = e.target.value.replace(/\D/g, "").slice(3);
                  let formatted = "+998";

                  if (numbers.length > 0)
                    formatted += " " + numbers.slice(0, 2);
                  if (numbers.length > 2)
                    formatted += " " + numbers.slice(2, 5);
                  if (numbers.length > 5)
                    formatted += " " + numbers.slice(5, 7);
                  if (numbers.length > 7)
                    formatted += " " + numbers.slice(7, 9);

                  form.setFieldsValue({ phone_number: formatted });
                }}
                allowClear
              />
            </Form.Item>
          </div>

          <div>
            <span className="flex mb-1 font-medium text-[15px]">Parol</span>
            <Form.Item
              name="password"
              className="w-full!"
              rules={[
                {
                  required: true,
                  message: "Parol kiritilishi shart!",
                },
              ]}
            >
              <Input.Password className="h-10!" placeholder="****" allowClear/>
            </Form.Item>
          </div>

          <div>
            <span className="flex mb-1 font-medium text-[15px]">Rol</span>
            <Form.Item
              name="role"
              rules={[
                {
                  required: true,
                  message: "Rol tanlanishi shart!",
                },
              ]}
            >
              <Select
                className="h-10!"
                options={roleUserCreationOptions}
                placeholder="Rol tanlang"
                allowClear
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default memo(AddUserModal);

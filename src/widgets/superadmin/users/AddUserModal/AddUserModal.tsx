import { Modal, Form, Input, Select, Button as AntdButton } from "antd";
import { memo } from "react";

interface UserFormModalProps {
  open: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
  form: any;
  loading?: boolean;
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
        <Form name="basic" onFinish={onFinish} form={form}>
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
              <Input className="h-10!" />
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
              <Input className="h-10!" />
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
              <Input.Password className="h-10!" placeholder="****" />
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
              <Select className="h-10!" />
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default memo(AddUserModal);

import React from "react";
import {
  Modal,
  Button as AntdButton,
  Form,
  Input,
  type FormInstance,
} from "antd";
import type {
  CustomerTransactionDetailDataType,
  CustomerTransactionDetailType,
} from "../../../../shared/lib/types";

interface AddTransactionModalProps {
  open: boolean;
  onCancel: () => void;
  onFinish: (values: CustomerTransactionDetailDataType) => void;
  form: FormInstance;
  type: CustomerTransactionDetailType;
  loading: boolean;
}

const CustomerTransactionDetailModal: React.FC<AddTransactionModalProps> = ({
  open,
  onCancel,
  onFinish,
  form,
  type,
  loading,
}) => {
  const getModalContent = () => {
    switch (type) {
      case "lend-more":
        return { title: "Ko'proq qarz berish", label: "To'lov summasi" };
      case "receive":
        return {
          title: "Qabul qilish",
          label: "Qabul qilingan summa",
        };
      case "borrow-more":
        return { title: "Ko'proq qarz olish", label: "Olingan summa" };
      case "repayment":
        return { title: "To'lash", label: "To'lanayotgan summa" };
      default:
        return { title: "Tranzaksiya", label: "To'lov summasi" };
    }
  };

  const { title, label } = getModalContent();

  return (
    <Modal
      centered
      title={title}
      closable={{ "aria-label": "Custom Close Button" }}
      open={open}
      onCancel={onCancel}
      footer={
        <div className="flex gap-2 justify-end">
          <AntdButton className="bg-red-500! text-white!" onClick={onCancel}>
            Bekor qilish
          </AntdButton>
          <AntdButton
            onClick={() => form.submit()}
            className="bg-green-500! text-white!"
            disabled={loading}
            loading={loading}
          >
            Tasdiqlash
          </AntdButton>
        </div>
      }
    >
      <div className="mt-6">
        <Form
          form={form}
          name="basic"
          onFinish={(values) => {
            onFinish(values);
            form.resetFields();
          }}
        >
          <div>
            <span className="flex mb-1 font-medium text-[15px]">{label}</span>
            <Form.Item<CustomerTransactionDetailDataType>
              name="amount"
              rules={[
                {
                  required: true,
                  message: "To'lov summasi kiritilishi shart!",
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
            <Form.Item<CustomerTransactionDetailDataType> name="description">
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
  );
};

export default CustomerTransactionDetailModal;

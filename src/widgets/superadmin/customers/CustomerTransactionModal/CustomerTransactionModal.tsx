import {
  Modal,
  Form,
  Select,
  Input,
  DatePicker,
  Button as AntdButton,
  type FormProps,
  type FormInstance,
} from "antd";
import { memo } from "react";
import type {
  Option,
  TransactionFieldType,
} from "../../../../shared/lib/types";

interface TransactionModalProps {
  open: boolean;
  onCancel: () => void;
  type: "lend" | "borrow" | null;
  onFinish: FormProps<TransactionFieldType>["onFinish"];
  customers: Option[];
  form: FormInstance;
  loading: boolean;
  setIsCustomerOpen: (open: boolean) => void;
  customerloading: boolean;
}

const CustomerTransactionModal = ({
  open,
  onCancel,
  type,
  onFinish,
  customers,
  form,
  loading,
  setIsCustomerOpen,
  customerloading,
}: TransactionModalProps) => {
  return (
    <Modal
      centered
      title={type === "lend" ? "Qarz berish" : "Qarz olish"}
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
            disabled={loading}
            loading={loading}
          >
            Tasdiqlash
          </AntdButton>
        </div>
      }
    >
      <div className="mt-6">
        <Form name="transactionForm" onFinish={onFinish} form={form}>
          <div>
            <span className="flex mb-1 font-medium text-[15px]">Mijoz</span>
            <Form.Item<TransactionFieldType>
              name="customer_id"
              rules={[{ required: true, message: "Mijoz tanlanishi shart!" }]}
            >
              <Select
                className="h-10!"
                options={customers}
                placeholder="Mijozni tanlang"
                onDropdownVisibleChange={(visible) => {
                  if (visible) setIsCustomerOpen(visible);
                }}
                loading={customerloading}
              />
            </Form.Item>
          </div>

          <div>
            <span className="flex mb-1 font-medium text-[15px]">
              To'lov summasi
            </span>
            <Form.Item
              name="amount"
              rules={[
                {
                  required: true,
                  message: "To'lov summasi kiritilishi shart!",
                },
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
                      new Error("To'lov summasi 0 dan baland bo'lishi kerak!")
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
              Qaytarish muddati (ixtiyoriy)
            </span>
            <Form.Item<TransactionFieldType> name="due_date">
              <DatePicker
                className="h-10! w-full"
                placeholder="YYYY-MM-DD"
                inputReadOnly
              />
            </Form.Item>
          </div>

          <div>
            <span className="flex mb-1 font-medium text-[15px]">
              Izoh (ixtiyoriy)
            </span>
            <Form.Item<TransactionFieldType> name="description">
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

export default memo(CustomerTransactionModal);

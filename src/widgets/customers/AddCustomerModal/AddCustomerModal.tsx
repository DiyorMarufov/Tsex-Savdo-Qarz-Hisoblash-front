import {
  Modal,
  Form,
  Input,
  Select,
  Button as AntdButton,
  type FormProps,
  type FormInstance,
} from "antd";
import { memo } from "react";
import type { NewCustomerFieldType } from "../../../shared/lib/types";
import { customerRegions } from "../../../shared/lib/constants";

interface AddCustomerModalProps {
  open: boolean;
  onCancel: () => void;
  onFinish: FormProps<NewCustomerFieldType>["onFinish"];
  form: FormInstance;
  loading: boolean;
}

const AddCustomerModal = ({
  open,
  onCancel,
  onFinish,
  form,
  loading,
}: AddCustomerModalProps) => {
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
          name="newCustomerForm"
          onFinish={onFinish}
          form={form}
          initialValues={{
            phone_number: "+998 ",
          }}
        >
          <div>
            <span className="flex mb-1 font-medium text-[15px]">
              To'liq ismi
            </span>
            <Form.Item<NewCustomerFieldType>
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
            <Form.Item<NewCustomerFieldType>
              name="phone_number"
              rules={[
                { required: true, message: "Tel raqam kiritilishi shart!" },
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
              />
            </Form.Item>
          </div>

          <div>
            <span className="flex mb-1 font-medium text-[15px]">
              Viloyat/Shahar
            </span>
            <Form.Item<NewCustomerFieldType>
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

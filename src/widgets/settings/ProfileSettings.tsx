import { Button, Form, Input, type FormProps } from "antd";
import { memo, useState } from "react";
import { useUser } from "../../features/auth/api/useAuth/useUser";
import { formatPhoneNumber } from "../../shared/lib/functions/formatPhoneNumber";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { jwtDecode } from "jwt-decode";
import { useApiNotification } from "../../shared/hooks/api-notification/useApiNotification";

type FieldType = {
  full_name: string;
  phone_number: string;
};

const ProfileSettings = () => {
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const [form] = Form.useForm();

  const { getUser, updateUser } = useUser();
  const { handleApiError, handleSuccess } = useApiNotification();
  const { data: userData } = getUser();
  const data = userData?.data;

  const token = useSelector((state: RootState) => state.setToken.token);
  const { id } = jwtDecode<{ id: string }>(token as string);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (isDisable === false) {
      setIsDisable(true);
    } else {
      const { full_name, phone_number } = values;
      const data = {
        full_name: full_name,
        phone_number: phone_number.split(" ").join(""),
      };
      updateUser.mutate(
        { data, id },
        {
          onSuccess: () => {
            setIsDisable(false);
            handleSuccess("Muvaffaqiyatli yangilandi");
          },
          onError: (err: any) => {
            const status = err?.response?.data?.statusCode;
            const msg = err?.response?.data?.message;

            if (status === 404 && msg.startsWith("User with ID")) {
              handleApiError("Foydalanuvchi topilmadi");
              return;
            } else {
              handleApiError("Serverda xato");
              return;
            }
          },
        }
      );
    }
  };
  return (
    <div className="bg-white rounded-xl border border-bg-fy overflow-hidden">
      <div className="px-3.5 pt-3 border-b border-gray-50">
        <h3 className="font-bold text-gray-800">Profil sozlamalari</h3>
      </div>
      <div className="p-3.5 pb-3.5 flex flex-col space-y-6">
        <Form
          onFinish={onFinish}
          initialValues={{
            full_name: data?.full_name,
            phone_number: formatPhoneNumber(data?.phone_number),
          }}
          form={form}
        >
          <div className="grid grid-cols-2 gap-4 max-[400px]:grid-cols-1">
            <div>
              <span className="text-sm font-semibold text-gray-700 flex mb-1">
                To'liq ism
              </span>
              <Form.Item name="full_name">
                <Input className="h-10!" disabled={isDisable ? false : true} />
              </Form.Item>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-700 flex mb-1">
                Telefon raqami
              </span>
              <Form.Item name="phone_number">
                <Input
                  className="h-10!"
                  disabled={isDisable ? false : true}
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
            <div className="col-span-2 flex justify-end">
              <Button className="h-9!" type="primary" htmlType="submit">
                {isDisable ? "Tasdiqlash" : "Yangilash"}
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default memo(ProfileSettings);

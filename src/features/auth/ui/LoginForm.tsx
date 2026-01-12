import { Button, Form, Input, type FormProps } from "antd";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUser } from "../api/useAuth/useUser";
import { useApiNotification } from "../../../shared/hooks/api-notification/useApiNotification";
import { jwtDecode } from "jwt-decode";
import { setToken } from "../model/authModel";

type FieldType = {
  phone_number: string;
  password: string;
};

const { Item } = Form;

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { handleApiError } = useApiNotification();
  const { signIn } = useUser();
  const onFinish: FormProps<FieldType>["onFinish"] = (values: FieldType) => {
    const data: FieldType = {
      phone_number: values.phone_number.split(" ").join(""),
      password: values.password,
    };
    signIn.mutate(data, {
      onSuccess: (res: any) => {
        const accessToken = res?.data?.accessToken;
        const decoded: any = jwtDecode(accessToken);
        const role = decoded?.role;

        if (role !== "superadmin" && role !== "admin") {
          handleApiError("Platformaga kirish huquqiga ega emassiz", "top");
          return;
        }
        dispatch(setToken(accessToken));
        navigate(`/${role}`);
      },
      onError: (err: any) => {
        const message = Array.isArray(err?.response?.data?.message)
          ? err?.response?.data?.message[0]
          : err?.response?.data?.message;

        switch (message) {
          case "Invalid credentials":
            handleApiError("Raqam yoki parol noto'g'ri", "top");
            break;

          case "phone_number must be a valid phone number":
            handleApiError("Telefon raqam noto'g'ri", "top");
            break;

          case "You have been blocked by superadmin":
            handleApiError("Siz bloklangansiz", "top");
            break;

          default:
            handleApiError("Serverda nosozlik", "top");
            break;
        }
      },
    });
  };
  return (
    <div className="h-screen flex justify-center items-center bg-bg-ty px-3">
      <div className="h-[606px] w-[450px] flex flex-col gap-8">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[32px] font-bold text-[#2D3748]">
            Xush kelibsiz!
          </span>
          <span className="text-bg-sy font-medium text-[18px]">
            Davom etish uchun tizimga kiring
          </span>
        </div>
        <div className="h-[366px] pt-11 px-6 rounded-2xl shadow-sm bg-white">
          <Form
            onFinish={onFinish}
            form={form}
            initialValues={{ phone_number: "+998 " }}
          >
            <span className="flex mb-1 text-[16px] text-bg-sy">
              Telefon raqami
            </span>
            <Item<FieldType>
              name="phone_number"
              rules={[
                { required: true, message: "Telefon raqam kiritilishi shart" },
              ]}
            >
              <Input
                className="h-10! placeholder:text-bg-sy! placeholder:text-[17px]! text-[17px]! bg-bg-ty!"
                placeholder="+998 90 123 45 67"
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
            </Item>

            <span className="flex mb-1 text-[16px] text-bg-sy">Parol</span>
            <Item<FieldType>
              name="password"
              rules={[{ required: true, message: "Parol kiritilishi shart" }]}
            >
              <Input.Password
                className="h-10! placeholder:text-bg-sy! placeholder:text-[20px]! bg-bg-ty!"
                placeholder=""
                allowClear
              />
            </Item>

            <Item>
              <Button
                type="primary"
                htmlType="submit"
                className="h-10! w-full bg-[#3498DB]! text-white! rounded-[12px]! mt-5 text-[17px]!"
                loading={signIn.isPending}
                disabled={signIn.isPending}
              >
                Kirish
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default memo(LoginForm);

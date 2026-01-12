import { Button, Form, Input, type FormProps } from "antd";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUser } from "../api/useAuth/useUser";
import { useApiNotification } from "../../../shared/hooks/api-notification/useApiNotification";
import { jwtDecode } from "jwt-decode";
import { setToken } from "../model/authModel";
import { LockOutlined, PhoneOutlined } from "@ant-design/icons";

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
    <div className="min-h-screen flex items-center justify-center px-4 bg-bg-ty">
      <div className="w-full max-w-[450px] animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Xush kelibsiz!
          </h1>
          <p className="text-slate-500 text-lg font-medium">
            Davom etish uchun tizimga kiring
          </p>
        </div>

        <div className="h-[310px] bg-[#ffffff] p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-bg-fy">
          <Form
            onFinish={onFinish}
            form={form}
            layout="vertical"
            initialValues={{ phone_number: "+998 " }}
            requiredMark={false}
          >
            <Item<FieldType>
              label={
                <span className="text-slate-600 font-semibold ml-1">
                  Telefon raqami
                </span>
              }
              name="phone_number"
              rules={[{ required: true, message: "Raqamni kiriting" }]}
              className="mb-6"
            >
              <Input
                prefix={<PhoneOutlined className="text-slate-400 mr-2" />}
                className="h-10!"
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
              />
            </Item>

            <Item<FieldType>
              label={
                <span className="text-slate-600 font-semibold ml-1">Parol</span>
              }
              name="password"
              rules={[{ required: true, message: "Parolni kiriting" }]}
              className="mb-8"
            >
              <Input.Password
                prefix={<LockOutlined className="text-slate-400 mr-2" />}
                className="h-10!"
                placeholder="••••••••"
              />
            </Item>

            <div className="pt-3">
              <Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={signIn.isPending}
                  disabled={signIn.isPending}
                  className="w-full h-9! border-none! rounded-2xl! text-[15px]! font-bold! transition-all! active:scale-[0.98]!"
                >
                  Kirish
                </Button>
              </Item>
            </div>
          </Form>
        </div>

        <p className="text-center mt-8 text-slate-400 text-sm">
          &copy; 2026 Tsex Savdo. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </div>
  );
};

export default memo(LoginForm);

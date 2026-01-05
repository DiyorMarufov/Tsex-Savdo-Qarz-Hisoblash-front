import { memo } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import { Button } from "antd";
import { Save } from "lucide-react";
import ClientInfoForm from "../../../features/sales/components/ClientInfoForm";
import SaleItemsManager from "../../../features/sales/components/SaleItemsManager";
import PaymentAndSummary from "../../../features/sales/components/PaymentAndSummary";
import { useNavigate } from "react-router-dom";

const AdminAddSalePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between gap-3">
        <LargeTitle title="Yangi sotuv" />

        <div className="flex items-center gap-3 max-[500px]:hidden">
          <Button
            className="h-10! bg-red-500! text-white!"
            onClick={() => navigate(-1)}
          >
            Bekor qilish
          </Button>
          <Button className="h-10!" type="primary" htmlType="submit">
            <Save />
            Saqlash
          </Button>
        </div>
      </div>

      <div className="flex items-start gap-8 mt-2 max-[1750px]:flex-col">
        <div className="flex flex-col gap-5 w-[1200px] max-[1750px]:w-full">
          <ClientInfoForm />
          <SaleItemsManager />
        </div>
        <PaymentAndSummary />
      </div>

      <div className="flex items-center gap-3 min-[500px]:hidden max-[500px]:mt-3 max-[380px]:flex-col-reverse">
        <Button
          className="max-[500px]:w-full h-10! bg-red-500! text-white!"
          onClick={() => navigate(-1)}
        >
          Bekor qilish
        </Button>
        <Button
          className="max-[500px]:w-full h-10!"
          type="primary"
          htmlType="submit"
        >
          <Save />
          Saqlash
        </Button>
      </div>
    </div>
  );
};

export default memo(AdminAddSalePage);

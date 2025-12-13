import { memo } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import { Button as AntdButton } from "antd";
import { Save } from "lucide-react";
import Button from "../../../shared/ui/Button/Button";
import ClientInfoForm from "../../../features/sales/components/ClientInfoForm";
import SaleItemsManager from "../../../features/sales/components/SaleItemsManager";
import PaymentAndSummary from "../../../features/sales/components/PaymentAndSummary";

const AdminAddSalePage = () => {
  return (
    <div>
      <div className="flex justify-between gap-3">
        <LargeTitle title="Yangi sotuv" />

        <div className="flex items-center gap-3 max-[500px]:hidden">
          <AntdButton>Bekor qilish</AntdButton>
          <Button>
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

      <div className="flex items-center gap-3 min-[500px]:hidden max-[500px]:flex-col max-[500px]:mt-3">
        <Button className="max-[500px]:w-full">
          <Save />
          Saqlash
        </Button>
        <AntdButton className="max-[500px]:w-full max-[500px]:h-10!">
          Bekor qilish
        </AntdButton>
      </div>
    </div>
  );
};

export default memo(AdminAddSalePage);

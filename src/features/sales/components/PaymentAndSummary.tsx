import { InputNumber, type UploadProps } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { Inbox } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { useParamsHook } from "../../../shared/hooks/params/useParams";

const PaymentAndSummary = () => {
  const [fileList, setFileList] = useState<any>(null);
  const { getParam } = useParamsHook();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [paidAmount, setPaidAmount] = useState<any>(
    Number(localStorage.getItem("paid_amount")) || 0,
  );

  const pRef = getParam("p_ref") || "";
  const props: UploadProps = {
    name: "image",
    multiple: false,
    capture: false,
    beforeUpload: (file) => {
      handleFileUpload(file);
      return false;
    },
    fileList,
    onChange(info) {
      setFileList(info.fileList);
    },
    onRemove: (file) => handleFileRemove(file),
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  useEffect(() => {
    const saleItems = JSON.parse(localStorage.getItem("sale_items") || "[]");
    const selectedVariants = saleItems?.flatMap((selectedItem: any) =>
      selectedItem?.selected_variants ? selectedItem?.selected_variants : [],
    );
    const total = selectedVariants
      ? selectedVariants?.reduce((acc: any, item: any) => {
          const quantity = item?.quantity;
          const price = item?.price;
          const unit_in_package = item?.unit_in_package;
          return acc + quantity * price * unit_in_package;
        }, 0)
      : 0;
    setTotalAmount(total);
  }, [pRef]);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Str = reader.result as string;
      const existingImgs = localStorage.getItem("images");
      const imgsArr = existingImgs ? JSON.parse(existingImgs) : [];

      imgsArr.push(base64Str);
      localStorage.setItem("images", JSON.stringify(imgsArr));
    };
    reader.readAsDataURL(file);
    return false;
  };

  const handleFileRemove = (file: any) => {
    const index = fileList.indexOf(file);
    if (index > -1) {
      const imgs = JSON.parse(localStorage.getItem("images") || "[]");
      imgs.splice(index, 1);
      localStorage.setItem("images", JSON.stringify(imgs));
    }
  };

  const debt = paidAmount - totalAmount;

  return (
    <div className="w-full bg-[#ffffff] px-5 py-4 flex flex-col gap-5 border border-bg-fy rounded-[5px] overflow-hidden">
      <span className="text-[20px] font-medium text-[#232E2F]">To'lov</span>
      <div>
        <span className="text-[16px] max-[500px]:text-[15px] text-[#232E2F] flex mb-1">
          To'langan summa
        </span>
        <InputNumber
          value={paidAmount}
          className="h-10! w-full! flex! items-center!"
          placeholder="0,00 UZS"
          controls={false}
          stringMode={false}
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
          formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(v) => v!.replace(/[^\d]/g, "")}
          onChange={(val) => {
            if (val === null) {
              localStorage.removeItem("paid_amount");
              setPaidAmount(null);
            } else {
              const numVal = Number(val);
              localStorage.setItem("paid_amount", numVal.toString());
              setPaidAmount(numVal);
            }
          }}
        />
      </div>

      <div>
        <span className="text-[16px] max-[500px]:text-[15px] text-[#232E2F] flex mb-1">
          Mahsulot rasmi
        </span>
        <Dragger
          {...props}
          className="rounded-xl border-gray-300 bg-gray-50 hover:bg-gray-100 transition-al"
        >
          <p className="ant-upload-drag-icon flex justify-center">
            <Inbox className="w-10 h-10 text-blue-500" />
          </p>
          <p className="ant-upload-text text-gray-700 font-medium">
            Click or drag file to upload your store image
          </p>
          <p className="ant-upload-hint text-gray-500 text-sm">
            You can upload a single or multiple files. Avoid uploading
            restricted data.
          </p>
        </Dragger>
      </div>

      <div className="w-full h-px bg-bg-fy"></div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between gap-3">
          <span className="text-gray-700 text-[16px]">Umumiy summa</span>
          <span className="text-[17px]">
            {totalAmount.toLocaleString()} UZS
          </span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="text-gray-700 text-[16px]">To'langan summa</span>
          <span className="text-[17px]">
            {paidAmount ? paidAmount.toLocaleString() : paidAmount} UZS
          </span>
        </div>
        <div className="bg-[#FEF2F2] rounded-[5px]">
          <div className="flex justify-between p-3 text-red-600">
            <span className="text-[16px]">Qarz</span>
            <span className="text-[17px]">{debt.toLocaleString()} UZS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PaymentAndSummary);

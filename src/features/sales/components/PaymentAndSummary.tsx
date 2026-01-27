import {
  InputNumber,
  Upload,
  Image,
  type UploadFile,
  type UploadProps,
  type GetProp,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { memo, useEffect, useState } from "react";
import { useParamsHook } from "../../../shared/hooks/params/useParams";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const PaymentAndSummary = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const { getParam } = useParamsHook();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [paidAmount, setPaidAmount] = useState<any>(
    Number(localStorage.getItem("paid_amount")) || 0,
  );

  const pRef = getParam("p_ref") || "";

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const props: UploadProps = {
    name: "image",
    multiple: false,
    listType: "picture-card",
    fileList,
    onPreview: handlePreview,
    beforeUpload: (file) => {
      handleFileUpload(file);
      return false;
    },
    onChange({ fileList: newFileList }) {
      setFileList(newFileList);
    },
    onRemove: (file) => handleFileRemove(file),
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

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Yuklash</div>
    </button>
  );

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
          onChange={(val) => {
            const numVal = val === null ? null : Number(val);
            if (numVal === null) localStorage.removeItem("paid_amount");
            else localStorage.setItem("paid_amount", numVal.toString());
            setPaidAmount(numVal);
          }}
          formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(v) => v!.replace(/[^\d]/g, "")}
        />
      </div>

      <div>
        <span className="text-[16px] max-[500px]:text-[15px] text-[#232E2F] flex mb-1">
          Mahsulot rasmi
        </span>
        <Upload {...props}>{fileList.length >= 5 ? null : uploadButton}</Upload>

        {previewImage && (
          <Image
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
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
            {paidAmount ? paidAmount.toLocaleString() : 0} UZS
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

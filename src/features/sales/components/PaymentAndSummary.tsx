import { Form, Input, type UploadProps } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { Inbox } from "lucide-react";
import { memo, useState } from "react";

const PaymentAndSummary = () => {
  const [fileList, setFileList] = useState<any>(null);

  const props: UploadProps = {
    name: "image",
    multiple: false,
    capture: false,
    beforeUpload: () => false,
    fileList,
    onChange(info) {
      setFileList(info.fileList);
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <div className="w-full bg-[#ffffff] px-5 py-4 flex flex-col gap-5 border border-bg-fy rounded-[5px] overflow-hidden">
      <span className="text-[20px] font-medium text-[#232E2F]">To'lov</span>

      <Form>
        <div>
          <span className="text-[16px] max-[500px]:text-[15px] text-[#232E2F] flex mb-1">
            To'langan summa
          </span>
          <Form.Item>
            <Input className="h-10!" placeholder="0,00 UZS" />
          </Form.Item>
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
      </Form>

      <div className="w-full h-px bg-bg-fy"></div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between gap-3">
          <span className="text-[#519969] text-[16px]">Jami summa</span>
          <span className="text-[17px]">100,000,000 UZS</span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="text-[#519969] text-[16px]">To'langan summa</span>
          <span className="text-[17px]">270,000 UZS</span>
        </div>
        <div className="bg-[#FEF2F2] rounded-[5px]">
          <div className="flex justify-between p-3 text-red-600">
            <span className="text-[16px]">Qarz</span>
            <span className="text-[17px]">10,000 UZS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PaymentAndSummary);

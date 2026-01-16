import { Badge, Popover, List, Avatar, Button, Popconfirm } from "antd";
import {
  BellOutlined,
  CheckOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { memo, useState, type FC } from "react";
import { useWarning } from "../../../shared/lib/apis/warnings/useWarning";
import { useApiNotification } from "../../../shared/hooks/api-notification/useApiNotification";
import { useNavigate } from "react-router-dom";

interface Props {
  data: any[];
  closePopover?: () => void;
}

const NotificationContent: FC<Props> = ({ data, closePopover }) => {
  const navigate = useNavigate();
  const { updateStatus } = useWarning();
  const { handleApiError, handleSuccess } = useApiNotification();
  const handleConfirm = (id: string) => {
    updateStatus.mutate(id, {
      onSuccess: () => {
        handleSuccess("Muvaffaqiyatli tasdiqlandi");
      },
      onError: (err: any) => {
        const status = err?.response?.data?.statusCode;
        const msg = err?.response?.data?.message;

        if (status === 404 && msg.startsWith("Warning with ID")) {
          handleApiError("Ogohlantirish topilmadi");
          return;
        } else {
          handleApiError("Serverda xato");
          return;
        }
      },
    });
  };

  const handleViewAll = () => {
    closePopover?.();
    navigate("/admin/warnings");
  };
  return (
    <div className="w-[300px]">
      <div className="border-b pb-2 mb-2 px-2">
        <span className="font-bold text-slate-800">Bildirishnomalar</span>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={data}
        className="max-h-[200px] overflow-y-auto"
        renderItem={(item: any) => (
          <List.Item
            actions={[
              <Popconfirm
                title="Tasdiqlash"
                description="Rostdan tasdiqlamohchimisz?"
                okText="Ha"
                cancelText="Yo'q"
                onConfirm={() => handleConfirm(item?.id)}
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              >
                <Button
                  type="primary"
                  size="small"
                  className="rounded-full! py-3.5!"
                  loading={updateStatus.isPending}
                  disabled={updateStatus.isPending}
                >
                  <CheckOutlined className="text-white!" />
                </Button>
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  icon={<BellOutlined />}
                  className={
                    item.status === "OPEN"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-400"
                  }
                />
              }
              title={
                <span className="text-[13px] font-medium">
                  {item?.description}
                </span>
              }
              description={
                <span className="text-[11px] text-gray-400">
                  {new Date(item?.created_at).toLocaleString()}
                </span>
              }
            />
          </List.Item>
        )}
      />
      <div className="text-center pt-2 border-t mt-2">
        <Button type="text" block onClick={handleViewAll}>
          Barchasini ko'rish
        </Button>
      </div>
    </div>
  );
};

export const HeaderBell: FC<Props> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => setOpen(newOpen);

  const closePopover = () => setOpen(false);
  return (
    <Popover
      open={open}
      onOpenChange={handleOpenChange}
      content={<NotificationContent data={data} closePopover={closePopover} />}
      trigger="click"
      placement="bottomRight"
      arrow={false}
      overlayClassName="notification-popover"
    >
      <Badge count={data?.length} size="small" offset={[-2, 5]}>
        <Button
          type="text"
          icon={<BellOutlined className="text-[20px] text-gray-600" />}
          className="flex items-center justify-center h-10! w-10! rounded-full hover:bg-gray-100 transition-all"
        />
      </Badge>
    </Popover>
  );
};

export default memo(NotificationContent);

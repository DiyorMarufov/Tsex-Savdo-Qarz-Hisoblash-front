import { Badge, Popover, List, Avatar, Button } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { memo } from "react";

const NotificationContent = () => {
  const data = [
    {
      title: "Mahsulot qo'shish",
      description: "5 daqiqa oldin",
      type: "order",
    },
    {
      title: "Mahsulot qo'shish",
      description: "5 daqiqa oldin",
      type: "order",
    },
    {
      title: "Mahsulot qo'shish",
      description: "5 daqiqa oldin",
      type: "order",
    },
    {
      title: "Mahsulot qo'shish",
      description: "5 daqiqa oldin",
      type: "order",
    },
    {
      title: "Mahsulot qo'shish",
      description: "5 daqiqa oldin",
      type: "order",
    },
  ];

  return (
    <div className="w-[300px]">
      <div className="flex justify-between items-center border-b pb-2 mb-2 px-2">
        <span className="font-bold text-slate-800">Bildirishnomalar</span>
        <Button type="link" size="small" className="text-[12px]">
          Tozalash
        </Button>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={data}
        className="max-h-[200px] overflow-y-auto"
        renderItem={(item) => (
          <List.Item className="cursor-pointer hover:bg-blue-50/50 px-2 transition-all rounded-lg border-none">
            <List.Item.Meta
              avatar={
                <Avatar
                  icon={<BellOutlined />}
                  className="bg-blue-100 text-blue-600"
                />
              }
              title={
                <span className="text-[13px] font-medium">{item.title}</span>
              }
              description={
                <span className="text-[11px] text-gray-400">
                  {item.description}
                </span>
              }
            />
          </List.Item>
        )}
      />
      <div className="text-center pt-2 border-t mt-2">
        <Button type="text" block className="text-gray-500 text-[12px]">
          Barchasini ko'rish
        </Button>
      </div>
    </div>
  );
};

export const HeaderBell = () => (
  <Popover
    content={<NotificationContent />}
    trigger="click"
    placement="bottomRight"
    arrow={false}
    overlayClassName="notification-popover"
  >
    <Badge count={1} size="small" offset={[-2, 5]}>
      <Button
        type="text"
        icon={<BellOutlined className="text-[20px] text-gray-600" />}
        className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition-all"
      />
    </Badge>
  </Popover>
);

export default memo(NotificationContent);

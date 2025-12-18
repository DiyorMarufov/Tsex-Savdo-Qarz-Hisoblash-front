import { memo, useEffect } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import ProTable from "@ant-design/pro-table";
import { storesColumns } from "./model/shops-table-model";
import { useShop } from "../../../shared/lib/apis/shops/useShop";
import ShopsMobileList from "../../../widgets/superadmin/shops/ShopsMobileList/ShopsMobileList";

const StoresPage = () => {
  const { getAllShops } = useShop();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  // Shops start
  const { data: allShops, isLoading: shopsLoading } = getAllShops();
  const shops = allShops?.data;

  // Shops end
  return (
    <div>
      <div>
        <LargeTitle title="Do'konlar" />
      </div>

      <div className="mt-2 rounded-[12px] border border-e-bg-fy bg-[#ffffff] p-3.5">
        <SearchInput
          placeholder="Do'kon nomi yoki manzili bo'yicha qidirish"
          className="h-12! bg-bg-ty! text-[17px]!"
        />
      </div>

      <div className="max-[500px]:hidden mt-4">
        <ProTable
          dataSource={shops}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            responsive: false,
          }}
          columns={storesColumns}
          search={false}
          dateFormatter="string"
          headerTitle="Do'konlar"
          scroll={{ x: "max-content" }}
          loading={shopsLoading}
        />
      </div>

      <ShopsMobileList data={shops} isLoading={shopsLoading} />
    </div>
  );
};

export default memo(StoresPage);

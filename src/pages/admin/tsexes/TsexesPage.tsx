import { memo } from "react";
import LargeTitle from "../../../shared/ui/Title/LargeTItle/LargeTitle";
import SearchInput from "../../../shared/ui/SearchInput/SearchInput";
import ProTable from "@ant-design/pro-table";
import {
  fakeTsexData,
  tsexColumns,
  type TsexTableListItem,
} from "../../superadmin/tsexes/model/tsexes-model";
import { Button as AntdButton, Pagination } from "antd";
import { useNavigate } from "react-router-dom";

const AdminTsexesPage = () => {
  const navigate = useNavigate();

  // HandleOpenDetail starts
  const handleOpenDetail = (id: string) => {
    navigate(`transactions/${id}`);
  };
  // HanleOpenDetail ends
  return (
    <div>
      <div className="flex justify-between items-center w-full">
        <LargeTitle title="Tsexlar" />
      </div>

      <div className="rounded-[12px] border border-e-bg-fy bg-[#ffffff] mt-2 p-3.5 flex items-center gap-5 max-[960px]:flex-wrap">
        <SearchInput
          placeholder="Tsex nomi yoki operatsiya bo'yicha qidirish"
          className="h-12! bg-bg-ty! text-[17px]!"
        />
      </div>

      <div className="mt-4 max-[500px]:hidden">
        <ProTable
          dataSource={fakeTsexData}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            responsive: false,
          }}
          columns={tsexColumns(handleOpenDetail)}
          search={false}
          dateFormatter="string"
          scroll={{ x: "max-content" }}
        />
      </div>

      <div className="min-[500px]:hidden flex flex-col gap-5 mt-4">
        {fakeTsexData.map((ts: TsexTableListItem) => (
          <div
            key={ts.id}
            className="flex flex-col border border-bg-fy bg-[#ffffff] rounded-[12px]"
          >
            <div className="flex flex-col">
              <div className="grid grid-cols-2 gap-3 px-3.5 py-2.5">
                <div className="flex flex-col justify-start">
                  <span className="text-[15px] font-medium text-[#6B7280]">
                    Nomi
                  </span>
                  <a className="text-[16px] font-bold text-green-600">
                    {ts.name}
                  </a>
                </div>
                <div className="flex flex-col justify-start">
                  <span className="text-[15px] font-medium text-[#6B7280]">
                    Tsex Manager
                  </span>
                  <span className="text-[16px] font-bold text-[#4B5563]">
                    {ts.tsex.name}
                  </span>
                </div>
                <div className="flex flex-col justify-start">
                  <span className="text-[15px] font-medium text-[#6B7280] whitespace-nowrap">
                    Balansi
                  </span>
                  {ts.balance > 0 ? (
                    <span className="text-[16px] font-bold text-red-500">
                      -{ts.balance.toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-[16px] font-bold text-green-500">
                      {ts.balance.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 pb-2.5">
                <div className="flex flex-col px-3.5">
                  <div>
                    <span className="font-medium text-[#6B7280] text-[15px]">
                      Oxirgi operatsiya
                    </span>
                  </div>
                  <div>
                    <span className="text-[16px] font-bold text-[#4B5563]">
                      {ts.last_operation}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col px-3.5">
                  <div>
                    <span className="font-medium text-[#6B7280] text-[15px]">
                      Kiritilgan sana
                    </span>
                  </div>
                  <div>
                    <span className="text-[16px] font-bold text-[#4B5563]">
                      {ts.created_at.toLocaleString("uz-UZ")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-bg-fy"></div>

              <div className="flex justify-end mt-1 px-3.5 pt-2 pb-3">
                <div>
                  <AntdButton
                    className="bg-[#1D4ED8]! text-white!"
                    // onClick={() => handleOpenDetail(ts.id)}
                  >
                    Batafsil
                  </AntdButton>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-center">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default memo(AdminTsexesPage);

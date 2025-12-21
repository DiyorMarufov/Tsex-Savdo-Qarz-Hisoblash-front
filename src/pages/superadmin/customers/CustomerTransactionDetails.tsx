import { memo, useEffect, useMemo, useState } from "react";
import ProTable from "@ant-design/pro-table";
import { transactionDetailColumns } from "./model/customer-transactions-detail-model";
import { type FormProps, Form } from "antd";
import { useCustomerTransaction } from "../../../shared/lib/apis/customer-transactions/useCustomerTransaction";
import { useParams } from "react-router-dom";
import CustomerTransactionDetailMobileList from "../../../widgets/customers/CustomerTransactionDetailMobileList/CustomerTransactionDetailMobileList";
import NameSkeleton from "../../../shared/ui/Skeletons/NameSkeleton/NameSkeleton";
import { useParamsHook } from "../../../shared/hooks/params/useParams";
import CustomerTransactionDetailTransactions from "../../../widgets/superadmin/customers/CustomerTransactionDetailTransactions/CustomerTransactionDetailTransactions";
import CustomerTransactionDetailModal from "../../../widgets/superadmin/customers/CustomerTransactionDetailModal/CustomerTransactionDetailModal";
import type {
  CustomerTransactionDetailDataType,
  CustomerTransactionDetailType,
  QueryParams,
} from "../../../shared/lib/types";
import { useApiNotification } from "../../../shared/hooks/api-notification/useApiNotification";

const CustomerTransactionDetails = () => {
  const [transactionOpen, setTransactionOpen] = useState<boolean>(false);
  const [modalType, setModalType] =
    useState<CustomerTransactionDetailType | null>(null);
  const [form] = Form.useForm();
  const { id } = useParams();
  const { getParam, setParams, removeParam } = useParamsHook();

  const type = getParam("type") || "";

  const {
    getCustomerTransactionsDetailByParentTransactionId,
    createLendOrBorrowTransaction,
  } = useCustomerTransaction();
  const { handleApiError, handleSuccess } = useApiNotification();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  // Query starts
  const query: QueryParams = useMemo(() => {
    const page = Number(getParam("page")) || 1;
    const limit = Number(getParam("limit")) || 5;

    return { page, limit };
  }, [getParam]);
  // Query ends

  // Transaction starts
  const openTransactionModal = (type: CustomerTransactionDetailType) => {
    setModalType(type);
    setTransactionOpen(true);
  };

  const handleCancelTransaction = () => {
    setModalType(null);
    setTransactionOpen(false);
  };

  const transactionOnFinish: FormProps<CustomerTransactionDetailDataType>["onFinish"] =
    (values: CustomerTransactionDetailDataType) => {
      const { amount, description } = values;
      const data: CustomerTransactionDetailDataType = {
        transaction_id: id as string,
        amount: Number(amount.replace(/\D/g, "")),
        description,
      };
      switch (modalType) {
        case "lend-more":
          createLendOrBorrowTransaction.mutate(
            { data, type: modalType },
            {
              onSuccess: () => {
                handleCancelTransaction();
                form.resetFields();
                handleSuccess("Muvaffaqiyatli ko'proq qarz berildi");
              },
              onError: (err: any) => {
                const status = err?.response?.data?.statusCode;
                const msg = err?.response?.data?.message;

                if (
                  status === 404 &&
                  msg.startsWith("CustomerTransaction with ID")
                ) {
                  handleApiError("Bunday tranzaksiya mavjud emas", "topRight");
                  return;
                } else if (status === 404 && msg.startsWith("User with ID")) {
                  handleApiError("Superadmin mavjud emas");
                  return;
                } else {
                  handleApiError("Serverda xato");
                  return;
                }
              },
            }
          );
          break;

        case "receive":
          createLendOrBorrowTransaction.mutate(
            { data, type: modalType },
            {
              onSuccess: () => {
                handleCancelTransaction();
                form.resetFields();
                handleSuccess("Muvaffaqiyatli qabul qilindi");
              },
              onError: (err: any) => {
                const status = err?.response?.data?.statusCode;
                const msg = err?.response?.data?.message;

                if (
                  status === 404 &&
                  msg.startsWith("CustomerTransaction with ID")
                ) {
                  handleApiError("Bunday tranzaksiya mavjud emas", "topRight");
                  return;
                } else if (status === 404 && msg.startsWith("User with ID")) {
                  handleApiError("Superadmin mavjud emas");
                  return;
                } else {
                  handleApiError("Serverda xato");
                  return;
                }
              },
            }
          );
          break;

        case "borrow-more":
          createLendOrBorrowTransaction.mutate(
            { data, type: modalType },
            {
              onSuccess: () => {
                handleCancelTransaction();
                form.resetFields();
                handleSuccess("Muvaffaqiyatli koproq qarz olindi");
              },
              onError: (err: any) => {
                const status = err?.response?.data?.statusCode;
                const msg = err?.response?.data?.message;

                if (
                  status === 404 &&
                  msg.startsWith("CustomerTransaction with ID")
                ) {
                  handleApiError("Bunday tranzaksiya mavjud emas", "topRight");
                  return;
                } else if (status === 404 && msg.startsWith("User with ID")) {
                  handleApiError("Superadmin mavjud emas");
                  return;
                } else {
                  handleApiError("Serverda xato");
                  return;
                }
              },
            }
          );
          break;

        case "repayment":
          createLendOrBorrowTransaction.mutate(
            { data, type: modalType },
            {
              onSuccess: () => {
                handleCancelTransaction();
                form.resetFields();
                handleSuccess("Muvaffaqiyatli qisman qarz to'landi");
              },
              onError: (err: any) => {
                const status = err?.response?.data?.statusCode;
                const msg = err?.response?.data?.message;

                if (
                  status === 404 &&
                  msg.startsWith("CustomerTransaction with ID")
                ) {
                  handleApiError("Bunday tranzaksiya mavjud emas", "topRight");
                  return;
                } else if (status === 404 && msg.startsWith("User with ID")) {
                  handleApiError("Superadmin mavjud emas");
                  return;
                } else {
                  handleApiError("Serverda xato");
                  return;
                }
              },
            }
          );
          break;
        default:
          break;
      }
    };

  const handleFinish = () => {
    console.log("Tugatish jarayoni boshlandi");
  };
  // Transaction ends

  // CustomerTransactionDetail starts
  const {
    data: customerTransactionDetails,
    isLoading: customerTransactionDetailLoading,
  } = getCustomerTransactionsDetailByParentTransactionId(id as string);
  const transactionDetails = customerTransactionDetails?.data?.data;
  const total = customerTransactionDetails?.data?.total || 0;
  // CustomerTransactionDetail ends

  // PageChange starts
  const handlePageChange = (newPage: number, newPageSize?: number) => {
    const updateParams: { page?: number; limit?: number } = {};

    if (newPage > 1) {
      updateParams.page = newPage;
    }

    if (newPageSize && newPageSize !== 5) {
      updateParams.limit = newPageSize;
    }

    setParams(updateParams);

    if (newPage === 1) {
      removeParam("page");
    }
    if (newPageSize === 5 && getParam("limit")) {
      removeParam("limit");
    }
  };
  // PageChange ends

  return (
    <div className="flex flex-col gap-5">
      {customerTransactionDetailLoading ? (
        <NameSkeleton />
      ) : (
        <span className="text-[20px] font-medium text-[#4B5563]">
          {transactionDetails?.[0]?.customer.full_name
            ? transactionDetails?.[0]?.customer.full_name
            : "Hozircha no'malum"}{" "}
          ni tranzaksiyalari
        </span>
      )}

      <CustomerTransactionDetailTransactions
        type={type}
        handleActionMore={() =>
          openTransactionModal(
            type === "borrowing" ? "borrow-more" : "lend-more"
          )
        }
        handlePayment={() =>
          openTransactionModal(type === "borrowing" ? "repayment" : "receive")
        }
        handleFinish={handleFinish}
      />

      <div className="mt-2 max-[500px]:hidden">
        <ProTable
          dataSource={transactionDetails}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            responsive: false,
            current: query.page,
            pageSize: query.limit,
            total,
            onChange: handlePageChange,
          }}
          columns={transactionDetailColumns}
          search={false}
          dateFormatter="string"
          scroll={{ x: "max-content" }}
          loading={customerTransactionDetailLoading}
        />
      </div>

      <CustomerTransactionDetailMobileList
        data={transactionDetails}
        loading={customerTransactionDetailLoading}
        total={total}
        currentPage={Number(query.page)}
        pageSize={Number(query.limit)}
        onPageChange={handlePageChange}
      />

      <CustomerTransactionDetailModal
        open={transactionOpen}
        onCancel={handleCancelTransaction}
        onFinish={transactionOnFinish}
        form={form}
        type={modalType as CustomerTransactionDetailType}
        loading={createLendOrBorrowTransaction.isPending}
      />
    </div>
  );
};

export default memo(CustomerTransactionDetails);

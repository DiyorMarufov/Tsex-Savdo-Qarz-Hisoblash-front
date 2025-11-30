import { useNotificationApi } from "../../providers/NotificatonProvider/NotificationProvider";

export const useApiNotification = () => {
  const api = useNotificationApi();

  const handleApiError = (
    title: string,
    placement?:
      | "topRight"
      | "topLeft"
      | "top"
      | "bottom"
      | "bottomLeft"
      | "bottomRight"
  ) => {
    api.error({
      message: title,
      placement,
    });
  };

  const handleSuccess = (
    title: string = "success",
    description: string = ""
  ) => {
    api.success({
      message: title,
      description,
      placement: "topRight",
    });
  };

  const handleWarning = (
    title: string = "⚠️ Warning",
    description: string = "Something went wrong"
  ) => {
    api.warning({
      message: title,
      description,
      placement: "topRight",
    });
  };
  return {
    handleApiError,
    handleSuccess,
    handleWarning,
  };
};

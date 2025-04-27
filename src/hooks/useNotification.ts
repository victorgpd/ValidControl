import { useCallback } from "react";
import { notification as notificationAntd } from "antd";

export const useNotification = () => {
  const [api, contextHolder] = notificationAntd.useNotification();

  const showNotification = useCallback(
    (type: "success" | "info" | "warning" | "error", message: string, description: string) => {
      api[type]({
        message,
        description,
        placement: "topRight",
        duration: 5,
        showProgress: true,
      });
    },
    [api]
  );

  return {
    contextHolder,
    showNotification,
  };
};

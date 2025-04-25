import { useCallback } from "react";
import { notification as notificationAntd } from "antd";

export const useNotification = () => {
  const [api, contextHolder] = notificationAntd.useNotification();

  const showNotification = useCallback(
    (type: "success" | "info" | "warning" | "error", message: string, description: string) => {
      api[type]({
        message,
        description,
        placement: "bottomRight",
        duration: 5,
      });
    },
    [api]
  );

  return {
    contextHolder,
    showNotification,
  };
};

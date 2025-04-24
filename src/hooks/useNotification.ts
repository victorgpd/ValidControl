import { notification as notificationAntd } from "antd";
import { useMemo } from "react";

export const useNotification = () => {
  const [api, contextHolder] = notificationAntd.useNotification();

  const showNotification = useMemo(
    () => (type: "success" | "info" | "warning" | "error", message: string, description: string) => {
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

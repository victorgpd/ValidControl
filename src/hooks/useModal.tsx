import { useState } from "react";
import GenericModal from "../components/Modal/Modal";

interface ModalOptions {
  title: string;
  message: string;
  okText?: string;
  cancelText?: string;
  onConfirm: () => void;
}

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ModalOptions>({
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const openModal = (opts: ModalOptions) => {
    setOptions(opts);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const Modal = () => (
    <GenericModal
      open={isOpen}
      title={options.title}
      message={options.message}
      okText={options.okText}
      cancelText={options.cancelText}
      onConfirm={() => {
        options.onConfirm();
        closeModal();
      }}
      onCancel={closeModal}
    />
  );

  return { openModal, closeModal, Modal };
};

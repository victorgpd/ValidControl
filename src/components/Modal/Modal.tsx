import { Modal } from "antd";

interface GenericModalProps {
  open: boolean;
  title: string;
  message: string;
  okText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const GenericModal = ({ open, title, message, okText = "Confirmar", cancelText = "Cancelar", onConfirm, onCancel }: GenericModalProps) => {
  return (
    <Modal title={title} open={open} onOk={onConfirm} onCancel={onCancel} okText={okText} cancelText={cancelText} centered>
      <div dangerouslySetInnerHTML={{ __html: message }} />
    </Modal>
  );
};

export default GenericModal;

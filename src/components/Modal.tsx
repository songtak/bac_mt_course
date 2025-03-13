import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  isSub?: boolean;
  children: ReactNode;
  isCloseButton?: boolean;
}

const Modal = ({
  open,
  onClose,
  isSub = false,
  children,
  isCloseButton = true,
}: ModalProps) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 pointer-events-auto"
      style={{ pointerEvents: "none" }}
    >
      {children}
    </div>,

    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;

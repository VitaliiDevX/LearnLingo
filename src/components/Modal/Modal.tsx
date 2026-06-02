import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import css from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  const modalRoot = document.getElementById("modal-root");

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    const prevOverflow = document.body.style.overflow;

    document.addEventListener("keydown", handleEscKey);
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = "";
    };
  }, [onClose]);

  if (!modalRoot) return null;

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label="Modal window"
      onClick={onClose}
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div className={css.content}>{children}</div>
      </div>
    </div>,
    modalRoot,
  );
}

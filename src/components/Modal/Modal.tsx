import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { motion } from "framer-motion";
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
    <motion.div
      className={css.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={onClose}
    >
      <motion.div
        className={css.modal}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={css.closeButton} onClick={onClose}>
          <X size={24} />
        </button>
        <div className={css.content}>{children}</div>
      </motion.div>
    </motion.div>,
    modalRoot,
  );
}

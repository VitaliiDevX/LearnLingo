import { useState, useRef, useEffect } from "react";
import css from "./BurgerMenu.module.css";
import NavLinks from "../NavLinks/NavLinks";
import AuthBar from "../AuthBar/AuthBar";
import UserBar from "../UserBar/UserBar";
import BurgerMenuBtn from "../BurgerMenuBtn/BurgerMenuBtn";
import { useAuthStore } from "../../store/useAuthStore";
import type { FormType } from "../../constants/forms";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onOpenModal: (type: FormType) => void;
}

export default function BurgerMenu({ onOpenModal }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handlePopState = () => setIsOpen(false);

    document.addEventListener("keydown", handleEscKey);
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen]);

  const handleClose = () => setIsOpen(false);

  const handleAuthClick = (type: FormType) => {
    handleClose();
    onOpenModal(type);
  };

  return (
    <div className={css.dropdownContainer} ref={menuRef}>
      <BurgerMenuBtn isOpen={isOpen} setIsOpen={() => setIsOpen(!isOpen)} />

      <AnimatePresence>
        {isOpen && (
          <>
            <div className={css.backdrop} onClick={handleClose} />

            <motion.div
              className={css.content}
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className={css.navWrap}>
                <NavLinks direction="column" onClick={handleClose} />
              </div>

              {isAuthenticated ? (
                <UserBar direction="column" onClick={handleClose} />
              ) : (
                <AuthBar
                  direction="column"
                  onLoginClick={() => handleAuthClick("login")}
                  onRegisterClick={() => handleAuthClick("register")}
                />
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

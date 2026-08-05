import { useState, useRef, useEffect } from "react";
import { useThemeStore } from "../../store/useThemeStore";
import css from "./ThemeSelector.module.css";
import { Droplet } from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { allThemes, currentTheme, changeTheme } = useThemeStore();

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleClose = () => setIsOpen(false);

  return (
    <div className={css.dropdownContainer} ref={dropdownRef}>
      <button
        className={clsx(css.dropdownButton, isOpen && css.active)}
        onClick={() => setIsOpen(!isOpen)}
        title="Select color"
      >
        <Droplet size={24} className={css.icon} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className={css.backdrop} onClick={handleClose} />

            <motion.ul
              className={css.dropdownList}
              initial={{ opacity: 0, scale: 0.95, y: -20, x: "-50%" }}
              animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, scale: 0.95, y: -20, x: "-50%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {allThemes.map((theme) => (
                <li
                  key={theme.id}
                  className={clsx(
                    css.dropdownItem,
                    currentTheme.id === theme.id && css.activeColor,
                  )}
                >
                  <button
                    className={css.colorButton}
                    onClick={() => {
                      changeTheme(theme.id);
                      setIsOpen(false);
                    }}
                    disabled={currentTheme.id === theme.id}
                    style={{ backgroundColor: theme.primary }}
                    aria-label={`Select ${theme.name} theme`}
                  />
                </li>
              ))}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

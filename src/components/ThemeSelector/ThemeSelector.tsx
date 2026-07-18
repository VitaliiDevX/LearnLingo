import { useState, useRef, useEffect } from "react";
import { useThemeStore } from "../../store/useThemeStore";
import css from "./ThemeSelector.module.css";
import { Droplet } from "lucide-react";
import clsx from "clsx";

export default function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { allThemes, currentTheme, changeTheme } = useThemeStore();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={css.dropdownContainer} ref={dropdownRef}>
      <button
        className={clsx(css.dropdownButton, isOpen && css.active)}
        onClick={() => setIsOpen(!isOpen)}
        title="Select color"
      >
        <Droplet size={24} className={css.icon} />
      </button>
      {isOpen && (
        <ul className={css.dropdownList}>
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
        </ul>
      )}
    </div>
  );
}

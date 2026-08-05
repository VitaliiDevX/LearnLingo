import { Menu, X } from "lucide-react";
import css from "./BurgerMenuBtn.module.css";
import clsx from "clsx";

interface Props {
  isOpen?: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function BurgerMenuBtn({ isOpen = false, setIsOpen }: Props) {
  return (
    <button
      type="button"
      className={clsx(css.button, isOpen && css.active)}
      onClick={() => setIsOpen(!isOpen)}
      aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      {isOpen ? (
        <X size={24} className={css.icon} />
      ) : (
        <Menu size={24} className={css.icon} />
      )}
    </button>
  );
}

import { LogIn, UserPlus } from "lucide-react";
import css from "./AuthBar.module.css";
import clsx from "clsx";

interface Props {
  direction?: "row" | "column";
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export default function AuthBar({
  direction = "row",
  onLoginClick,
  onRegisterClick,
}: Props) {
  return (
    <div className={clsx(css.wrapper, css[direction])}>
      <button onClick={onLoginClick} className={css.login}>
        <LogIn size={20} className={css.icon} />
        Log in
      </button>
      <button onClick={onRegisterClick} className={css.register}>
        <UserPlus size={20} className={css.icon} />
        Registration
      </button>
    </div>
  );
}

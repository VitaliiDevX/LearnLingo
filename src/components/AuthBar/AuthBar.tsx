import Icon from "../Icon/Icon";
import css from "./AuthBar.module.css";
import clsx from "clsx";

interface Props {
  direction?: "row" | "column";
  onClick?: () => void;
}

export default function AuthBar({ direction = "row", onClick }: Props) {
  return (
    <div className={clsx(css.wrapper, css[direction])}>
      <button onClick={onClick} className={css.login}>
        <Icon id="icon-log-in" className={css.icon} />
        Log in
      </button>
      <button onClick={onClick} className={css.register}>
        Registration
      </button>
    </div>
  );
}

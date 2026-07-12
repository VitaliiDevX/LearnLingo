import clsx from "clsx";
import css from "./Button.module.css";
import Loader from "../Loader/Loader";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children?: string;
}

export default function Button({
  children,
  isLoading = false,
  disabled = false,
  className,
  style,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;
  const textToShow = children?.trim();

  return (
    <button
      className={clsx(css.button, isLoading && css.loading, className)}
      disabled={isDisabled}
      aria-busy={isLoading}
      style={style}
      {...props}
    >
      {isLoading ? (
        <Loader size="sm" className={css.buttonLoader} inheritColor />
      ) : (
        <span className={css.buttonText}>{textToShow}</span>
      )}
    </button>
  );
}

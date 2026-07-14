import css from "./InfoMessage.module.css";

interface Props {
  message: string;
  onRetry?: () => void;
  buttonText?: string;
}

export default function InfoMessage({ message, onRetry, buttonText }: Props) {
  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Oops!</h3>
      <p>{message}</p>
      {onRetry && buttonText && (
        <button className={css.retryBtn} onClick={onRetry}>
          {buttonText}
        </button>
      )}
    </div>
  );
}

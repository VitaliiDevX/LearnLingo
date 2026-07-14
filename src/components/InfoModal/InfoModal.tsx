import css from "./InfoModal.module.css";

interface Props {
  title: string;
  description: string;
  primaryAction: {
    label: string;
    onClick: () => void;
  };
  secondaryAction: {
    label: string;
    onClick: () => void;
  };
}

export default function InfoModal({
  title,
  description,
  primaryAction,
  secondaryAction,
}: Props) {
  return (
    <div className={css.container}>
      <h2 className={css.title}>{title}</h2>
      <p className={css.description}>{description}</p>
      <div className={css.actions}>
        <button onClick={secondaryAction.onClick} className={css.secondaryBtn}>
          {secondaryAction.label}
        </button>
        <button onClick={primaryAction.onClick} className={css.primaryBtn}>
          {primaryAction.label}
        </button>
      </div>
    </div>
  );
}

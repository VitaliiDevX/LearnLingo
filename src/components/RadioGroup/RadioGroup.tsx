import { useFormContext } from "react-hook-form";
import css from "./RadioGroup.module.css";

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  title: string;
  name: string;
  options: RadioOption[];
}

export default function RadioGroup({ title, name, options }: RadioGroupProps) {
  const { register } = useFormContext();

  return (
    <div className={css.radioGroup}>
      {title && <h3 className={css.title}>{title}</h3>}
      <div className={css.options}>
        {options.map((option) => (
          <label key={option.value} className={css.radioLabel}>
            <input
              {...register(name)}
              type="radio"
              value={option.value}
              className={css.radioInput}
            />
            <span className={css.radioText}>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

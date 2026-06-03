import { useFormContext } from "react-hook-form";
import css from "./InputField.module.css";
import clsx from "clsx";

interface InputFieldProps {
  name: string;
  placeholder: string;
  type?: string;
}

export default function InputField({
  name,
  placeholder,
  type = "text",
}: InputFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string;

  return (
    <div className={css.wrapper}>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className={clsx(css.input, error && css.inputError)}
      />
      {error && <p className={css.errorText}>{error}</p>}
    </div>
  );
}

import { useFormContext } from "react-hook-form";
import css from "./InputField.module.css";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import ValidationErrorMessage from "../ValidationErrorMessage/ValidationErrorMessage";
import { useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { ref: registerRef, ...rest } = register(name);

  const error = errors[name]?.message as string;
  const errorId = `${name}-error`;

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={css.wrapper}>
      <label htmlFor={name} className="visually-hidden">
        {placeholder}
      </label>
      <input
        {...rest}
        id={name}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        ref={(e) => {
          registerRef(e);
          inputRef.current = e;
        }}
        type={inputType}
        placeholder={placeholder}
        className={clsx(css.input, error && css.inputError)}
      />
      {isPassword && (
        <button
          type="button"
          className={css.toggleButton}
          onClick={(e) => {
            e.preventDefault();
            setShowPassword(!showPassword);
            setTimeout(() => {
              const input = inputRef.current;
              if (input) {
                input.focus();
                const length = input.value.length;
                input.setSelectionRange(length, length);
              }
            }, 0);
          }}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
      <AnimatePresence mode="wait">
        {error && <ValidationErrorMessage message={error} id={errorId} />}
      </AnimatePresence>
    </div>
  );
}

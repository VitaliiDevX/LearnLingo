import { useFormContext, Controller } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import css from "./InputField.module.css";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import ValidationErrorMessage from "../ValidationErrorMessage/ValidationErrorMessage";
import { useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps {
  name: string;
  placeholder: string;
  type?: "text" | "password";
  mask?: string;
  autoComplete?: string;
}

export default function InputField({
  name,
  placeholder,
  type = "text",
  mask,
  autoComplete,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string;
  const errorId = `${name}-error`;

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={css.wrapper}>
      <label htmlFor={name} className="visually-hidden">
        {placeholder}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => {
          const commonProps = {
            id: name,
            "aria-invalid": !!error,
            "aria-describedby": error ? errorId : undefined,
            className: clsx(css.input, error && css.inputError),
            placeholder: placeholder,
            onBlur: onBlur,
            autoComplete: autoComplete || name,
          };

          const handleRef = (el: HTMLInputElement | null) => {
            ref(el);
            inputRef.current = el;
          };

          return mask ? (
            <PatternFormat
              {...commonProps}
              format={mask}
              mask="_"
              value={value || ""}
              onValueChange={(values) => onChange(values.value)}
              type="text"
              getInputRef={handleRef}
            />
          ) : (
            <input
              {...commonProps}
              onChange={onChange}
              value={value || ""}
              type={inputType}
              ref={handleRef}
            />
          );
        }}
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

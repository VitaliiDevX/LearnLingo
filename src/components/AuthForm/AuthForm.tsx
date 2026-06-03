import {
  useForm,
  FormProvider,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { type ObjectSchema } from "yup";
import css from "./AuthForm.module.css";

interface AuthFormProps {
  title: string;
  description: string;
  buttonText: string;
  children: React.ReactNode;
  schema: ObjectSchema<FieldValues>;
  onSubmit: SubmitHandler<FieldValues>;
}

export default function AuthForm({
  title,
  description,
  buttonText,
  schema,
  onSubmit,
  children,
}: AuthFormProps) {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <form className={css.form} onSubmit={methods.handleSubmit(onSubmit)}>
        <h2 className={css.title}>{title}</h2>
        <p className={css.description}>{description}</p>
        <div className={css.inputsWrapper}>{children}</div>
        <button type="submit" className={css.submitBtn}>
          {buttonText}
        </button>
      </form>
    </FormProvider>
  );
}

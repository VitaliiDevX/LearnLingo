import {
  useForm,
  FormProvider,
  type FieldValues,
  type SubmitHandler,
  type Resolver,
  type DefaultValues,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ObjectSchema } from "yup";
import css from "./ModalForm.module.css";
import clsx from "clsx";
import Button from "../Button/Button";

interface ModalFormProps<T extends FieldValues> {
  title: string;
  description: string;
  isLoading?: boolean;
  buttonText: string;
  children: React.ReactNode;
  schema: ObjectSchema<T>;
  onSubmit: SubmitHandler<T>;
  className?: string;
  defaultValues: T;
}

export default function ModalForm<T extends FieldValues>({
  title,
  description,
  isLoading,
  buttonText,
  schema,
  onSubmit,
  children,
  className = "loginForm",
  defaultValues,
}: ModalFormProps<T>) {
  const methods = useForm<T>({
    resolver: yupResolver(schema) as Resolver<T>,
    defaultValues: defaultValues as DefaultValues<T>,
  });

  return (
    <FormProvider {...methods}>
      <form
        className={clsx(css.form, className && css[className])}
        onSubmit={methods.handleSubmit(onSubmit as SubmitHandler<T>)}
      >
        <h2 className={css.title}>{title}</h2>
        <p className={css.description}>{description}</p>
        <div className={css.contentWrapper}>{children}</div>
        <Button
          type="submit"
          disabled={isLoading}
          isLoading={isLoading}
          className={css.submitBtn}
        >
          {buttonText}
        </Button>
      </form>
    </FormProvider>
  );
}

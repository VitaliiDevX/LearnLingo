import { motion } from "framer-motion";
import css from "./ValidationErrorMessage.module.css";

interface Props {
  message: string;
  id?: string;
}

export default function ValidationErrorMessage({ message, id }: Props) {
  return (
    <motion.span
      id={id}
      className={css.errorText}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {message}
    </motion.span>
  );
}

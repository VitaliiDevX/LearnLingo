import { motion } from "framer-motion";
import css from "./ErrorMessage.module.css";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <motion.span
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

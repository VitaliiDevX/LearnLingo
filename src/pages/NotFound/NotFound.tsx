import { Link } from "react-router-dom";
import css from "./NotFound.module.css";
import clsx from "clsx";

export default function NotFound() {
  return (
    <section className={css.section}>
      <div className={clsx(css.content, "mainContainer")}>
        <h1 className={css.title}>404</h1>
        <h2 className={css.subtitle}>Page Not Found</h2>
        <p className={css.text}>
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className={css.button}>
          Go to Home Page
        </Link>
      </div>
    </section>
  );
}

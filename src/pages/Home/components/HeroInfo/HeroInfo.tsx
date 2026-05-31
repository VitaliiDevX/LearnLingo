import { Link } from "react-router";
import css from "./HeroInfo.module.css";

export default function HeroInfo() {
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>
        Unlock your potential with the best{" "}
        <span className={css.accent}>language</span> tutors
      </h1>
      <p className={css.text}>
        Embark on an Exciting Language Journey with Expert Language Tutors:
        Elevate your language proficiency to new heights by connecting with
        highly qualified and experienced tutors.
      </p>
      <Link to="/teachers" className={css.button}>
        Get started
      </Link>
    </div>
  );
}

import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";
import css from "./Logo.module.css";

export default function Logo() {
  return (
    <Link to="/" aria-label="Main page" className={css.link} title="Home">
      <Icon id="icon-ukraine" className={css.icon} />
      <span className={css.text}>LearnLingo</span>
    </Link>
  );
}

import clsx from "clsx";
import ThemeSelector from "../ThemeSelector/ThemeSelector";
import css from "./Header.module.css";
import Logo from "../Logo/Logo";
import NavLinks from "../NavLinks/NavLinks";
import AuthBar from "../AuthBar/AuthBar";

export default function Header() {
  return (
    <header className={css.header}>
      <div className={clsx(css.headerContent, "container")}>
        <Logo />

        <NavLinks />

        <div className={css.authButtons}>
          <ThemeSelector />
          <AuthBar />
        </div>
      </div>
    </header>
  );
}
